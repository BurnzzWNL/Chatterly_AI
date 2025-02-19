import { Button, Dropdown, InputField, Modal, ToggleSwitch } from "../UI"; // ✅ Fixed import path
import { useState, useEffect } from "react";
import styles from "./Settings.module.css"; // ✅ Use existing settings styles

export default function SettingsPanel() {
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem("theme") === "dark");
  const [userName, setUserName] = useState(() => localStorage.getItem("userName") || "");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 🔹 Save settings to localStorage
  useEffect(() => {
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    localStorage.setItem("userName", userName);
  }, [isDarkMode, userName]);

  return (
    <div className={styles.SettingsContainer}>
      <h2 className={styles.Title}>Settings</h2>

      {/* 🔹 Theme Selection */}
      <Dropdown
        options={["Light Mode", "Dark Mode"]}
        onSelect={(mode) => setIsDarkMode(mode === "Dark Mode")}
      />

      {/* 🔹 Name Input */}
      <InputField
        placeholder="Enter your name"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />

      {/* 🔹 Dark Mode Toggle */}
      <ToggleSwitch checked={isDarkMode} onChange={() => setIsDarkMode(!isDarkMode)} />

      {/* 🔹 Save Button */}
      <Button onClick={() => setIsModalOpen(true)}>Save Changes</Button>

      {/* 🔹 Confirmation Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <p>Settings Saved Successfully!</p>
        <Button onClick={() => setIsModalOpen(false)}>Close</Button>
      </Modal>
    </div>
  );
}
