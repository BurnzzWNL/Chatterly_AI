// ✅ API Keys (Stored in `.env.local`)
export const API_KEYS = {
  OPENAI: import.meta.env.VITE_OPEN_AI_API_KEY,
  GOOGLE_AI: import.meta.env.VITE_GOOGLE_AI_API_KEY,
  NVIDIA_DEEPSEEK: import.meta.env.VITE_NVIDIA_DEEPSEEK_API_KEY,
  QWEN_AI: import.meta.env.VITE_QWEN_AI_API_KEY,
};

// ✅ API Endpoints
export const API_ENDPOINTS = {
  openai: "https://api.openai.com/v1/chat/completions",
  googleai: "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent",
  nvidia: "https://integrate.api.nvidia.com/v1/chat/completions",
  qwenai: "https://api.qwen.aliyun.com/v1/chat/completions",
};

// ✅ AI Model Configurations
export const AI_MODELS = {
  openai: { model: "gpt-4o-mini", temperature: 0.7 },
  googleai: { model: "gemini-1.5-flash", temperature: 0.7 },
  nvidia: { model: "deepseek-ai/deepseek-r1", temperature: 0.7 },
  qwenai: { model: "qwen-turbo", temperature: 0.7 },
};

// ✅ Default Chat Settings
export const CHAT_SETTINGS = {
  MAX_HISTORY_LENGTH: 10, // Maximum number of past messages stored
  RESPONSE_TIMEOUT: 10000, // Timeout for AI responses in milliseconds
  DEFAULT_MODEL: "googleai", // Default AI model on app startup
};

// ✅ UI Text Constants
export const UI_TEXT = {
  APP_TITLE: "Chatterly AI",
  WELCOME_MESSAGE: "Your friendly AI companion, ready to assist 24/7. What’s on your mind?",
  ERROR_MESSAGE: "🚨 Oops! Something went wrong. Please try again.",
  LOADING_MESSAGE: "⏳ Thinking...",
};

// ✅ Sidebar Configuration
export const SIDEBAR_SETTINGS = {
  WIDTH_COLLAPSED: "80px",
  WIDTH_EXPANDED: "300px",
};

// ✅ Global Theme Variables
export const THEME_COLORS = {
  PRIMARY: "#3498db",
  SECONDARY: "#2c3e50",
  ACCENT: "#e74c3c",
  BACKGROUND: "#1e272e",
  TEXT_PRIMARY: "#ecf0f1",
  TEXT_SECONDARY: "#bdc3c7",
  ERROR: "#e74c3c",
  SUCCESS: "#2ecc71",
};

// ✅ Dark Mode Settings
export const DARK_MODE_SETTINGS = {
  BACKGROUND: "#121212",
  TEXT: "#ffffff",
  BORDER: "rgba(255, 255, 255, 0.1)",
};
