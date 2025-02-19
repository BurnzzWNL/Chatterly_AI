import { db } from "./firebase";
import { 
  collection, 
  addDoc, 
  getDocs, 
  getDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  where, 
  orderBy, 
  serverTimestamp, 
  onSnapshot 
} from "firebase/firestore";

/**
 * 🔹 Save a new chat message to Firestore.
 * @param {string} userId - ID of the user.
 * @param {string} model - AI model used.
 * @param {Object} message - Chat message object { role: "user" | "assistant", content: "text" }.
 * @returns {Promise<void>}
 */
export const saveMessageToDB = async (userId, model, message) => {
  try {
    const chatRef = collection(db, "chats");
    await addDoc(chatRef, {
      userId,
      model,
      ...message,
      timestamp: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error saving message:", error);
    throw new Error("Failed to save message. Please try again.");
  }
};

/**
 * 🔹 Fetch chat history for a user and AI model.
 * @param {string} userId - ID of the user.
 * @param {string} model - AI model used.
 * @returns {Promise<Array>} - List of chat messages.
 */
export const fetchChatHistory = async (userId, model) => {
  try {
    const q = query(
      collection(db, "chats"),
      where("userId", "==", userId),
      where("model", "==", model),
      orderBy("timestamp", "asc")
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      timestamp: doc.data().timestamp?.toDate?.(),
    }));
  } catch (error) {
    console.error("Error fetching chat history:", error);
    throw new Error("Failed to load chat history.");
  }
};

/**
 * 🔹 Listen for real-time chat updates.
 * @param {string} userId - ID of the user.
 * @param {string} model - AI model used.
 * @param {Function} callback - Function to handle real-time updates.
 * @returns {Function} - Unsubscribe function.
 */
export const listenToChatUpdates = (userId, model, callback) => {
  const q = query(
    collection(db, "chats"),
    where("userId", "==", userId),
    where("model", "==", model),
    orderBy("timestamp", "asc")
  );

  return onSnapshot(q, (snapshot) => {
    const chatHistory = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      timestamp: doc.data().timestamp?.toDate?.(),
    }));
    callback(chatHistory);
  });
};

/**
 * 🔹 Update a message in Firestore.
 * @param {string} messageId - ID of the message.
 * @param {Object} updatedMessage - Updated message content.
 * @returns {Promise<void>}
 */
export const updateMessageInDB = async (messageId, updatedMessage) => {
  try {
    const messageRef = doc(db, "chats", messageId);
    await updateDoc(messageRef, updatedMessage);
  } catch (error) {
    console.error("Error updating message:", error);
    throw new Error("Failed to update message.");
  }
};

/**
 * 🔹 Delete a message from Firestore.
 * @param {string} messageId - ID of the message.
 * @returns {Promise<void>}
 */
export const deleteMessageFromDB = async (messageId) => {
  try {
    const messageRef = doc(db, "chats", messageId);
    await deleteDoc(messageRef);
  } catch (error) {
    console.error("Error deleting message:", error);
    throw new Error("Failed to delete message.");
  }
};
