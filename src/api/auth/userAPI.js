import { db } from "../../services/firebaseDB";
import { doc, getDoc, setDoc, updateDoc, deleteDoc } from "firebase/firestore";

/**
 * Fetch user data from Firestore.
 * @param {string} userId - The user ID.
 * @returns {Promise<Object|null>} - User data or null if not found.
 */
export async function fetchUserData(userId) {
  if (!userId) throw new Error("User ID is required to fetch user data.");

  try {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      return userSnap.data();
    } else {
      console.warn("User not found in Firestore.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw new Error("Failed to retrieve user data.");
  }
}

/**
 * Create or update user profile in Firestore.
 * @param {string} userId - The user ID.
 * @param {Object} userData - The user data to update.
 * @returns {Promise<void>}
 */
export async function updateUserProfile(userId, userData) {
  if (!userId || !userData) throw new Error("User ID and user data are required.");

  try {
    const userRef = doc(db, "users", userId);
    await setDoc(userRef, userData, { merge: true });
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw new Error("Failed to update user profile.");
  }
}

/**
 * Update specific fields in user profile.
 * @param {string} userId - The user ID.
 * @param {Object} updates - The fields to update.
 * @returns {Promise<void>}
 */
export async function updateUserFields(userId, updates) {
  if (!userId || !updates) throw new Error("User ID and update fields are required.");

  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, updates);
  } catch (error) {
    console.error("Error updating user fields:", error);
    throw new Error("Failed to update user information.");
  }
}

/**
 * Delete a user from Firestore.
 * @param {string} userId - The user ID.
 * @returns {Promise<void>}
 */
export async function deleteUserAccount(userId) {
  if (!userId) throw new Error("User ID is required to delete an account.");

  try {
    const userRef = doc(db, "users", userId);
    await deleteDoc(userRef);
  } catch (error) {
    console.error("Error deleting user account:", error);
    throw new Error("Failed to delete user account.");
  }
}
