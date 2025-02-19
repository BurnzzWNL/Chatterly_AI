import React, { useState, useEffect } from "react";
import styles from "./Settings.module.css";
import { useAuth } from "../../contexts/AuthContext";
import SettingsPanel from "../../components/Settings/SettingsPanel"; // ✅ Adjusted import path

export function Settings() {
  const { user, logoutUser } = useAuth();
  const [isDarkMode, setIsDarkMode] = useState(false);

  // ✅ Load theme preference from local storage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.body.classList.add("dark-mode");
    }
  }, []);

  // ✅ Toggle dark mode
  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const newTheme = !prev;
      document.body.classList.toggle("dark-mode", newTheme);
      localStorage.setItem("theme", newTheme ? "dark" : "light");
      return newTheme;
    });
  };

  return (
    <div className={styles.settingsContainer}>
      <h2 className={styles.title}>Settings</h2>

      {/* ✅ Integrated SettingsPanel */}
      <SettingsPanel />

      {/* ✅ Dark Mode Toggle */}
      <div className={styles.option}>
        <label>Dark Mode</label>
        <button onClick={toggleTheme} className={styles.toggleButton}>
          {isDarkMode ? "Disable Dark Mode" : "Enable Dark Mode"}
        </button>
      </div>

      {/* ✅ User Logout */}
      {user && (
        <div className={styles.option}>
          <label>Account</label>
          <button onClick={logoutUser} className={styles.logoutButton}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
