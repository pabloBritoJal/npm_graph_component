import React, { useState, useRef, useEffect, useCallback } from "react";
import { DownArrowIcon } from "../assets/DownArrowIcon";

interface DropdownSelectorProps {
  optionName: string;
  optionsList?: string[];
  onSelect: (value: string) => void;
  selectedOption?: string | number;
}

const DropdownSelector: React.FC<DropdownSelectorProps> = ({
  optionName,
  optionsList = [],
  onSelect,
  selectedOption = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelect = useCallback(
    (option: string) => {
      onSelect(option);
      setIsOpen(false);
      setSearchText("");
    },
    [onSelect]
  );

  const toggleDropdown = useCallback(() => {
    setIsOpen((prev) => !prev);
    if (isOpen) {
      setSearchText("");
    }
  }, [isOpen]);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
      setSearchText("");
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  const filteredOptions = optionsList.filter((option) =>
    option.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="graph-dropdown-container" ref={dropdownRef}>
      {isOpen ? (
        <input
          type="text"
          autoFocus
          className="graph-dropdown-input"
          placeholder="Focus on..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      ) : (
        <button
          type="button"
          className="graph-dropdown-button"
          onClick={toggleDropdown}
        >
          <span className="graph-dropdown-selected">
            {selectedOption || optionName}
          </span>
          <DownArrowIcon className="graph-dropdown-icon" />
        </button>
      )}

      {isOpen && (
        <ul className="graph-dropdown-list">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <li
                key={option}
                className="graph-dropdown-item"
                onClick={() => handleSelect(option)}
              >
                <button className="graph-dropdown-option">{option}</button>
              </li>
            ))
          ) : (
            <li className="graph-dropdown-no-results">No results</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default DropdownSelector;
