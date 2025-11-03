import React, { useState, useRef, useEffect } from "react";

const DifficultyDropdown = ({ setDifficulty }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("easy");
  const dropdownRef = useRef(null);

  const options = [
    { value: "easy", label: "Easy", color: "text-green-400", shadow: "shadow-green-400/50" },
    { value: "medium", label: "Medium", color: "text-yellow-400", shadow: "shadow-yellow-400/50" },
    { value: "hard", label: "Hard", color: "text-red-500", shadow: "shadow-red-500/50" },
    { value: "hardcore", label: "Hardcore", color: "text-red-700", shadow: "shadow-red-700/50" },
  ];

  // Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (value) => {
    console.log(value," from DD");
    setSelected(value);
    setDifficulty(value);
    setIsOpen(false);
  };

  const selectedOption = options.find((opt) => opt.value === selected);

  return (
    <div ref={dropdownRef} className={`relative inline-block text-left shadow-sm rounded-md ${selectedOption.shadow}`}>
      {/* Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between w-28 bg-blakbg px-3 py-1.5 rounded-md font-semibold ${selectedOption.color}`}
      >
        {selectedOption.label}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`w-4 h-4 ml-2 transform transition-transform ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 bg-blackbg border border-gray-700 rounded-md shadow-lg z-50">
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => handleSelect(opt.value)}
              className={`block w-full text-left px-4 py-2 text-sm font-medium hover:bg-gray-700 ${opt.color}`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DifficultyDropdown;
