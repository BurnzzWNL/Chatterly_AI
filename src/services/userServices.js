import { db, auth } from "./firebase";
import { doc, setDoc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";

/**
 * 🔹 Save or Update User Profile in Firestore
 * @param {string} userId - The user's unique ID
 * @param {Object} userData - User details (name, email, profile picture, etc.)
 */
export const saveUserProfile = async (userId, userData) => {
  if (!userId || !userData) throw new Error("Invalid user data.");

  try {
    const userRef = doc(db, "users", userId);
    await setDoc(userRef, userData, { merge: true }); // Merge to avoid overwriting
  } catch (error) {
    console.error("Error saving user profile:", error);
    throw new Error("Failed to save user profile.");
  }
};

/**
 * 🔹 Fetch User Profile from Firestore
 * @param {string} userId - The user's unique ID
 * @returns {Promise<Object|null>} - Returns user data or null if not found
 */
export const getUserProfile = async (userId) => {
  if (!userId) throw new Error("User ID is required.");

  try {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);
    return userSnap.exists() ? userSnap.data() : null;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw new Error("Failed to retrieve user data.");
  }
};

/**
 * 🔹 Update User Profile in Firestore
 * @param {string} userId - The user's unique ID
 * @param {Object} updates - Fields to update (e.g., name, profile picture)
 */
export const updateUserProfile = async (userId, updates) => {
  if (!userId || !updates) throw new Error("Invalid update data.");

  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, updates);
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw new Error("Failed to update user profile.");
  }
};

/**
 * 🔹 Delete User Profile from Firestore
 * @param {string} userId - The user's unique ID
 */
export const deleteUserProfile = async (userId) => {
  if (!userId) throw new Error("User ID is required.");

  try {
    const userRef = doc(db, "users", userId);
    await deleteDoc(userRef);
  } catch (error) {
    console.error("Error deleting user profile:", error);
    throw new Error("Failed to delete user profile.");
  }
};

/**
 * 🔹 Get Current Authenticated User
 * @returns {Object|null} - Firebase Auth user object or null if not signed in
 */
export const getCurrentUser = () => {
  return auth.currentUser;
};
