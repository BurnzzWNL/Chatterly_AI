import { useRef, useEffect, useState } from "react";
import { ChatWindow } from "./ChatWindow"; 
import { ChatFooter } from "./ChatFooter"; 
import { useChat } from "../../contexts/ChatContext"; 
import { fetchAIResponse } from "../../utils/api"; 
import styles from "./Chat.module.css";

/**
 * Chat Component
 * Manages user input, AI responses, and chat history.
 *
 * @returns {JSX.Element}
 */
export function Chat() {
  const { messages, setMessages, selectedModel, saveMessage, loading, error } = useChat(); 
  const messagesEndRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);
  const messagesRef = useRef([]); // Prevents stale state issues

  // 🔹 Scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // 🔹 Keep messagesRef updated to avoid duplicate messages
  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  /**
   * 🔹 Handle user message input and AI response
   * @param {string} content - User input message
   */
  async function handleUserMessage(content) {
    if (!content.trim()) return; // Prevent empty messages

    const userMessage = { role: "user", content };

    // **Prevents duplicate messages**
    setMessages((prev) => [...prev, userMessage]);

    await saveMessage(userMessage);

    // Show typing indicator before AI responds
    setIsTyping(true);

    try {
      // 🔹 Fetch AI response using the latest messages
      const updatedMessages = [...messagesRef.current, userMessage];
      const aiResponse = await fetchAIResponse(selectedModel, updatedMessages);
      const assistantMessage = { role: "assistant", content: aiResponse };

      setMessages((prev) => [...prev, assistantMessage]); // Add AI response to state
      await saveMessage(assistantMessage);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "⚠️ AI is currently unavailable. Please try again." },
      ]);
    } finally {
      setIsTyping(false); // Remove typing indicator after AI responds
    }
  }

  return (
    <div className={styles.ChatContainer}> {/* ✅ Ensures proper layout with sidebar */}
      {/* 🔹 Error and Loading States */}
      {error && <div className={styles.Error}>⚠️ {error}</div>}
      {loading && <div className={styles.Loading}>Loading chat history...</div>}

      {/* 🔹 Chat Messages */}
      <ChatWindow messages={messages} isTyping={isTyping} />

      {/* 🔹 Chat Input (Footer) */}
      <ChatFooter onSendMessage={handleUserMessage} setIsTyping={setIsTyping} />

      {/* 🔹 Scroll to Latest Message */}
      <div ref={messagesEndRef} />
    </div>
  );
}
