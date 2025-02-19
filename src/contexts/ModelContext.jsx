import { createContext, useContext, useEffect, useState } from "react";
import { getModel } from "../api/aiModels/ModelFactory"; // Import AI model factory

// ✅ Create Model Context
const ModelContext = createContext();

/**
 * ✅ ModelProvider Component
 * Provides AI model state & methods to child components
 */
export function ModelProvider({ children }) {
  const [selectedModel, setSelectedModel] = useState(() => {
    return localStorage.getItem("aiModel") || "googleai"; // Default AI model
  });

  const [aiModel, setAiModel] = useState(null);
  const [error, setError] = useState(null);

  // ✅ Update AI Model when selection changes
  useEffect(() => {
    try {
      const apiKey = import.meta.env.VITE_AI_API_KEY; // Fetch API key from env
      const model = getModel(selectedModel, apiKey);
      setAiModel(model);
      localStorage.setItem("aiModel", selectedModel); // Save preference
    } catch (err) {
      console.error("Error loading AI model:", err);
      setError("Failed to load AI model. Please try again.");
    }
  }, [selectedModel]);

  return (
    <ModelContext.Provider value={{ selectedModel, setSelectedModel, aiModel, error }}>
      {children}
    </ModelContext.Provider>
  );
}

// ✅ Custom hook to use ModelContext
export function useModel() {
  return useContext(ModelContext);
}
