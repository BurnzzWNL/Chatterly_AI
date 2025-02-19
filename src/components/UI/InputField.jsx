import styles from "./ui.module.css";

export default function InputField({
  type = "text",
  placeholder = "Enter text...",
  value,
  onChange,
  className = "",
  disabled = false,
}) {
  return (
    <input
      type={type}
      className={`${styles.inputField} ${className}`}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled} // ✅ Added support for disabled state
    />
  );
}
