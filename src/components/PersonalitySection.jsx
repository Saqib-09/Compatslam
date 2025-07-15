import React, { useState } from "react";

const questions = [
  {
    key: "social",
    text: "Are you more introverted or extroverted?",
    options: ["Introvert", "Somewhat introvert", "Somewhat extrovert", "Extrovert"],
  },
  {
    key: "career",
    text: "How ambitious are you regarding your career?",
    options: ["Not ambitious", "Somewhat", "Ambitious", "Very ambitious"],
  },
  {
    key: "worklife",
    text: "Your preferred work-life balance?",
    options: [
      "Work-focused",
      "Balanced",
      "Family-focused",
      "Flexible/Depends"
    ],
  },
  {
    key: "relocation",
    text: "Are you open to relocating for marriage?",
    options: ["Not open", "Maybe", "Open if needed", "Absolutely open"],
  },
  {
    key: "hobbies",
    text: "How important are hobbies/interests to you?",
    options: [
      "Not important",
      "Somewhat important",
      "Important",
      "Very important",
    ],
  },
];

export default function PersonalitySection({ answers, next, prev }) {
  const [person1, setPerson1] = useState({});
  const [person2, setPerson2] = useState({});

  const handleChange = (key, val, who) => {
    if (who === "p1") setPerson1((p) => ({ ...p, [key]: val }));
    else setPerson2((p) => ({ ...p, [key]: val }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    next({ personality: { person1, person2 } });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="font-semibold text-lg mb-3">Personality & Life Goals</h2>
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
