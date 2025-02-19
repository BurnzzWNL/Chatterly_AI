import React, { useState } from "react";
import styles from "./Login.module.css";
import { handleLogin } from "../../services/authService";
import { Loader } from "../../components/Loader/Loader";

export function Login({ setUser, setMessages }) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // 🔹 Loading state for better UX

  /**
   * 🔹 Handles user login with Google
   */
  const loginWithGoogle = async () => {
    setLoading(true);
    setError(null);

    try {
      await handleLogin(setUser, setMessages, setError);
    } catch (err) {
      console.error("Login error:", err);
      setError("Failed to sign in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.LoginContainer}>
      <div className={styles.LoginBox}>
        <h2 className={styles.LoginTitle}>Welcome to Chatterly AI</h2>
        <p className={styles.LoginDescription}>Sign in to start chatting</p>

        {/* 🔹 Show Loader while logging in */}
        {loading ? (
          <Loader />
        ) : (
          <>
            {/* Error Message Display */}
            {error && <p className={styles.ErrorMessage}>{error}</p>}

            {/* Google Login Button */}
            <button className={styles.LoginButton} onClick={loginWithGoogle}>
              <img
                src="/google-icon.png"
                alt="Google Logo"
                className={styles.GoogleLogo}
              />
              Sign in with Google
            </button>
          </>
        )}
      </div>
    </div>
  );
}
