import { db } from "../../services/firebaseDB";
import { collection, addDoc, query, where, getDocs, orderBy, deleteDoc, doc } from "firebase/firestore";

/**
 * Save a chat message to Firestore.
 * @param {string} userId - The user ID.
 * @param {string} model - The AI model used.
 * @param {Object} message - The message object ({ role, content, timestamp }).
 * @returns {Promise<void>}
 */
export async function saveChatMessage(userId, model, message) {
  if (!userId || !model || !message) throw new Error("Missing required parameters for saving chat.");

  try {
    await addDoc(collection(db, "chats"), {
      userId,
      model,
      ...message,
    });
  } catch (error) {
    console.error("Error saving chat message:", error);
    throw new Error("Failed to save chat message.");
  }
}

/**
 * Retrieve chat history for a specific user and model.
 * @param {string} userId - The user ID.
 * @param {string} model - The AI model used.
 * @returns {Promise<Array>} - An array of chat messages.
 */
export async function getChatHistory(userId, model) {
  if (!userId || !model) throw new Error("User ID and model are required.");

  try {
    const q = query(
      collection(db, "chats"),
      where("userId", "==", userId),
      where("model", "==", model),
      orderBy("timestamp", "asc")
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      timestamp: doc.data().timestamp?.toDate?.(),
    }));
  } catch (error) {
    console.error("Error fetching chat history:", error);
    throw new Error("Failed to retrieve chat history.");
  }
}

/**
 * Delete all chat messages for a user and model.
 * @param {string} userId - The user ID.
 * @param {string} model - The AI model used.
 * @returns {Promise<void>}
 */
export async function deleteChatHistory(userId, model) {
  if (!userId || !model) throw new Error("User ID and model are required.");

  try {
    const q = query(
      collection(db, "chats"),
      where("userId", "==", userId),
      where("model", "==", model)
    );

    const querySnapshot = await getDocs(q);
    const deletePromises = querySnapshot.docs.map((doc) => deleteDoc(doc.ref));

    await Promise.all(deletePromises);
  } catch (error) {
    console.error("Error deleting chat history:", error);
    throw new Error("Failed to delete chat history.");
  }
}
