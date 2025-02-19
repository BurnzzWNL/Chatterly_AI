import { db } from "../../services/firebaseDB";
import { collection, addDoc, query, where, getDocs, orderBy, doc, updateDoc, deleteDoc } from "firebase/firestore";

/**
 * Save an individual message to Firestore.
 * @param {string} userId - The user ID.
 * @param {string} chatId - The chat session ID.
 * @param {string} model - The AI model used.
 * @param {Object} message - The message object ({ role, content, timestamp }).
 * @returns {Promise<void>}
 */
export async function saveMessage(userId, chatId, model, message) {
  if (!userId || !chatId || !model || !message) throw new Error("Missing required parameters for saving message.");

  try {
    await addDoc(collection(db, "messages"), {
      userId,
      chatId,
      model,
      ...message,
    });
  } catch (error) {
    console.error("Error saving message:", error);
    throw new Error("Failed to save message.");
  }
}

/**
 * Retrieve messages for a specific chat session.
 * @param {string} userId - The user ID.
 * @param {string} chatId - The chat session ID.
 * @returns {Promise<Array>} - An array of messages.
 */
export async function getMessagesByChat(userId, chatId) {
  if (!userId || !chatId) throw new Error("User ID and Chat ID are required.");

  try {
    const q = query(
      collection(db, "messages"),
      where("userId", "==", userId),
      where("chatId", "==", chatId),
      orderBy("timestamp", "asc")
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      timestamp: doc.data().timestamp?.toDate?.(),
    }));
  } catch (error) {
    console.error("Error fetching messages:", error);
    throw new Error("Failed to retrieve messages.");
  }
}

/**
 * Update a specific message in Firestore.
 * @param {string} messageId - The message ID.
 * @param {Object} updates - The fields to update (e.g., { content: "new text" }).
 * @returns {Promise<void>}
 */
export async function updateMessage(messageId, updates) {
  if (!messageId || !updates) throw new Error("Message ID and update fields are required.");

  try {
    const messageRef = doc(db, "messages", messageId);
    await updateDoc(messageRef, updates);
  } catch (error) {
    console.error("Error updating message:", error);
    throw new Error("Failed to update message.");
  }
}

/**
 * Delete a specific message from Firestore.
 * @param {string} messageId - The message ID.
 * @returns {Promise<void>}
 */
export async function deleteMessage(messageId) {
  if (!messageId) throw new Error("Message ID is required to delete a message.");

  try {
    const messageRef = doc(db, "messages", messageId);
    await deleteDoc(messageRef);
  } catch (error) {
    console.error("Error deleting message:", error);
    throw new Error("Failed to delete message.");
  }
}
