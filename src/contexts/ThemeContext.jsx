import { createContext, useContext, useEffect, useState } from "react";

// ✅ Create Theme Context
const ThemeContext = createContext();

/**
 * ✅ ThemeProvider Component
 * Manages dark mode/light mode preferences across the app.
 */
export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark"; // Load from localStorage
  });

  // ✅ Toggle Dark Mode
  const toggleTheme = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      document.body.classList.toggle("dark-mode", newMode);
      localStorage.setItem("theme", newMode ? "dark" : "light"); // Save preference
      return newMode;
    });
  };

  // ✅ Apply saved theme on initial load
  useEffect(() => {
    document.body.classList.toggle("dark-mode", isDarkMode);
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// ✅ Custom hook to use ThemeContext
export function useTheme() {
  return useContext(ThemeContext);
}
