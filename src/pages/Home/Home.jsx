import React from "react";
import styles from "./Home.module.css";
import { Navbar } from "../../components/Navbar/Navbar";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { Chat } from "../../components/Chat/Chat";
import { Loader } from "../../components/Loader/Loader";
import { useAuth } from "../../contexts/AuthContext";
import { useChat } from "../../contexts/ChatContext";
import { useTheme } from "../../contexts/ThemeContext"; // ✅ Import ThemeContext

export function Home() {
  const { user, login } = useAuth(); // 🔹 Authentication state
  const { loading, messages, setMessages, selectedModel, setSelectedModel } = useChat(); // 🔹 Chat state
  const { isDarkMode } = useTheme(); // 🔹 Dark mode state

  return (
    <div className={`${styles.Home} ${isDarkMode ? styles.DarkMode : ""}`}>
      {/* ✅ Navbar (Model Selection + Features) */}
      <Navbar selectedModel={selectedModel} setSelectedModel={setSelectedModel} />

      <div className={styles.MainContainer}>
        {/* ✅ Sidebar (Chat History & User Profile) */}
        <Sidebar messages={messages} setMessages={setMessages} user={user} />

        {/* ✅ Chat Interface */}
        <div className={styles.ChatContainer}>
          {loading ? (
            <Loader />
          ) : user ? (
            <Chat messages={messages} setMessages={setMessages} />
          ) : (
            <div className={styles.LoginPrompt}>
              <h2>Welcome to Chatterly AI</h2>
              <p>Please log in to start chatting.</p>
              <button onClick={login} className={styles.LoginButton}>
                Login with Google
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
