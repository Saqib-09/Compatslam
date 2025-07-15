import React, { useState } from "react";
import BasicInfoForm from "./components/BasicInfoForm";
import IslamicSection from "./components/IslamicSection";
import PersonalitySection from "./components/PersonalitySection";
import FamilySection from "./components/FamilySection";
import DealbreakersSection from "./components/DealbreakersSection";
import ScenarioSection from "./components/ScenarioSection";
import ResultCard from "./components/ResultCard";
import logo from "./assets/logo.svg";

const steps = [
  "BasicInfo",
  "Islamic",
  "Personality",
  "Family",
  "Dealbreakers",
  "Scenario",
  "Result",
];

export default function App() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({
    person1: {},
    person2: {},
    islamic: {},
    personality: {},
    family: {},
    dealbreakers: {},
    scenario: {},
  });

  const next = (data) => {
    setAnswers((prev) => ({ ...prev, ...data }));
    setStep((prev) => prev + 1);
  };

  const prev = () => setStep((prev) => prev - 1);

  return (
    <div className="min-h-screen flex flex-col items-center px-2 bg-gradient-to-tr from-green-500 via-blue-200">
      <header className="w-full max-w-2xl flex items-center gap-3 mt-6 mb-2">
        <img src={logo} alt="Logo" className="h-12" />
        <h1 className="text-2xl font-bold text-green-800">
          Marriage Compatibility Checker
        </h1>
      </header>
      <main className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-6 mb-10">
        {steps[step] === "BasicInfo" && (
          <BasicInfoForm next={next} />
        )}
        {steps[step] === "Islamic" && (
          <IslamicSection answers={answers} next={next} prev={prev} />
        )}
        {steps[step] === "Personality" && (
          <PersonalitySection answers={answers} next={next} prev={prev} />
        )}
        {steps[step] === "Family" && (
          <FamilySection answers={answers} next={next} prev={prev} />
        )}
        {steps[step] === "Dealbreakers" && (
          <DealbreakersSection answers={answers} next={next} prev={prev} />
        )}
        {steps[step] === "Scenario" && (
          <ScenarioSection answers={answers} next={next} prev={prev} />
        )}
        {steps[step] === "Result" && (
          <ResultCard answers={answers} prev={prev} />
        )}
      </main>
      <footer className="text-xs text-gray-400 mt-auto mb-3">
        © {new Date().getFullYear()} COMPATSLAM by M&S
      </footer>
    </div>
  );
}
