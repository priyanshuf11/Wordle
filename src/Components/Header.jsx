import React, { useState } from "react";
import "../style/header.css";

import DifficultyDropdown from "./DifficultyDropdown";

const Header = ({ setDifficulty }) => {
  const [isRulesVisible, setIsRulesVisible] = useState(false);

  const toggleRulesVisibility = () => setIsRulesVisible(!isRulesVisible);

  const handleChange = (e) => {
    setDifficulty(e.target.value);
  };

  return (
    <>
      <header className="flex flex-wrap items-center justify-between px-4 py-3 bg-blackbg border-b border-gray-700 text-white">
        {/* Brand */}
        <div className="flex items-center text-2xl font-bold mb-2 sm:mb-0">
          <p className="text-green-400">Word</p>
          <p className="text-yellow-400 ml-1">Guess</p>
        </div>

        {/* Menu / Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={toggleRulesVisibility}
            className="px-3 py-1 border border-white rounded-lg hover:bg-slate-100 hover:text-black transition-all text-sm sm:text-base"
          >
            Rules
          </button>

          <DifficultyDropdown setDifficulty={setDifficulty}/>
        </div>
      </header>

      {/* Rules overlay */}
      {isRulesVisible && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4"
          onClick={() => setIsRulesVisible(false)}
        >
          <div
            className="bg-blackbg max-w-lg w-full text-white p-6 sm:p-10 rounded-lg overflow-y-auto max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl sm:text-4xl font-bold mb-4">Game Rules:</h2>
            <ul className="list-disc pl-5 text-base sm:text-lg">
              <li className="mb-2">Guess the word in 6 attempts</li>
              <li className="mb-2">Each guess must be a valid 5-letter word</li>
              <li className="mb-2">
                After each guess, colors indicate if letters are correct,
                misplaced, or incorrect
              </li>
            </ul>

            <p className="text-lg font-bold mt-6">Example:</p>
            <div className="flex items-center gap-2 mt-2">
              <div className="tile bg-correct">G</div>
              <p>Correct letter and correct position</p>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <div className="tile bg-misplaced">E</div>
              <p>Correct letter, wrong position</p>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <div className="tile bg-incorrect">S</div>
              <p>Letter not in the word</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
