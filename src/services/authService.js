import { auth, googleProvider, signInWithPopup, signOut } from "../services/firebase";

/**
 * 🔹 Handle Google Login
 */
export const handleLogin = async (setUser, setError) => {
  try {
    setError(null);
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    setUser({
      email: user.email,
      photoURL: user.photoURL, // Ensure this is passed
      displayName: user.displayName,
    });

    // Store user details in localStorage for persistence
    localStorage.setItem("user", JSON.stringify(user));
  } catch (error) {
    console.error("Login failed:", error);
    setError("Login failed. Please try again.");
  }
};


/**
 * 🔹 Handle Google Logout
 */
export const handleLogout = async (setUser, setMessages, setError) => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Logout failed:", error);
    setError("Logout failed. Some data may still be stored.");
  } finally {
    // ✅ Clear session data
    setUser(null);
    setMessages([]);
    localStorage.removeItem("user");
  }
};

/**
 * 🔹 Check for an existing session (Auto-login on refresh)
 */
export const checkUserSession = (setUser) => {
  const storedUser = localStorage.getItem("user");

  auth.onAuthStateChanged((currentUser) => {
    if (currentUser) {
      setUser(currentUser);
      if (!storedUser || JSON.stringify(currentUser) !== storedUser) {
        localStorage.setItem("user", JSON.stringify(currentUser));
      }
    } else {
      setUser(null);
      localStorage.removeItem("user");
    }
  });
};

/**
 * 🔹 Check if session token is expired
 */
export const isSessionExpired = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  if (!storedUser || !storedUser.stsTokenManager) return true;

  const currentTime = Date.now() / 1000;
  return currentTime > storedUser.stsTokenManager.expirationTime / 1000;
};

/**
 * 🔹 Restore session by refreshing tokens
 */
export const restoreSession = async (setUser) => {
  const user = auth.currentUser;
  if (user) {
    await user.getIdToken(true);
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  }
};
