import React from "react";

// Helper function for simple compatibility scoring (can be improved)
function getCompatibility(answers) {
  // Define which answers are "similar" (partial matches)
  const fuzzyMatches = {
    family: {
      familysetup: [
        ["Nuclear family", "Flexible"],
        ["Joint family", "Flexible"],
        ["Flexible", "Depends on circumstances"],
        ["Nuclear family", "Depends on circumstances"],
        ["Joint family", "Depends on circumstances"]
      ],
      parents: [
        ["Close", "Very close"],
        ["Somewhat close", "Close"],
        ["Somewhat close", "Very close"]
      ],
      inlaws: [
        ["Frequent contact", "Like immediate family"],
        ["Occasional contact", "Frequent contact"]
      ],
      social: [
        ["Often", "Very much"],
        ["Sometimes", "Often"]
      ]
    },
    personality: {
      social: [
        ["Introvert", "Somewhat introvert"],
        ["Extrovert", "Somewhat extrovert"]
      ],
      career: [
        ["Ambitious", "Very ambitious"],
        ["Somewhat", "Ambitious"]
      ],
      worklife: [
        ["Balanced", "Family-focused"],
        ["Balanced", "Work-focused"],
        ["Flexible/Depends", "Balanced"]
      ],
      relocation: [
        ["Open if needed", "Absolutely open"],
        ["Maybe", "Open if needed"]
      ],
      hobbies: [
        ["Important", "Very important"],
        ["Somewhat important", "Important"]
      ]
    },
    // You can add more fuzzy maps for other sections if you want
  };

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
    let total = 0,
      score = 0,
      details = [];
    Object.keys(p1).forEach(key => {
      total++;
      if (p1[key] === p2[key]) {
        score += 1;
        details.push({ question: key, type: "match" });
      } else if (
        fuzzyMatches[section] &&
        fuzzyMatches[section][key] &&
        fuzzyMatches[section][key].some(
          ([a, b]) =>
            (p1[key] === a && p2[key] === b) ||
            (p1[key] === b && p2[key] === a)
        )
      ) {
        score += 0.5; // Give 0.5 for partial/fuzzy match
        details.push({ question: key, type: "fuzzy" });
      } else {
        details.push({ question: key, type: "diff" });
      }
    });
    result[section] = {
      percent: total ? Math.round((score / total) * 100) : 0,
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
