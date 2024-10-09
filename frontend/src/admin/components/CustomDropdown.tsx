import React, { useState, useEffect, useRef } from "react";
import "../css/customdropdown.css";
import { FaChevronDown } from "react-icons/fa6";

interface CustomDropdownProps {
  options: string[];
  defaultValue: string;
  onChange: (selectedOption: string) => void;
  error: string | undefined;
  isValid: boolean;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  options,
  defaultValue,
  onChange,
  error,
  isValid,
}) => {
  const [selectedOption, setSelectedOption] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelectedOption(defaultValue);
  }, [defaultValue]);

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
    onChange(option);
    setIsOpen(false);
  };

  const toggleDropdown = (event: React.MouseEvent) => {
    event.preventDefault();
    setIsOpen(!isOpen);
  };

  const handleDocumentClick = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleDocumentClick);
    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, []);

  const determineDropdownClass = () => {
    if (isOpen) {
      return "custom-dropdown focus";
    } else {
      if (isValid) {
        return "custom-dropdown valid";
      } else if (error) {
        return "custom-dropdown invalid";
      } else {
        return "custom-dropdown";
      }
    }
  };

  return (
    <div
      ref={dropdownRef}
      className={determineDropdownClass()}
      tabIndex={0}
      onMouseDown={toggleDropdown}
    >
      <div className="dropdown-selected">
        {selectedOption}
        <FaChevronDown />
      </div>
      {isOpen && (
        <ul className="dropdown-options">
          {options.map((option) => (
            <li
              key={option}
              className={option === selectedOption ? "selected" : ""}
              onMouseDown={(e) => {
                e.preventDefault();
                handleOptionChange(option);
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomDropdown;
