import { useState } from "react";
import { fetchAIResponse } from "../../../utils/api"; // API call for AI response
import { useChatHistory } from "./useChatHistory"; // Chat history hook

/**
 * Custom hook to handle user messages and AI responses.
 * @param {string} userId - The user ID.
 * @param {string} chatId - The chat session ID.
 * @param {string} selectedModel - The selected AI model.
 * @returns {Object} - Contains messages, handleUserMessage function, isTyping state, and error.
 */
export function useMessageHandler(userId, chatId, selectedModel) {
  const { messages, setMessages, saveMessage } = useChatHistory(userId, chatId);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Handles user input and AI response.
   * @param {string} content - The user's message.
   */
  async function handleUserMessage(content) {
    if (!content.trim()) return; // Prevent empty messages
    if (isTyping) return; // Prevent duplicate AI requests

    // Create user message object
    const userMessage = { role: "user", content, timestamp: new Date() };

    // Update messages state optimally
    setMessages((prev) => [...prev, userMessage]);

    // Save user message to Firestore
    await saveMessage(userMessage);

    // Show typing indicator while AI generates a response
    setIsTyping(true);

    try {
      // Fetch AI response
      const aiResponse = await fetchAIResponse(selectedModel, [...messages, userMessage]);
      const assistantMessage = { role: "assistant", content: aiResponse, timestamp: new Date() };

      // Update messages state with AI response
      setMessages((prev) => [...prev, assistantMessage]);

      // Save AI response to Firestore
      await saveMessage(assistantMessage);
    } catch (err) {
      console.error("🔥 Error fetching AI response:", err);
      setError("Failed to get AI response. Please try again.");
    } finally {
      setIsTyping(false); // Remove typing indicator
    }
  }

  return { messages, handleUserMessage, isTyping, error };
}
