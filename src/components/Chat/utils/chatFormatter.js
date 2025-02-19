/**
 * Formats chat messages for AI processing.
 * Ensures a consistent structure before sending messages to the AI model.
 * @param {Array} messages - List of chat messages.
 * @returns {Array} - Formatted message history.
 */
export function formatChatMessages(messages) {
  return messages.map(({ role, content }) => ({
    role,
    content: content.trim(),
  }));
}

/**
 * Escapes special characters to prevent Markdown rendering issues.
 * @param {string} text - The text content to sanitize.
 * @returns {string} - The sanitized text.
 */
export function sanitizeText(text) {
  return text
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Formats AI response with Markdown and ensures proper rendering.
 * @param {string} content - AI-generated text response.
 * @returns {string} - Properly formatted response for UI display.
 */
export function formatAIResponse(content) {
  if (!content) return "";
  
  return sanitizeText(content) // Prevents HTML injection
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // Bold
    .replace(/\*(.*?)\*/g, "<em>$1</em>") // Italic
    .replace(/`(.*?)`/g, "<code>$1</code>"); // Inline code
}
