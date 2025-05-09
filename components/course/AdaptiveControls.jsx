import React from "react";
import { applySensoryBreak } from "@/lib/course-utils";

const AdaptiveControls = ({
  mode,
  sensitivityProfile,
  updateSensitivityProfile,
}) => {
  if (mode !== "adaptive") return null;

  return (
    <>
      <div className="adaptive-control">
        <h3 className="text-sm font-medium text-indigo-800 mb-2">
          Sensory Sensitivity Settings
        </h3>
        <div className="space-y-3">
          <div>
            <label className="flex items-center text-sm">
              <input
                type="checkbox"
                checked={sensitivityProfile.textPatterns}
                onChange={(e) =>
                  updateSensitivityProfile("textPatterns", e.target.checked)
                }
                className="mr-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              Highlight difficult word patterns
            </label>
          </div>
          <div>
            <label className="flex items-center text-sm">
              <input
                type="checkbox"
                checked={sensitivityProfile.wordReplacement}
                onChange={(e) =>
                  updateSensitivityProfile("wordReplacement", e.target.checked)
                }
                className="mr-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              Replace complex words with simpler ones
            </label>
          </div>
          <div>
            <label className="flex items-center text-sm">
              <input
                type="checkbox"
                checked={sensitivityProfile.contrast}
                onChange={(e) =>
                  updateSensitivityProfile("contrast", e.target.checked)
                }
                className="mr-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              Reduce contrast
            </label>
          </div>
          <div>
            <label className="flex items-center text-sm">
              <input
                type="checkbox"
                checked={sensitivityProfile.wordSpacing}
                onChange={(e) =>
                  updateSensitivityProfile("wordSpacing", e.target.checked)
                }
                className="mr-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              Increase word spacing
            </label>
          </div>
          <div>
            <label className="flex items-center text-sm">
              <input
                type="checkbox"
                checked={sensitivityProfile.fontWeight}
                onChange={(e) =>
                  updateSensitivityProfile("fontWeight", e.target.checked)
                }
                className="mr-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              Increase font weight
            </label>
          </div>
        </div>
      </div>
      <button onClick={applySensoryBreak} className="sensory-break-button">
        <span className="sr-only">Take a sensory break</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 7V4H6v3" />
          <path d="M18 11H6" />
          <rect x="6" y="15" width="12" height="5" rx="1" />
        </svg>
      </button>
    </>
  );
};

export default AdaptiveControls;
