import React, { useState } from "react";

export default function BasicInfoForm({ next }) {
  const [p1, setP1] = useState({ name: "", age: "", gender: "Male" });
  const [p2, setP2] = useState({ name: "", age: "", gender: "Female" });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Names required, no numbers, age required, genders must differ
    if (
      !p1.name.trim() ||
      !p2.name.trim() ||
      !p1.age ||
      !p2.age ||
      /\d/.test(p1.name) ||
      /\d/.test(p2.name)
    ) {
      alert("Please enter valid names and ages for both.");
      return;
    }

    if (p1.gender === p2.gender) {
      alert("Genders must be different.");
      return;
    }

    next({ person1: p1, person2: p2 });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="font-semibold text-lg mb-3">Basic Info</h2>
      <div className="grid grid-cols-2 gap-12 mb-4">
        <div>
          <h3 className="font-medium mb-2">Your Info</h3>
          <input
            className="block w-full mb-2 p-2 rounded border"
            placeholder="Name"
            value={p1.name}
            pattern="[A-Za-z\s]+"
            onChange={e => setP1({ ...p1, name: e.target.value })}
            required
          />
          <input
            className="block w-full mb-2 p-2 rounded border"
            placeholder="Age"
            type="number"
            value={p1.age}
            onChange={e => setP1({ ...p1, age: e.target.value })}
            min="18"
            max="80"
            required
          />
          <select
            className="block w-full p-2 rounded border"
            value={p1.gender}
            onChange={e => setP1({ ...p1, gender: e.target.value })}
            required
          >
            <option>Male</option>
            <option>Female</option>
          </select>
        </div>
        <div>
          <h3 className="font-medium mb-2">Their Info</h3>
          <input
            className="block w-full mb-2 p-2 rounded border"
            placeholder="Name"
            value={p2.name}
            pattern="[A-Za-z\s]+"
            onChange={e => setP2({ ...p2, name: e.target.value })}
            required
          />
          <input
            className="block w-full mb-2 p-2 rounded border"
            placeholder="Age"
            type="number"
            value={p2.age}
            onChange={e => setP2({ ...p2, age: e.target.value })}
            min="18"
            max="80"
            required
          />
          <select
            className="block w-full p-2 rounded border"
            value={p2.gender}
            onChange={e => setP2({ ...p2, gender: e.target.value })}
            required
          >
            <option>Male</option>
            <option>Female</option>
          </select>
        </div>
      </div>
      <button
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        type="submit"
      >
        Next
      </button>
    </form>
  );
}
