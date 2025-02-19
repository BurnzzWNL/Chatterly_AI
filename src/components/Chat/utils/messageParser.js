/**
 * Parses a message to detect commands, links, and keywords.
 * @param {string} message - The user input message.
 * @returns {Object} - Parsed message object.
 */
export function parseMessage(message) {
  if (!message.trim()) return { type: "empty", content: "" };

  // Normalize message content (trim spaces & convert to lowercase for commands)
  const trimmedMessage = message.trim();
  const lowerCaseMessage = trimmedMessage.toLowerCase();

  // 🔹 Detect Commands (e.g., /help, /clear, /set aiModel)
  if (lowerCaseMessage.startsWith("/")) {
    const parts = trimmedMessage.split(" ");
    return {
      type: "command",
      command: parts[0], // Extract command (first word)
      parameters: parts.slice(1).join(" "), // Extract parameters after command
      content: trimmedMessage,
    };
  }

  // 🔹 Detect Links (Supports multiple links in a message)
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const links = trimmedMessage.match(urlRegex) || [];

  // 🔹 Extract keywords (for AI processing)
  const keywords = extractKeywords(trimmedMessage);

  return {
    type: links.length ? "link" : "text",
    content: trimmedMessage,
    links,
    keywords,
  };
}

/**
 * Extracts keywords from a message for AI context improvement.
 * Filters out common stopwords and short words.
 * @param {string} text - User input text.
 * @returns {Array} - List of extracted keywords.
 */
function extractKeywords(text) {
  const stopwords = new Set([
    "the", "is", "at", "which", "on", "and", "a", "an", "to", "for", "in",
    "with", "it", "this", "that", "of", "from", "by", "as", "or", "be"
  ]); // Expanded stopwords list

  return text
    .toLowerCase()
    .split(/\W+/) // Split by non-word characters
    .filter((word) => word.length > 2 && !stopwords.has(word)); // Remove short words & stopwords
}

/**
 * Formats a message to convert plain links into clickable HTML links.
 * @param {string} message - User input message.
 * @returns {string} - Formatted message with clickable links.
 */
export function formatMessageWithLinks(message) {
  return message.replace(
    /(https?:\/\/[^\s]+)/g,
    '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>'
  );
}
