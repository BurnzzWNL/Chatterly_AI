import React, { useState, useRef, useEffect } from "react";
import styles from "./Chat.module.css";

/**
 * Chat Input Component
 * Allows users to type and send messages in the chat.
 *
 * @param {Function} onSendMessage - Function to handle sending a message.
 * @returns {JSX.Element}
 */
export function ChatInput({ onSendMessage }) {
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const textareaRef = useRef(null);
  const CHARACTER_LIMIT = 500; // Maximum allowed characters

  // 🔹 Auto-resize textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  // 🔹 Handle input changes with debounce optimization
  const handleChange = (e) => {
    const text = e.target.value;
    if (text.length <= CHARACTER_LIMIT) {
      setMessage(text);
      setIsTyping(true);
      // Reset typing indicator after 2 seconds
      setTimeout(() => setIsTyping(false), 2000);
    }
  };

  // 🔹 Handle send message (on Enter)
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // 🔹 Function to send message
  const sendMessage = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage(""); // Clear input after sending
      setIsTyping(false);
    }
  };

  return (
    <div className={styles.ChatInputContainer} aria-label="Chat input section">
      <textarea
        ref={textareaRef}
        className={styles.ChatInput}
        placeholder="Type a message..."
        value={message}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        rows="1"
        aria-label="Chat message input field"
      />
      <button
        className={styles.SendButton}
        onClick={sendMessage}
        disabled={!message.trim()} // Disable button if message is empty
        aria-label="Send message"
      >
        🚀 Send
      </button>
      {isTyping && message.length >= CHARACTER_LIMIT - 50 && (
        <p className={styles.CharLimitWarning} aria-live="polite">
          {CHARACTER_LIMIT - message.length} characters remaining
        </p>
      )}
    </div>
  );
}
