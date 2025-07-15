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
    }
  };

  const questionText = {
    islamic: {
      prayer: "Five daily prayers",
      fasting: "Fasting in Ramadan",
      modesty: "Modesty (hijab/beard/attire)",
      tolerance: "Tolerance for Islamic opinions",
    },
    personality: {
      social: "Introvert or extrovert",
      career: "Career ambition",
      worklife: "Work-life balance",
      relocation: "Openness to relocation",
      hobbies: "Importance of hobbies",
    },
    family: {
      parents: "Closeness to parents",
      inlaws: "Expectations from in-laws",
      familysetup: "Preferred family setup",
      social: "Enjoyment of social gatherings",
    },
    dealbreakers: {
      smoking: "Views on smoking/drinking",
      past: "Discussing past relationships",
      children: "Views on children/parenting",
      finance: "Financial management style",
    },
    scenario: {
      conflict: "Conflict resolution style",
      parentsConflict: "Handling spouse/parents disagreements",
      stress: "Handling stress",
    }
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
      let label = questionText[section]?.[key] || key;
      if (p1[key] === p2[key]) {
        score += 1;
        details.push({
          question: key,
          type: "match",
          label
        });
      } else if (
        fuzzyMatches[section] &&
        fuzzyMatches[section][key] &&
        fuzzyMatches[section][key].some(
          ([a, b]) =>
          (p1[key] === a && p2[key] === b) ||
          (p1[key] === b && p2[key] === a)
        )
      ) {
        score += 0.5; // Partial match
        details.push({
          question: key,
          type: "fuzzy",
          label
        });
      } else {
        details.push({
          question: key,
          type: "diff",
          label
        });
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
  <>
    {/* Compatibility cards in a grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
      <div className="rounded-xl p-3 bg-green-50 border-l-8 border-green-400">
        <div className="text-sm text-green-700">Faith/Islamic 🕌</div>
        <div className="font-bold text-2xl">{comp.islamic.percent}%</div>
      </div>
      <div className="rounded-xl p-3 bg-blue-50 border-l-8 border-blue-400">
        <div className="text-sm text-blue-700">Personality 😃</div>
        <div className="font-bold text-2xl">{comp.personality.percent}%</div>
      </div>
      <div className="rounded-xl p-3 bg-yellow-50 border-l-8 border-yellow-400">
        <div className="text-sm text-yellow-700">Family 👪</div>
        <div className="font-bold text-2xl">{comp.family.percent}%</div>
      </div>
      <div className="rounded-xl p-3 bg-pink-50 border-l-8 border-pink-400">
        <div className="text-sm text-pink-700">Dealbreakers 🚩</div>
        <div className="font-bold text-2xl">{comp.dealbreakers.percent}%</div>
      </div>
      <div className="rounded-xl p-3 bg-gray-100 border-l-8 border-gray-400">
        <div className="text-sm text-gray-700">Scenarios 🧩</div>
        <div className="font-bold text-2xl">{comp.scenario.percent}%</div>
      </div>
    </div>

    {/* Breakdown and other content, outside the grid */}
    <div className="mb-6">
      <h3 className="font-semibold mb-2">Question-by-Question Breakdown</h3>
      {Object.entries(comp).map(([section, secComp]) => (
        <div key={section} className="mb-2">
          <div className="font-semibold capitalize text-gray-700 mb-1">{section}</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 pl-4">
            {secComp.details.map((d, i) => (
              <div key={i} className="flex items-center text-sm mb-1">
                {d.type === "match" ? (
                  <span className="text-green-600 mr-2">✅</span>
                ) : d.type === "fuzzy" ? (
                  <span className="text-yellow-500 mr-2">🤝</span>
                ) : (
                  <span className="text-red-500 mr-2">❌</span>
                )}
                <span>{d.label}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
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
  </>
);
}
