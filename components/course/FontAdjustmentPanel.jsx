import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const FontAdjustmentPanel = ({ isOpen, onClose, applyFontSettings }) => {
  const [fontSize, setFontSize] = useState(100);
  const [letterSpacing, setLetterSpacing] = useState(0.05);
  const [lineHeight, setLineHeight] = useState(1.6);
  const [fontFamily, setFontFamily] = useState("Arial");

  const handleApplySettings = () => {
    applyFontSettings({
      fontSize,
      letterSpacing,
      lineHeight,
      fontFamily,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-[320px] shadow-xl">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="font-semibold text-amber-800">Font Adjustments</h3>
          <Button
            onClick={onClose}
            variant="ghost"
            size="sm"
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={18} />
          </Button>
        </div>

        <div className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Font Size: {fontSize}%
            </label>
            <input
              type="range"
              min="80"
              max="150"
              value={fontSize}
              onChange={(e) => setFontSize(parseInt(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Letter Spacing: {letterSpacing}em
            </label>
            <input
              type="range"
              min="0"
              max="0.2"
              step="0.01"
              value={letterSpacing}
              onChange={(e) => setLetterSpacing(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Line Height: {lineHeight}
            </label>
            <input
              type="range"
              min="1"
              max="2.5"
              step="0.1"
              value={lineHeight}
              onChange={(e) => setLineHeight(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Font Family
            </label>
            <select
              value={fontFamily}
              onChange={(e) => setFontFamily(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="Arial">Arial</option>
              <option value="OpenDyslexic">OpenDyslexic</option>
              <option value="Comic Sans MS">Comic Sans MS</option>
              <option value="Verdana">Verdana</option>
            </select>
          </div>

          <Button
            onClick={handleApplySettings}
            className="w-full bg-amber-600 hover:bg-amber-700 text-white mt-4"
          >
            Apply Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FontAdjustmentPanel;
