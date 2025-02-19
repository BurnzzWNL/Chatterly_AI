import React, { useState } from "react";
import Markdown from "react-markdown";
import styles from "./MessageBubble.module.css";

/**
 * Message Bubble Component
 * Displays messages with role-based styling and typing indicators.
 *
 * @param {string} role - "user" or "assistant".
 * @param {string} content - The message content.
 * @param {Function} onCopy - Function to copy message content.
 * @param {boolean} isCopied - Tracks whether the message is copied.
 * @param {boolean} typing - Indicates if AI is typing.
 * @returns {JSX.Element}
 */
export function MessageBubble({ role, content, onCopy, isCopied, typing }) {
  const [copySuccess, setCopySuccess] = useState(false);

  // 🔹 Handle Copy Action with Feedback Delay
  const handleCopy = () => {
    onCopy();
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000); // Reset after 2s
  };

  return (
    <div
      className={`${styles.MessageBubble} ${role === "user" ? styles.UserBubble : styles.AssistantBubble}`}
      role="region"
      aria-live="polite"
    >
      {typing ? (
        <div className={styles.TypingIndicator}>
          <span className={styles.TypingDot}></span>
          <span className={styles.TypingDot}></span>
          <span className={styles.TypingDot}></span>
        </div>
      ) : (
        <Markdown className={styles.MessageContent} disallowedElements={["script"]}>
          {content}
        </Markdown>
      )}

      {role === "assistant" && !typing && (
        <button className={styles.CopyButton} onClick={handleCopy} aria-label="Copy message">
          {copySuccess ? "✅ Copied!" : "📋 Copy"}
        </button>
      )}
    </div>
  );
}
