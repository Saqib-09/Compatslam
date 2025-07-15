import React, { useState } from "react";

const questions = [
  {
    key: "conflict",
    text: "How do you usually resolve conflicts?",
    options: [
      "Talk immediately",
      "Need time before talking",
      "Silent treatment",
      "Other"
    ],
  },
  {
    key: "parentsConflict",
    text: "If your spouse disagrees with your parents, you would...",
    options: [
      "Support parents",
      "Support spouse",
      "Stay neutral",
      "Try to mediate"
    ],
  },
  {
    key: "stress",
    text: "In stressful situations, you are most likely to...",
    options: [
      "Stay calm",
      "Get anxious",
      "Withdraw",
      "Seek help"
    ],
  },
];

export default function ScenarioSection({ answers, next, prev }) {
  const [person1, setPerson1] = useState({});
  const [person2, setPerson2] = useState({});

  const handleChange = (key, val, who) => {
    if (who === "p1") setPerson1((p) => ({ ...p, [key]: val }));
    else setPerson2((p) => ({ ...p, [key]: val }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    next({ scenario: { person1, person2 } });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="font-bold text-xl mb-4 px-2 py-1 rounded-md bg-gradient-to-r from-magenta-200 to-pink-120 shadow text-blue-500">Scenario-Based & Psychological</h2>
      <div className="grid grid-cols-2 gap-12">
        {[answers.person1, answers.person2].map((person, i) => (
          <div key={i}>
            <h3 className="font-medium mb-2">
              {i === 0 ? "Your Answers" : "Their Answers"}
            </h3>
            {questions.map((q) => (
              <div className="mb-2" key={q.key}>
                <label className="block mb-1 text-sm">{q.text}</label>
                <select
                  className="block w-full p-2 rounded border"
                  required
                  value={
                    (i === 0 ? person1[q.key] : person2[q.key]) || ""
                  }
                  onChange={(e) =>
                    handleChange(q.key, e.target.value, i === 0 ? "p1" : "p2")
                  }
                >
                  <option value="" disabled>
                    Select an option
                  </option>
                  {q.options.map((opt) => (
                    <option key={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="flex gap-3 mt-4">
        <button
          type="button"
          onClick={prev}
          className="px-4 py-2 rounded bg-gray-200"
        >
          Back
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Next
        </button>
      </div>
    </form>
  );
}
