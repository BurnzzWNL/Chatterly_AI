import { auth } from "./firebase";
import { GoogleAuthProvider, signInWithPopup, signOut as firebaseSignOut, onAuthStateChanged } from "firebase/auth";

// 🔹 Initialize Google Auth Provider
const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" }); // Ensures Google account selection

/**
 * 🔹 Handles Google Sign-In
 * @returns {Promise<User>} - Authenticated user object.
 * @throws {Error} - If login fails.
 */
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error("Google Sign-In Error:", error.message);
    throw new Error("Failed to sign in. Please try again.");
  }
};

/**
 * 🔹 Handles User Sign-Out
 * @returns {Promise<void>}
 * @throws {Error} - If sign-out fails.
 */
export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    console.error("Sign-Out Error:", error.message);
    throw new Error("Failed to sign out. Please try again.");
  }
};

/**
 * 🔹 Listen for Authentication State Changes
 * @param {Function} callback - Function to handle user state changes.
 * @returns {Function} - Unsubscribe function.
 */
export const onAuthStateChangedListener = (callback) => {
  return onAuthStateChanged(auth, callback);
};

// 🔹 Export provider for direct usage if needed
export { provider, auth };
