import { auth, googleProvider } from "../../services/firebaseAuth";
import { signInWithPopup, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from "firebase/auth";

/**
 * Sign up a new user with email and password.
 * @param {string} email - User email.
 * @param {string} password - User password.
 * @returns {Promise<Object>} - User data or error.
 */
export async function signUpUser(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Error signing up user:", error);
    throw new Error(error.message || "Failed to sign up.");
  }
}

/**
 * Log in an existing user with email and password.
 * @param {string} email - User email.
 * @param {string} password - User password.
 * @returns {Promise<Object>} - User data or error.
 */
export async function loginUser(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Error logging in user:", error);
    throw new Error(error.message || "Failed to log in.");
  }
}

/**
 * Log in a user using Google OAuth.
 * @returns {Promise<Object>} - User data or error.
 */
export async function loginWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error("Error logging in with Google:", error);
    throw new Error(error.message || "Failed to log in with Google.");
  }
}

/**
 * Log out the current user.
 * @returns {Promise<void>} - Resolves on success, rejects on failure.
 */
export async function logoutUser() {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error logging out user:", error);
    throw new Error("Failed to log out.");
  }
}
