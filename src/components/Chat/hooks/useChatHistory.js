import { useState, useEffect } from "react";
import { db } from "../../../services/firebaseDB"; // Corrected Firestore import
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from "firebase/firestore";

/**
 * Custom Hook for managing chat history.
 * @param {string} userId - The ID of the user.
 * @param {string} chatId - The chat session ID.
 * @returns {Object} - Contains messages, loading state, error, and saveMessage function.
 */
export function useChatHistory(userId, chatId) {
  const [messages, setMessages] = useState([]); // Chat history
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    if (!userId || !chatId) return;

    // 🔹 Reference to the chat session in Firestore
    const chatRef = collection(db, "messages");
    const chatQuery = query(chatRef, orderBy("timestamp", "asc"));

    // 🔹 Listen for real-time updates from Firestore
    const unsubscribe = onSnapshot(
      chatQuery,
      (snapshot) => {
        const loadedMessages = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages(loadedMessages);
        setLoading(false);
      },
      (error) => {
        console.error("🔥 Error loading chat history:", error);
        setError("Failed to load chat history.");
        setLoading(false);
      }
    );

    return () => unsubscribe(); // Cleanup listener when component unmounts
  }, [userId, chatId]);

  /**
   * 🔹 Save a new message to Firestore.
   * @param {Object} message - The message object { role: "user" | "assistant", content: "text" }
   */
  async function saveMessage(message) {
    if (!userId || !chatId || !message) {
      console.error("❌ Missing required parameters for saving message.");
      return;
    }

    try {
      await addDoc(collection(db, "messages"), {
        userId,
        chatId,
        ...message,
        timestamp: serverTimestamp(), // Ensures accurate timestamping
      });
    } catch (error) {
      console.error("🔥 Error saving message:", error);
      setError("Failed to save message.");
    }
  }

  return { messages, loading, error, saveMessage };
}
