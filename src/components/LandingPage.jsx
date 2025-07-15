import React from "react";

export default function LandingPage({ onStart }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="bg-white/90 rounded-3xl shadow-xl px-8 py-10 max-w-xl text-center">
        <h2 className="text-3xl font-bold mb-4 text-green-700">
          Welcome to the Marriage Compatibility Checker
        </h2>
        <p className="text-gray-600 mb-4">
          Discover how compatible you and your potential spouse are across faith, values, personality, and family life—with an Islamic perspective.
        </p>
        <div className="mb-4 italic text-green-900">
          “And He placed between you affection and mercy.” <br />
          <span className="text-xs">(Quran 30:21)</span>
        </div>
        <button
          className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-3 rounded-xl font-semibold shadow"
          onClick={onStart}
        >
          Start Compatibility Check
        </button>
      </div>
      <div className="mt-8 text-xs text-gray-400">
        100% Private – Nothing is saved or shared.
      </div>
    </div>
  );
}
