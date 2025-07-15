import React from "react";

export default function ProgressBar({ step, totalSteps }) {
  const percent = Math.round((step / totalSteps) * 100);

  return (
    <div className="w-full mb-6">
      <div className="flex justify-between mb-1 text-sm text-gray-500">
        <div>Step {step} of {totalSteps}</div>
        <div>{percent}% complete</div>
      </div>
      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-green-500 transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
