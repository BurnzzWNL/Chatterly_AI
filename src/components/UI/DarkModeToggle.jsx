import { useState, useEffect } from "react";
import styles from "./ui.module.css";

export default function DarkModeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  // 🔹 Apply theme on toggle
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  return (
    <button
      className={`${styles.darkModeToggle} ${isDarkMode ? styles.active : ""}`}
      onClick={() => setIsDarkMode((prev) => !prev)}
      aria-label="Toggle Dark Mode"
    >
      {isDarkMode ? "🌙 Dark Mode" : "☀️ Light Mode"}
    </button>
  );
}
