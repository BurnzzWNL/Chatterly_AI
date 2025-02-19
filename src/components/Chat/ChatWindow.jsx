import React, { useEffect, useRef, useMemo } from "react";
import styles from "./Chat.module.css";
import { MessageBubble } from "./MessageBubble";

/**
 * Chat Window Component
 * Displays chat messages in a structured format.
 *
 * @param {Array} messages - Array of chat messages.
 * @param {boolean} isTyping - Indicates if AI is typing.
 * @returns {JSX.Element}
 */
export function ChatWindow({ messages, isTyping }) {
  const chatEndRef = useRef(null); // 🔹 Ref for auto-scrolling

  // 🔹 Auto-scroll to the latest message when messages change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 🔹 Group messages by role (User & Assistant)
  const groupedMessages = useMemo(
    () =>
      messages.reduce((groups, message) => {
        if (message.role === "user") groups.push([]); // Start a new group for user messages
        groups[groups.length - 1].push(message);
        return groups;
      }, []),
    [messages]
  );

  return (
    <div className={styles.ChatWindow} aria-live="polite">
      {/* Welcome message */}
      <MessageBubble key="welcome" role="assistant" content="Your friendly AI companion, ready to assist 24/7. What’s on your mind?" />

      {/* Render chat messages */}
      {groupedMessages.map((group, groupIndex) => (
        <div key={groupIndex} className={styles.MessageGroup}>
          {group.map(({ role, content }, index) => (
            <MessageBubble key={`${groupIndex}-${index}`} role={role} content={content} />
          ))}
        </div>
      ))}

      {/* 🔹 AI Typing Indicator */}
      {isTyping && (
        <div className={styles.TypingIndicator} aria-live="assertive">
          <MessageBubble role="assistant" content="AI is typing..." />
        </div>
      )}

      {/* 🔹 Empty div to maintain auto-scroll */}
      <div ref={chatEndRef} />
    </div>
  );
}
