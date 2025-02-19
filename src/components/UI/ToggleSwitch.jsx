import { useState } from "react";
import styles from "./ui.module.css";

export default function ToggleSwitch({ checked = false, onChange, className = "" }) {
  const [isChecked, setIsChecked] = useState(checked);

  // 🔹 Handle toggle change
  const handleToggle = () => {
    const newChecked = !isChecked;
    setIsChecked(newChecked);
    onChange && onChange(newChecked);
  };

  return (
    <label className={`${styles.toggleSwitch} ${className}`}>
      <input type="checkbox" checked={isChecked} onChange={handleToggle} />
      <span className={styles.slider}></span>
    </label>
  );
}
