import React, { useState } from "react";

const questions = [
  {
    key: "smoking",
    text: "Views on smoking/drinking?",
    options: [
      "Never acceptable",
      "Occasionally acceptable",
      "Regularly acceptable",
      "Don't care"
    ],
  },
  {
    key: "past",
    text: "How open are you to discussing past relationships?",
    options: [
      "Prefer no past",
      "Open to discuss",
      "Avoid discussing",
      "Don't care"
    ],
  },
  {
    key: "children",
    text: "Views on children and parenting?",
    options: [
      "No children",
      "Maybe in future",
      "Want children",
      "Flexible"
    ],
  },
  {
    key: "finance",
    text: "Preferred financial management style?",
    options: [
      "Joint accounts",
      "Separate accounts",
      "No strong opinion",
      "Flexible"
    ],
  },
  // {
  //   key: "divorce",
  //   text: "Views on divorce/polygamy?",
  //   options: [
  //     "Never acceptable",
  //     "Acceptable if needed",
  //     "Polygamy acceptable",
  //     "Flexible"
  //   ],
  // },
];

export default function DealbreakersSection({ answers, next, prev }) {
  const [person1, setPerson1] = useState({});
  const [person2, setPerson2] = useState({});

  const handleChange = (key, val, who) => {
    if (who === "p1") setPerson1((p) => ({ ...p, [key]: val }));
    else setPerson2((p) => ({ ...p, [key]: val }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    next({ dealbreakers: { person1, person2 } });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="font-semibold text-lg mb-3">Dealbreakers</h2>
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
