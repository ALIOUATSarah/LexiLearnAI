// Pattern detection function for adaptive mode
export const detectPatterns = (text, mode, sensitivityProfile) => {
  if (mode !== "adaptive") return text;

  try {
    // Create a temporary div to sanitize the input first
    const tempDiv = document.createElement("div");
    tempDiv.textContent = text; // This safely escapes any HTML in the text
    const sanitizedText = tempDiv.textContent;

    // More sophisticated pattern detection logic
    const complexPatterns = [
      /([a-z]{3,})ing\b/gi, // Words ending with 'ing'
      /\b([a-z]{3,})tion\b/gi, // Words ending with 'tion'
      /\b([a-z]{2,})([a-z]{2,})\2([a-z]*)\b/gi, // Words with repeated letter patterns
      /\b([a-z]{4,})\b/gi, // Longer words
      /\b(simultaneous|characteristic|phenomenon|consequently|extraordinary|nevertheless|approximately|immediately|particularly|representation|circumstances|substantially|effectiveness|comprehensive|significantly|approximately|coordination|inappropriate|unfortunately|underestimated)\b/gi, // Specifically difficult words
      /\b([a-z]{3,}ph[a-z]{2,})\b/gi, // Words with 'ph' combination
      /\b([a-z]*[aeiou]{3,}[a-z]*)\b/gi, // Words with 3+ consecutive vowels
      /\b([a-z]*th[aeiou][a-z]*)\b/gi, // Words with 'th' followed by a vowel
      /\b([bcdfghjklmnpqrstvwxyz]{3,}[aeiou])/gi, // Words starting with 3+ consonants
    ];

    // Create a map of difficult words and simpler alternatives
    const wordReplacements = {
      subsequently: "later",
      consequently: "so",
      nevertheless: "still",
      approximately: "about",
      immediately: "now",
      particularly: "especially",
      representation: "image",
      circumstances: "conditions",
      substantially: "greatly",
      effectiveness: "success",
      comprehensive: "complete",
      significantly: "greatly",
      coordination: "connection",
      inappropriate: "wrong",
      unfortunately: "sadly",
      underestimated: "missed",
      phenomenon: "event",
      sufficient: "enough",
      facilitate: "help",
      fundamental: "basic",
      demonstrate: "show",
      essentially: "basically",
      perspective: "view",
      preliminary: "early",
      comparable: "similar",
      eventually: "finally",
    };

    // Safer approach - work with string segments to avoid double processing
    let result = sanitizedText;
    let segments = [{ text: result, isHighlighted: false }];
    let newSegments = [];

    // First apply word replacements
    if (sensitivityProfile?.wordReplacement) {
      for (const [difficult, simple] of Object.entries(wordReplacements)) {
        newSegments = [];
        const regex = new RegExp(`\\b${difficult}\\b`, "gi");

        for (const segment of segments) {
          if (segment.isHighlighted) {
            newSegments.push(segment); // Don't process already highlighted segments
            continue;
          }

          let lastIndex = 0;
          let match;
          let segmentText = segment.text;

          while ((match = regex.exec(segmentText)) !== null) {
            // Add text before the match
            if (match.index > lastIndex) {
              newSegments.push({
                text: segmentText.substring(lastIndex, match.index),
                isHighlighted: false,
              });
            }

            // Add the replaced word
            newSegments.push({
              text: `<span class="replaced-word" title="Original: ${difficult}">${simple}</span>`,
              isHighlighted: true,
            });

            lastIndex = regex.lastIndex;
          }

          // Add the remaining text
          if (lastIndex < segmentText.length) {
            newSegments.push({
              text: segmentText.substring(lastIndex),
              isHighlighted: false,
            });
          }
        }

        segments = newSegments;
      }
    }

    // Then apply pattern highlighting
    if (sensitivityProfile?.textPatterns) {
      for (const pattern of complexPatterns) {
        newSegments = [];

        for (const segment of segments) {
          if (segment.isHighlighted) {
            newSegments.push(segment); // Don't process already highlighted segments
            continue;
          }

          let lastIndex = 0;
          let match;
          let segmentText = segment.text;
          pattern.lastIndex = 0; // Reset regex state

          while ((match = pattern.exec(segmentText)) !== null) {
            // Add text before the match
            if (match.index > lastIndex) {
              newSegments.push({
                text: segmentText.substring(lastIndex, match.index),
                isHighlighted: false,
              });
            }

            // Add the highlighted pattern
            newSegments.push({
              text: `<span class="pattern-detected">${match[0]}</span>`,
              isHighlighted: true,
            });

            lastIndex = pattern.lastIndex;
          }

          // Add the remaining text
          if (lastIndex < segmentText.length) {
            newSegments.push({
              text: segmentText.substring(lastIndex),
              isHighlighted: false,
            });
          }
        }

        segments = newSegments;
      }
    }

    // Combine all segments back into a single string
    result = segments.map((segment) => segment.text).join("");

    return result;
  } catch (err) {
    console.error("Error in pattern detection:", err);
    return text; // Return original text if there's an error
  }
};

// Get CSS classes based on current mode
export const getModeClasses = (mode, colorTheme) => {
  if (mode === "dyslexia") {
    const bg = colorTheme?.dyslexia?.background || "amber";
    return `dyslexia-mode bg-${bg}-50 dyslexia-fonts`;
  } else if (mode === "adhd") {
    const bg = colorTheme?.adhd?.background || "blue";
    return `adhd-mode bg-${bg}-50 adhd-focus`;
  } else if (mode === "adaptive") {
    const bg = colorTheme?.adaptive?.background || "indigo";
    return `adaptive-mode bg-${bg}-50 adaptive-sensory`;
  } else {
    return "normal-mode";
  }
};

// Function to apply sensory break
export const applySensoryBreak = () => {
  // Simplified version that removes detected patterns temporarily
  const patterns = document.querySelectorAll(".pattern-detected");
  patterns.forEach((el) => {
    el.classList.remove("pattern-detected");
  });

  // Apply reduced contrast
  document
    .querySelector(".adaptive-sensory")
    ?.classList.add("reduced-contrast");

  // After 10 seconds, restore normal state
  setTimeout(() => {
    document
      .querySelector(".adaptive-sensory")
      ?.classList.remove("reduced-contrast");
  }, 10000);
};

// Get appropriate file icon based on material type
export const getFileIcon = (type, icons) => {
  const { FileText } = icons;
  switch (type) {
    case "pdf":
      return <FileText className="text-red-500" size={20} />;
    case "ppt":
      return <FileText className="text-orange-500" size={20} />;
    case "doc":
      return <FileText className="text-blue-500" size={20} />;
    case "slides":
      return <FileText className="text-orange-500" size={20} />;
    case "reading":
      return <FileText className="text-red-500" size={20} />;
    case "video":
      return <FileText className="text-purple-500" size={20} />;
    case "worksheet":
      return <FileText className="text-blue-500" size={20} />;
    default:
      return <FileText className="text-gray-500" size={20} />;
  }
};
