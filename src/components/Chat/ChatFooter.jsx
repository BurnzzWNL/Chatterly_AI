import React from "react";
import { ChatInput } from "./ChatInput";
import styles from "./Chat.module.css";

/**
 * Chat Footer Component
 * Displays the chat input field at the bottom of the chat window.
 *
 * @param {Function} onSendMessage - Function to handle message sending.
 * @param {Function} setIsTyping - Function to indicate when the user is typing.
 * @returns {JSX.Element}
 */
export function ChatFooter({ onSendMessage, setIsTyping }) {
  return (
    <footer className={styles.ChatFooter} aria-label="Chat input section">
      <ChatInput onSendMessage={onSendMessage} setIsTyping={setIsTyping} />
    </footer>
  );
}
