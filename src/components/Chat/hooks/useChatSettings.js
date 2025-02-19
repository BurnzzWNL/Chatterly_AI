import { useState, useEffect } from "react";

export function useChatSettings() {
  const DEFAULT_MODEL = "openai"; // Default AI model
  const DEFAULT_MESSAGE_LIMIT = 500; // Default character limit

  // 🔹 Load settings from localStorage or use defaults
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const [selectedModel, setSelectedModel] = useState(() => {
    return localStorage.getItem("aiModel") || DEFAULT_MODEL;
  });

  const [messageLengthLimit, setMessageLengthLimit] = useState(() => {
    const limit = parseInt(localStorage.getItem("messageLengthLimit"), 10);
    return isNaN(limit) ? DEFAULT_MESSAGE_LIMIT : limit;
  });

  // 🔹 Update theme preference
  useEffect(() => {
    const themeClass = "dark-mode";
    if (isDarkMode) {
      document.body.classList.add(themeClass);
    } else {
      document.body.classList.remove(themeClass);
    }
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  // 🔹 Update AI model preference
  useEffect(() => {
    localStorage.setItem("aiModel", selectedModel);
  }, [selectedModel]);

  // 🔹 Update message length preference
  useEffect(() => {
    if (!isNaN(messageLengthLimit) && messageLengthLimit > 0) {
      localStorage.setItem("messageLengthLimit", messageLengthLimit);
    }
  }, [messageLengthLimit]);

  return {
    isDarkMode,
    setIsDarkMode,
    selectedModel,
    setSelectedModel,
    messageLengthLimit,
    setMessageLengthLimit,
  };
}
