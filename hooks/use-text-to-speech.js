import { useState, useEffect, useCallback } from "react";

export function useTextToSpeech() {
  const [speaking, setSpeaking] = useState(false);
  const [currentElement, setCurrentElement] = useState(null);
  const [autoReadEnabled, setAutoReadEnabled] = useState(false);

  // Define speak as a memoized callback so it can be used in the effect
  const speak = useCallback((text, rate = 1) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = rate;
    utterance.pitch = 1;

    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);

    window.speechSynthesis.speak(utterance);
  }, []);

  const stop = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
    }
  }, []);

  // Handle Alt+S keyboard shortcut for selected text
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.altKey && e.key.toLowerCase() === "s" && autoReadEnabled) {
        const selectedText = window.getSelection().toString();
        if (selectedText) {
          speak(selectedText);
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    // Cleanup function that runs when component unmounts or dependency changes
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [autoReadEnabled, speak]);

  return {
    speak,
    stop,
    speaking,
    setCurrentElement,
    currentElement,
    autoReadEnabled,
    setAutoReadEnabled,
  };
}
