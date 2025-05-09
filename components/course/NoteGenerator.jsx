import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, Sparkles, FileText, Copy, Check, Download } from "lucide-react";

const NoteGenerator = ({
  isOpen,
  onClose,
  course,
  lessonId,
  addNoteToCollection,
}) => {
  const [generating, setGenerating] = useState(false);
  const [generatedNote, setGeneratedNote] = useState(null);
  const [selectedFormat, setSelectedFormat] = useState("summary");
  const [copied, setCopied] = useState(false);

  // Get lesson data based on lessonId
  const lesson = course?.lessons?.find((l) => l.id === lessonId);

  const generateNotes = async () => {
    if (!lesson) return;

    setGenerating(true);

    try {
      // In a real app, this would call an AI API
      // For now, we'll simulate the generation with predefined content
      await new Promise((resolve) => setTimeout(resolve, 2000));

      let noteContent = "";

      if (selectedFormat === "summary") {
        noteContent = generateSummaryNote(lesson);
      } else if (selectedFormat === "flashcards") {
        noteContent = generateFlashcardsNote(lesson);
      } else if (selectedFormat === "mindmap") {
        noteContent = generateMindMapNote(lesson);
      } else if (selectedFormat === "questions") {
        noteContent = generateQuestionsNote(lesson);
      }

      setGeneratedNote({
        title: `${
          selectedFormat.charAt(0).toUpperCase() + selectedFormat.slice(1)
        }: ${lesson.title}`,
        content: noteContent,
        format: selectedFormat,
      });
    } catch (error) {
      console.error("Error generating notes:", error);
    } finally {
      setGenerating(false);
    }
  };

  const copyToClipboard = () => {
    if (!generatedNote) return;

    navigator.clipboard.writeText(generatedNote.content).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const saveNote = () => {
    if (!generatedNote) return;

    addNoteToCollection({
      id: Date.now(),
      title: generatedNote.title,
      content: generatedNote.content,
      date: new Date().toISOString(),
      aiGenerated: true,
    });

    onClose();
  };

  const downloadNote = () => {
    if (!generatedNote) return;

    const element = document.createElement("a");
    const file = new Blob([generatedNote.content], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `${generatedNote.title}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Template generators for different note formats
  const generateSummaryNote = (lesson) => {
    const sections = lesson.sections.map((s) => `• ${s}`).join("\n\n");

    return `# ${lesson.title} - Summary\n\n${
      lesson.content
    }\n\n## Key Points:\n\n${sections}\n\n## Main Takeaways:\n\n• The ${lesson.title.toLowerCase()} covers fundamental concepts that build a foundation for the rest of the course\n• Understanding these principles will help connect ideas across different topics\n• Practice with the provided examples to reinforce your understanding`;
  };

  const generateFlashcardsNote = (lesson) => {
    const title = lesson.title;
    const content = lesson.content.split(".")[0] + ".";

    let flashcards = "# Flashcards: " + title + "\n\n";

    // Generate flashcards from sections
    lesson.sections.forEach((section, index) => {
      // Extract a question from the section
      const sectionParts = section.split(":");
      let question, answer;

      if (sectionParts.length > 1) {
        question = sectionParts[0] + "?";
        answer = sectionParts[1].trim();
      } else {
        // If no colon, create a question
        question = `What is the importance of ${section
          .split(" ")
          .slice(0, 3)
          .join(" ")
          .toLowerCase()}...?`;
        answer = section;
      }

      flashcards += `## Card ${index + 1}\n\n`;
      flashcards += `Q: ${question}\n\n`;
      flashcards += `A: ${answer}\n\n`;
    });

    // Add some general concept flashcards
    flashcards += `## Card ${lesson.sections.length + 1}\n\n`;
    flashcards += `Q: Define ${title.toLowerCase()} in your own words.\n\n`;
    flashcards += `A: [Your definition here]\n\n`;

    flashcards += `## Card ${lesson.sections.length + 2}\n\n`;
    flashcards += `Q: How does ${title.toLowerCase()} connect to other topics in the course?\n\n`;
    flashcards += `A: [Your connections here]\n\n`;

    return flashcards;
  };

  const generateMindMapNote = (lesson) => {
    const title = lesson.title;

    let mindMap = `# Mind Map: ${title}\n\n`;
    mindMap += `${title} (Central Topic)\n`;

    lesson.sections.forEach((section, index) => {
      const sectionTitle =
        section.split(":")[0] || section.split(".")[0] || section;

      mindMap += `    ├── ${sectionTitle}\n`;

      // Generate some sub-branches
      const subBranches = [
        "Definition",
        "Examples",
        "Applications",
        "Related concepts",
      ];

      // Only add sub-branches to a few sections to keep it clean
      if (index < 2) {
        subBranches.forEach((branch) => {
          mindMap += `    │     └── ${branch}\n`;
        });
      }
    });

    mindMap += `\n## Instructions:\n`;
    mindMap += `- Expand this initial mind map structure\n`;
    mindMap += `- Add connections between related branches\n`;
    mindMap += `- Use colors to categorize different types of information\n`;
    mindMap += `- Add your own examples and applications\n`;

    return mindMap;
  };

  const generateQuestionsNote = (lesson) => {
    const title = lesson.title;

    let questions = `# Study Questions: ${title}\n\n`;
    questions += `## Comprehension Questions\n\n`;

    // Generate basic comprehension questions
    questions += `1. What are the main components of ${title.toLowerCase()}?\n`;
    questions += `2. How would you describe ${title.toLowerCase()} to someone new to the subject?\n`;
    questions += `3. What is the significance of ${title.toLowerCase()} in the broader field?\n\n`;

    questions += `## Application Questions\n\n`;

    // Generate application questions from sections
    lesson.sections.forEach((section, index) => {
      const keyTerm = section.split(" ").slice(0, 2).join(" ");
      questions += `${
        index + 4
      }. How can ${keyTerm.toLowerCase()} be applied in a real-world scenario?\n`;
    });

    questions += `\n## Critical Thinking Questions\n\n`;
    questions += `${
      lesson.sections.length + 4
    }. What are the potential limitations or challenges with ${title.toLowerCase()}?\n`;
    questions += `${
      lesson.sections.length + 5
    }. How might ${title.toLowerCase()} evolve in the future?\n`;
    questions += `${
      lesson.sections.length + 6
    }. Compare and contrast ${title.toLowerCase()} with other related concepts in the course.\n`;

    return questions;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-[90%] max-w-3xl max-h-[80vh] shadow-xl overflow-hidden flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="font-semibold text-purple-800 flex items-center">
            <Sparkles size={18} className="mr-2 text-purple-600" />
            AI Note Generator
          </h3>
          <Button
            onClick={onClose}
            variant="ghost"
            size="sm"
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={18} />
          </Button>
        </div>

        <div className="p-4 overflow-y-auto flex-grow">
          {!generatedNote ? (
            <>
              <div className="mb-6">
                <h4 className="text-lg font-medium mb-2">
                  Generate notes for:
                </h4>
                <div className="p-3 bg-purple-50 rounded-lg border border-purple-100">
                  <p className="font-medium">
                    {lesson?.title || "Selected lesson"}
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-medium mb-2">Note format:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <button
                    onClick={() => setSelectedFormat("summary")}
                    className={`p-4 rounded-lg border text-left transition ${
                      selectedFormat === "summary"
                        ? "bg-purple-100 border-purple-300"
                        : "bg-white border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <div className="font-medium mb-1">Summary</div>
                    <p className="text-sm text-gray-600">
                      A concise overview of key points and concepts
                    </p>
                  </button>

                  <button
                    onClick={() => setSelectedFormat("flashcards")}
                    className={`p-4 rounded-lg border text-left transition ${
                      selectedFormat === "flashcards"
                        ? "bg-purple-100 border-purple-300"
                        : "bg-white border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <div className="font-medium mb-1">Flashcards</div>
                    <p className="text-sm text-gray-600">
                      Question-answer pairs for active recall practice
                    </p>
                  </button>

                  <button
                    onClick={() => setSelectedFormat("mindmap")}
                    className={`p-4 rounded-lg border text-left transition ${
                      selectedFormat === "mindmap"
                        ? "bg-purple-100 border-purple-300"
                        : "bg-white border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <div className="font-medium mb-1">Mind Map</div>
                    <p className="text-sm text-gray-600">
                      Visual organization of concepts and relationships
                    </p>
                  </button>

                  <button
                    onClick={() => setSelectedFormat("questions")}
                    className={`p-4 rounded-lg border text-left transition ${
                      selectedFormat === "questions"
                        ? "bg-purple-100 border-purple-300"
                        : "bg-white border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <div className="font-medium mb-1">Study Questions</div>
                    <p className="text-sm text-gray-600">
                      Thought-provoking questions to test understanding
                    </p>
                  </button>
                </div>
              </div>

              <Button
                onClick={generateNotes}
                disabled={generating || !lesson}
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                {generating ? (
                  <>
                    <span className="mr-2">Generating</span>
                    <div className="animate-spin h-5 w-5 border-2 border-white rounded-full border-t-transparent"></div>
                  </>
                ) : (
                  <>
                    <Sparkles size={16} className="mr-2" />
                    Generate{" "}
                    {selectedFormat.charAt(0).toUpperCase() +
                      selectedFormat.slice(1)}{" "}
                    Notes
                  </>
                )}
              </Button>
            </>
          ) : (
            <>
              <div className="mb-4 flex justify-between items-center">
                <h4 className="text-lg font-medium text-purple-800">
                  {generatedNote.title}
                </h4>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyToClipboard}
                    className="flex items-center gap-1"
                  >
                    {copied ? (
                      <>
                        <Check size={14} className="text-green-600" />
                        <span className="text-green-600">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy size={14} />
                        <span>Copy</span>
                      </>
                    )}
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={downloadNote}
                    className="flex items-center gap-1"
                  >
                    <Download size={14} />
                    <span>Download</span>
                  </Button>
                </div>
              </div>

              <div className="bg-gray-50 border rounded-lg p-4 mb-4 font-mono text-sm whitespace-pre-wrap overflow-x-auto">
                {generatedNote.content}
              </div>

              <div className="flex justify-end gap-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    setGeneratedNote(null);
                    setGenerating(false);
                  }}
                >
                  Generate Another
                </Button>

                <Button
                  onClick={saveNote}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  <FileText size={16} className="mr-2" />
                  Save to Notes
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NoteGenerator;
