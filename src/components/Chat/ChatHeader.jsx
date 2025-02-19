import React from "react";
import styles from "./Chat.module.css";

/**
 * Chat Header Component
 * Displays the chat title and AI model selection dropdown.
 *
 * @param {string} selectedModel - The currently selected AI model.
 * @param {Function} setSelectedModel - Function to update the selected model.
 * @returns {JSX.Element}
 */
export function ChatHeader({ selectedModel, setSelectedModel }) {
  return (
    <header className={styles.ChatHeader} aria-label="Chat header">
      <h2 className={styles.ChatTitle}>Chatterly AI</h2>

      {/* 🔹 AI Model Selector */}
      <div className={styles.ModelSelector}>
        <label htmlFor="model-select" className={styles.ModelLabel}>
          Select Model:
        </label>
        <select
          id="model-select"
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value)}
          className={styles.ModelDropdown}
          aria-label="AI Model Selection"
        >
          <option value="googleai">Google Gemini AI</option>
          <option value="openai">OpenAI GPT-4</option>
          <option value="deepseekai">DeepSeek AI</option>
          <option value="qwenai">Qwen AI</option>
        </select>
      </div>
    </header>
  );
}
