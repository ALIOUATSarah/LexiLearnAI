"use client";

import React from "react";

export default function DashboardPreview() {
  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-indigo-100 relative z-10">
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
      <div className="p-1">
        <img
          src="/dashboard-preview.png"
          alt="LexiLearn Dashboard"
          className="rounded-xl shadow-inner"
          onError={(e) => {
            e.target.src =
              "https://placehold.co/600x400/indigo/white?text=LexiLearn+Dashboard";
          }}
        />
      </div>
    </div>
  );
}
