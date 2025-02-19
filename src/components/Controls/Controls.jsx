import { useEffect, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import styles from "./Controls.module.css";

export function Controls({ isDisabled = false, onSend }) {
  const textareaRef = useRef(null);
  const [content, setContent] = useState("");

  // 🔹 Auto-focus input only if it's empty & not disabled
  useEffect(() => {
    if (!isDisabled && !content) {
      textareaRef.current?.focus();
    }
  }, [isDisabled, content]);

  // 🔹 Handle input change
  function handleContentChange(event) {
    setContent(event.target.value);
  }

  // 🔹 Send message if input is not empty
  function handleContentSend() {
    if (content.trim().length > 0) {
      onSend(content.trim());
      setContent(""); // Clear input after sending
    }
  }

  // 🔹 Detect Enter & Escape key actions
  function handleKeyDown(event) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleContentSend();
    }
    if (event.key === "Escape") {
      setContent(""); // Clear input on Escape
    }
  }

  return (
    <div className={styles.Controls}>
      <div className={styles.TextAreaContainer}>
        <TextareaAutosize
          ref={textareaRef}
          className={styles.TextArea}
          disabled={isDisabled}
          placeholder="Type your message..."
          value={content}
          minRows={1}
          maxRows={6} // 🔹 Increased max rows for better multi-line input
          onChange={handleContentChange}
          onKeyDown={handleKeyDown}
        />
      </div>
      <button
        className={`${styles.Button} ${isDisabled ? styles.Disabled : ""}`}
        disabled={isDisabled}
        onClick={handleContentSend}
        aria-label="Send Message"
      >
        <SendIcon />
      </button>
    </div>
  );
}

// 🔹 SVG for Send Button
function SendIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="currentColor"
    >
      <path d="M120-160v-240l320-80-320-80v-240l760 320-760 320Z" />
    </svg>
  );
}
