import { useState } from "react";
import styles from "./ui.module.css";

export default function Dropdown({ 
  options = [], 
  onSelect, 
  className = "", 
  defaultValue = "Select an option" 
}) {
  const [selected, setSelected] = useState(defaultValue);

  const handleChange = (event) => {
    const value = event.target.value;
    setSelected(value);
    if (onSelect) onSelect(value);
  };

  return (
    <select 
      className={`${styles.dropdown} ${className}`} 
      value={selected} 
      onChange={handleChange} 
      aria-label="Dropdown selection"
    >
      <option value="" disabled>{defaultValue}</option>
      {options.map((option, index) => (
        <option key={index} value={option}>{option}</option>
      ))}
    </select>
  );
}
