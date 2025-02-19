import { db, collection, addDoc, query, where, orderBy, serverTimestamp, onSnapshot } from "../services/firebase";

/**
 * 🔹 Fetch chat history from Firestore for a specific user and model.
 * @param {string} userId - The user's unique ID.
 * @param {string} model - The AI model used for the chat.
 * @param {function} setMessages - Function to update messages state.
 * @param {function} setLoading - Function to update loading state.
 * @param {function} setError - Function to update error state.
 * @returns {function} - Unsubscribe function to stop listening for real-time updates.
 */
export const fetchChatHistory = (userId, model, setMessages, setLoading, setError) => {
  setLoading(true);
  setError(null);

  if (!userId) {
    setLoading(false);
    return;
  }

  const q = query(
    collection(db, "chats"),
    where("userId", "==", userId),
    where("model", "==", model),
    orderBy("timestamp", "asc")
  );

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
    (error) => {
      console.error("Error fetching chat history:", error);
      setError("Failed to load chat history. Please try again.");
      setLoading(false);
    }
  );

  return unsubscribe; // Return the function to stop listening when unmounting
};

/**
 * 🔹 Save a new message to Firestore.
 * @param {string} userId - The user's unique ID.
 * @param {string} model - The AI model used for the chat.
 * @param {Object} message - The message object { role: "user" | "assistant", content: "text" }.
 * @param {function} setMessages - Function to update messages state.
 * @param {function} setError - Function to update error state.
 */
export const saveMessage = async (userId, model, message, setMessages, setError) => {
  if (!userId || !message.content.trim()) return;

  try {
    const newMessage = {
      ...message,
      userId,
      model,
      timestamp: serverTimestamp(),
    };

    await addDoc(collection(db, "chats"), newMessage);

    // Update local state
    setMessages((prev) => [...prev, { ...newMessage, timestamp: new Date() }]);
  } catch (error) {
    console.error("Error saving message:", error);
    setError("Failed to save message. Please try again.");
  }
};
