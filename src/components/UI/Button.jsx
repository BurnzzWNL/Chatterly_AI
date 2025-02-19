import styles from "./ui.module.css";

export default function Button({
  children,
  onClick,
  className = "",
  disabled = false,
  variant = "primary", // 🔹 Default to primary button
  isLoading = false, // 🔹 Loading state
}) {
  return (
    <button
      className={`${styles.button} ${styles[variant]} ${className}`}
      onClick={onClick}
      disabled={disabled || isLoading}
      aria-busy={isLoading} // 🔹 Accessibility: Indicate loading state
    >
      {isLoading ? "Processing..." : children}
    </button>
  );
}
