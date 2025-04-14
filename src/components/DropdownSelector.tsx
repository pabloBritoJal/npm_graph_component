import React, { useState, useRef, useEffect } from "react";
import downArrow from "../assets/down_arrow.svg";
import "../styles/dropdown.css";

interface DropdownSelectorProps {
  optionName: string;
  optionsList?: string[];
  onSelect: (value: string) => void;
  selectedOption?: string | number;
  isSmall?: boolean;
  isOnError?: boolean;
}

const DropdownSelector: React.FC<DropdownSelectorProps> = ({
  optionName,
  optionsList = [],
  onSelect,
  selectedOption = "",
  isOnError = false,
  isSmall,
}) => {
  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSelect = (option: string) => {
    onSelect(option);
    setOpen(false);
    setSearchText("");
  };

  const handleClear = () => {
    onSelect("");
    setOpen(false);
    setSearchText("");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
        setSearchText("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const containerClass = `npm-dropdown-container ${
    isSmall ? "small" : "large"
  } ${isOnError ? "npm-dropdown-error" : ""}`;

  const filteredOptions = optionsList.filter((option) =>
    option.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className={containerClass} ref={dropdownRef}>
      {open ? (
        <input
          ref={inputRef}
          type="text"
          autoFocus
          className="npm-dropdown-input"
          placeholder="Search..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      ) : (
        <button
          type="button"
          className="npm-dropdown-button"
          onClick={() => {
            setOpen(true);
            setTimeout(() => {
              inputRef.current?.focus();
            }, 0);
          }}
        >
          <span>{selectedOption || optionName}</span>
          <img src={downArrow} alt="Toggle Dropdown" />
        </button>
      )}

      {open && (
        <ul className="npm-dropdown-list">
          {selectedOption && (
            <li className="npm-dropdown-item" onClick={handleClear}>
              <button className="npm-dropdown-button-clear">Clear</button>
            </li>
          )}

          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <li
                key={option}
                className="npm-dropdown-item"
                onClick={() => handleSelect(option)}
              >
                <button className="npm-dropdown-item-button">{option}</button>
              </li>
            ))
          ) : (
            <li className="npm-dropdown-message">No results found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default DropdownSelector;
