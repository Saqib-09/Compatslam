import React from "react";

// Helper function for simple compatibility scoring (can be improved)
function getCompatibility(answers) {
  const sections = [
    "islamic",
    "personality",
    "family",
    "dealbreakers",
    "scenario"
  ];
  const result = {};
  sections.forEach(section => {
    const p1 = answers[section]?.person1 || {};
    const p2 = answers[section]?.person2 || {};
    let total = 0, match = 0, details = [];
    Object.keys(p1).forEach(k => {
      total++;
      if (p1[k] === p2[k]) {
        match++;
        details.push({ question: k, type: "match" });
      } else {
        details.push({ question: k, type: "diff" });
      }
    });
    result[section] = {
      percent: total ? Math.round((match / total) * 100) : 0,
      details
    };
  });
  return result;
}

export default function ResultCard({ answers, prev }) {
  const comp = getCompatibility(answers);

  return (
    <div>
      <h2 className="font-semibold text-lg mb-3">Compatibility Scorecard</h2>
      <div className="grid grid-cols-2 gap-8 mb-4">
        <div className="rounded-xl p-3 bg-green-50">
          <div className="text-sm text-green-700">Faith/Islamic</div>
          <div className="font-bold text-2xl">
            {comp.islamic.percent}%
          </div>
        </div>
        <div className="rounded-xl p-3 bg-blue-50">
          <div className="text-sm text-blue-700">Personality</div>
          <div className="font-bold text-2xl">
            {comp.personality.percent}%
          </div>
        </div>
        <div className="rounded-xl p-3 bg-yellow-50">
          <div className="text-sm text-yellow-700">Family</div>
          <div className="font-bold text-2xl">
            {comp.family.percent}%
          </div>
        </div>
        <div className="rounded-xl p-3 bg-pink-50">
          <div className="text-sm text-pink-700">Dealbreakers</div>
          <div className="font-bold text-2xl">
            {comp.dealbreakers.percent}%
          </div>
        </div>
        <div className="rounded-xl p-3 bg-gray-100">
          <div className="text-sm text-gray-700">Scenarios</div>
          <div className="font-bold text-2xl">
            {comp.scenario.percent}%
          </div>
        </div>
      </div>
      <div className="mb-3">
        <h3 className="font-semibold mb-1">Summary</h3>
        <ul className="list-disc ml-5 text-sm">
          {Object.entries(comp).map(([section, secComp]) =>
            secComp.percent < 70 ? (
              <li key={section}>
                <span className="font-bold capitalize">{section}:</span>{" "}
                {secComp.percent}% – Potential area to discuss!
              </li>
            ) : (
              <li key={section}>
                <span className="font-bold capitalize">{section}:</span>{" "}
                {secComp.percent}% – Good compatibility!
              </li>
            )
          )}
        </ul>
      </div>
      <div className="text-xs text-gray-500 mb-3">
        This is a simple compatibility estimate. Use it as a conversation starter—not a final decision!
      </div>
      <button
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        onClick={prev}
      >
        Back
      </button>
    </div>
  );
}
