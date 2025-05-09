import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Save, Trash, Sparkles, FileText } from "lucide-react";
import NoteGenerator from "./NoteGenerator";

const NotesTabView = ({ mode, courseCode, course }) => {
  const [notes, setNotes] = useState(() => {
    if (typeof window !== "undefined") {
      const savedNotes = localStorage.getItem(`${courseCode}-notes`);
      return savedNotes
        ? JSON.parse(savedNotes)
        : [
            {
              id: 1,
              title: "Key Concepts",
              content: "Important points to remember...",
              date: new Date().toISOString(),
            },
            {
              id: 2,
              title: "Questions",
              content: "Ask about the relationship between...",
              date: new Date().toISOString(),
            },
          ];
    }
    return [
      {
        id: 1,
        title: "Key Concepts",
        content: "Important points to remember...",
        date: new Date().toISOString(),
      },
      {
        id: 2,
        title: "Questions",
        content: "Ask about the relationship between...",
        date: new Date().toISOString(),
      },
    ];
  });
  const [activeNote, setActiveNote] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [showNoteGenerator, setShowNoteGenerator] = useState(false);
  const [selectedLessonId, setSelectedLessonId] = useState(
    course?.lessons[0]?.id || 1
  );

  // Get color classes based on mode
  const getColorClasses = () => {
    switch (mode) {
      case "dyslexia":
        return {
          button: "bg-amber-600 hover:bg-amber-700",
          outlineButton: "border-amber-200 text-amber-700 hover:bg-amber-50",
          header: "bg-amber-500 text-white",
          accent: "text-amber-600",
          badge: "bg-amber-100 text-amber-700",
          card: "border-amber-200 hover:border-amber-300",
          activeCard: "border-amber-400 bg-amber-50",
          icon: "text-amber-500",
        };
      case "adhd":
        return {
          button: "bg-blue-600 hover:bg-blue-700",
          outlineButton: "border-blue-200 text-blue-700 hover:bg-blue-50",
          header: "bg-blue-500 text-white",
          accent: "text-blue-600",
          badge: "bg-blue-100 text-blue-700",
          card: "border-blue-200 hover:border-blue-300",
          activeCard: "border-blue-400 bg-blue-50",
          icon: "text-blue-500",
        };
      case "adaptive":
        return {
          button: "bg-indigo-600 hover:bg-indigo-700",
          outlineButton: "border-indigo-200 text-indigo-700 hover:bg-indigo-50",
          header: "bg-indigo-500 text-white",
          accent: "text-indigo-600",
          badge: "bg-indigo-100 text-indigo-700",
          card: "border-indigo-200 hover:border-indigo-300",
          activeCard: "border-indigo-400 bg-indigo-50",
          icon: "text-indigo-500",
        };
      default:
        return {
          button: "bg-purple-600 hover:bg-purple-700",
          outlineButton: "border-purple-200 text-purple-700 hover:bg-purple-50",
          header: "bg-purple-500 text-white",
          accent: "text-purple-600",
          badge: "bg-purple-100 text-purple-700",
          card: "border-purple-200 hover:border-purple-300",
          activeCard: "border-purple-400 bg-purple-50",
          icon: "text-purple-500",
        };
    }
  };

  const colors = getColorClasses();

  const handleNewNote = () => {
    const newNote = {
      id: Date.now(),
      title: "New Note",
      content: "",
      date: new Date().toISOString(),
    };
    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);
    setActiveNote(newNote.id);
    setEditMode(true);
    setEditTitle("New Note");
    setEditContent("");

    // Save to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem(`${courseCode}-notes`, JSON.stringify(updatedNotes));
    }
  };

  const handleEditNote = () => {
    if (!activeNote) return;

    const note = notes.find((n) => n.id === activeNote);
    if (note) {
      setEditMode(true);
      setEditTitle(note.title);
      setEditContent(note.content);
    }
  };

  const handleSaveNote = () => {
    if (!activeNote) return;

    const updatedNotes = notes.map((note) =>
      note.id === activeNote
        ? {
            ...note,
            title: editTitle,
            content: editContent,
            date: new Date().toISOString(),
          }
        : note
    );

    setNotes(updatedNotes);
    setEditMode(false);

    // Save to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem(`${courseCode}-notes`, JSON.stringify(updatedNotes));
    }
  };

  const handleDeleteNote = () => {
    if (!activeNote) return;

    const updatedNotes = notes.filter((note) => note.id !== activeNote);
    setNotes(updatedNotes);
    setActiveNote(updatedNotes.length > 0 ? updatedNotes[0].id : null);
    setEditMode(false);

    // Save to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem(`${courseCode}-notes`, JSON.stringify(updatedNotes));
    }
  };

  const addNoteFromGenerator = (newNote) => {
    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);
    setActiveNote(newNote.id);
    setEditMode(false);

    // Save to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem(`${courseCode}-notes`, JSON.stringify(updatedNotes));
    }
  };

  const openNoteGenerator = (lessonId) => {
    setSelectedLessonId(lessonId || course?.lessons[0]?.id);
    setShowNoteGenerator(true);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const activeNoteData =
    notes.find((note) => note.id === activeNote) || notes[0];

  return (
    <>
      <div className="flex flex-col md:flex-row md:gap-6">
        {/* Notes Sidebar */}
        <div className="w-full md:w-1/3 mb-6 md:mb-0">
          <div className="flex justify-between items-center mb-4">
            <h3 className={`font-semibold ${colors.accent}`}>Your Notes</h3>
            <div className="flex gap-2">
              <Button
                onClick={handleNewNote}
                size="sm"
                className={colors.button}
              >
                <Plus size={16} className="mr-1" />
                New
              </Button>
              <Button
                onClick={() => openNoteGenerator()}
                size="sm"
                className={`bg-purple-600 hover:bg-purple-700`}
              >
                <Sparkles size={16} className="mr-1" />
                AI Notes
              </Button>
            </div>
          </div>

          <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
            {notes.map((note) => (
              <Card
                key={note.id}
                className={`p-3 cursor-pointer transition-all ${
                  activeNote === note.id ? colors.activeCard : ""
                }`}
                onClick={() => {
                  setActiveNote(note.id);
                  setEditMode(false);
                }}
              >
                <div className="flex items-start">
                  <div className="flex-grow">
                    <h4 className="font-medium mb-1">{note.title}</h4>
                    <p className="text-xs text-gray-500">
                      {formatDate(note.date)} · {note.content.length} characters
                    </p>
                    <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                      {note.content}
                    </p>
                  </div>
                  {note.aiGenerated && (
                    <Sparkles
                      size={16}
                      className="text-purple-500 flex-shrink-0 ml-2"
                    />
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Note Content */}
        <div className="w-full md:w-2/3">
          {activeNoteData && (
            <>
              <div className="flex justify-between items-center mb-4">
                <h3 className={`font-semibold ${colors.accent}`}>
                  {editMode ? "Editing Note" : "Note Details"}
                </h3>
                <div className="flex gap-2">
                  {editMode ? (
                    <Button
                      onClick={handleSaveNote}
                      size="sm"
                      className={colors.button}
                    >
                      <Save size={16} className="mr-1" />
                      Save
                    </Button>
                  ) : (
                    <Button
                      onClick={handleEditNote}
                      size="sm"
                      variant="outline"
                      className={colors.outlineButton}
                    >
                      Edit
                    </Button>
                  )}
                  <Button
                    onClick={handleDeleteNote}
                    size="sm"
                    variant="outline"
                    className="border-red-200 text-red-600 hover:bg-red-50"
                  >
                    <Trash size={16} />
                  </Button>
                </div>
              </div>

              {editMode ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Content
                    </label>
                    <textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      rows={15}
                      className={`w-full px-3 py-2 border rounded-md ${
                        mode === "dyslexia" ? "dyslexia-font" : ""
                      }`}
                    ></textarea>
                  </div>
                </div>
              ) : (
                <Card className="p-4">
                  <div className="mb-4 border-b pb-2">
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-bold mb-1">
                        {activeNoteData.title}
                      </h2>
                      {activeNoteData.aiGenerated && (
                        <div className="flex items-center text-xs text-purple-700 bg-purple-50 px-2 py-1 rounded-md">
                          <Sparkles
                            size={12}
                            className="mr-1 text-purple-500"
                          />
                          AI Generated
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">
                      Last updated: {formatDate(activeNoteData.date)}
                    </p>
                  </div>
                  <div
                    className={`prose max-w-none ${
                      mode === "dyslexia" ? "dyslexia-font" : ""
                    }`}
                  >
                    {activeNoteData.content.includes("#") ? (
                      // If content seems to be markdown/structured (like AI generated notes), preserve whitespace
                      <pre className="whitespace-pre-wrap font-sans text-base text-gray-800">
                        {activeNoteData.content}
                      </pre>
                    ) : (
                      // Otherwise, render paragraphs normally
                      activeNoteData.content.split("\n").map((paragraph, i) => (
                        <p key={i} className="mb-4">
                          {paragraph || <br />}
                        </p>
                      ))
                    )}
                  </div>
                </Card>
              )}
            </>
          )}

          {!activeNoteData && (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-500 mb-1">
                No notes yet
              </h3>
              <p className="text-gray-400 mb-4">
                Create a new note to get started
              </p>
              <div className="flex gap-4 justify-center">
                <Button onClick={handleNewNote} className={colors.button}>
                  <Plus size={16} className="mr-1" />
                  Create Note
                </Button>
                <Button
                  onClick={() => openNoteGenerator()}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  <Sparkles size={16} className="mr-1" />
                  Generate with AI
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* AI Note Generator Modal */}
      <NoteGenerator
        isOpen={showNoteGenerator}
        onClose={() => setShowNoteGenerator(false)}
        course={course}
        lessonId={selectedLessonId}
        addNoteToCollection={addNoteFromGenerator}
      />
    </>
  );
};

export default NotesTabView;
