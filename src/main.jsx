import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// ✅ Import Context Providers
import { AuthProvider } from "./contexts/AuthContext";
import { ChatProvider } from "./contexts/ChatContext";
import { ThemeProvider } from "./contexts/ThemeContext"; // 🔹 Added Theme Provider
import { ModelProvider } from "./contexts/ModelContext"; // 🔹 Added Model Provider

// ✅ Import Global Styles
import "./styles/global.css";
import "./styles/variables.css"; // 🔹 Added Variables for Theming
import "./styles/theme.css"; // 🔹 Added Theme Support

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider> {/* 🔹 Wrap Theme Context */}
        <ModelProvider> {/* 🔹 Wrap Model Context */}
          <ChatProvider>
            <App />
          </ChatProvider>
        </ModelProvider>
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>
);
