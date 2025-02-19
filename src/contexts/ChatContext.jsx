import { createContext, useContext, useEffect, useState } from "react";
import {
  db,
  collection,
  addDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
  onSnapshot,
} from "../services/firebase";
import { useAuth } from "./AuthContext";
import { getModel } from "../api/aiModels/ModelFactory"; // Import AI model factory

// ✅ Create Chat Context
const ChatContext = createContext();

/**
 * ✅ ChatProvider Component
 * Provides chat state & methods to child components
 */
export function ChatProvider({ children }) {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedModel, setSelectedModel] = useState("googleai"); // Default AI model
  const [error, setError] = useState(null);
  const [aiModel, setAiModel] = useState(null);

  // ✅ Load chat history on user or model change
  useEffect(() => {
    if (user) {
      return loadChatHistory(user.uid); // Unsubscribe from listener on unmount
    } else {
      setMessages([]);
      setLoading(false);
    }
  }, [user, selectedModel]);

  // ✅ Update AI Model when model selection changes
  useEffect(() => {
    try {
      const apiKey = import.meta.env.VITE_AI_API_KEY;
      const model = getModel(selectedModel, apiKey);
      setAiModel(model);
    } catch (err) {
      console.error("Error loading AI model:", err);
      setError("Failed to load AI model. Please try again.");
    }
  }, [selectedModel]);

  /**
   * ✅ Load chat history in real-time from Firestore
   */
  function loadChatHistory(userId) {
    setLoading(true);
    setError(null);

    const q = query(
      collection(db, "chats"),
      where("userId", "==", userId),
      where("model", "==", selectedModel),
      orderBy("timestamp", "asc")
    );

    // Listen for real-time updates
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const chatHistory = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          timestamp: doc.data().timestamp?.toDate?.(),
        }));
        setMessages(chatHistory);
        setLoading(false);
      },
      (err) => {
        console.error("Error loading chat history:", err);
        setError("Failed to load chat history. Please try again.");
        setLoading(false);
      }
    );

    return unsubscribe;
  }

  /**
   * ✅ Save a new message to Firebase
   */
  async function saveMessage(message) {
    if (!user) return;

    try {
      const newMessage = {
        ...message,
        userId: user.uid,
        model: selectedModel,
        timestamp: serverTimestamp(),
      };
      await addDoc(collection(db, "chats"), newMessage);
      setMessages((prev) => [...prev, { ...newMessage, timestamp: new Date() }]);
    } catch (err) {
      console.error("Error saving message:", err);
      setError("Failed to save message. Please try again.");
    }
  }

  /**
   * ✅ Send a message to the AI model and get a response
   */
  async function sendMessageToAI(userMessage) {
    if (!aiModel) {
      console.error("AI model not initialized.");
      setError("AI model not initialized. Try switching models.");
      return;
    }

    try {
      // Save user message to Firebase
      const userMessageObj = { role: "user", content: userMessage };
      await saveMessage(userMessageObj);

      // Get AI response
      const aiResponse = await aiModel.chat(userMessage); // 🔹 Use `.chat()` instead of `sendMessage()`
      const assistantMessage = { role: "assistant", content: aiResponse };

      // Save AI response to Firebase
      await saveMessage(assistantMessage);
    } catch (error) {
      console.error("Error sending message to AI:", error);
      setError("Failed to communicate with AI. Please try again.");
    }
  }

  return (
    <ChatContext.Provider
      value={{
        messages,
        setMessages,
        loading,
        error,
        selectedModel,
        setSelectedModel,
        saveMessage,
        sendMessageToAI,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

// ✅ Custom hook to use ChatContext
export function useChat() {
  return useContext(ChatContext);
}
