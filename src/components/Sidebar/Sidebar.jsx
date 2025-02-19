import React, { useState, useEffect } from "react";
import styles from "./Sidebar.module.css";
import { signInWithGoogle, logout, auth } from "../../services/firebase";

export function Sidebar({ messages = [], setMessages = () => {}, user, setUser, isSidebarExpanded, setIsSidebarExpanded }) {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [setUser]);

  const handleLogin = async () => {
    try {
      const loggedInUser = await signInWithGoogle();
      setUser(loggedInUser);
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      setMessages([]);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <aside
      className={`${styles.Sidebar} ${isSidebarExpanded ? styles.Expanded : styles.Collapsed}`}
    >
      {/* 🔹 Toggle Button */}
      <button className={styles.ToggleButton} onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}>
        {isSidebarExpanded ? "❮" : "❯"}
      </button>

      {/* 🔹 Chat History Section */}
      <div className={styles.TopSection}>
        <h3 className={styles.SidebarTitle}>Chat History</h3>
        {messages.length === 0 ? (
          <p className={styles.EmptyMessage}>No chats available</p>
        ) : (
          <ul className={styles.ChatList}>
            {messages.map((chat) => (
              <li
                key={chat.id}
                className={styles.ChatItem}
                onClick={() => setMessages([chat])}
              >
                <span className={styles.ModelName}>{chat.model}</span>
                <span className={styles.Timestamp}>
                  {new Date(chat.timestamp).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 🔹 User Section */}
      <div className={styles.BottomSection}>
        {user ? (
          <div
            className={styles.UserInfo}
            onClick={() => setIsDropdownVisible((prev) => !prev)}
          >
            <img
              className={styles.UserAvatar}
              src={user.photoURL || "/default-avatar.png"}
              alt="User Avatar"
            />
            {isSidebarExpanded && (
              <span className={styles.UserEmail} title={user.email}>
                {user.email}
              </span>
            )}

            {/* 🔹 Dropdown for Logout */}
            {isDropdownVisible && (
              <div className={styles.Dropdown}>
                <button className={styles.DropdownButton} onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <button className={styles.AuthButton} onClick={handleLogin}>
            {isSidebarExpanded ? "Login with Google" : "Login"}
          </button>
        )}
      </div>
    </aside>
  );
}
