/**
 * 🔹 Validate Email Format
 * @param {string} email - The email input from user
 * @returns {boolean} - `true` if valid, otherwise `false`
 */
export function isValidEmail(email) {
  if (typeof email !== "string") return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * 🔹 Validate Password Strength
 * - Minimum 8 characters
 * - At least one uppercase letter
 * - At least one lowercase letter
 * - At least one number
 * - Allows special characters
 * @param {string} password - The password input from user
 * @returns {boolean} - `true` if password is strong, otherwise `false`
 */
export function isValidPassword(password) {
  if (typeof password !== "string" || password.length < 8) return false;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
}

/**
 * 🔹 Validate if Input is Not Empty
 * @param {string} input - Any text input
 * @returns {boolean} - `true` if not empty, otherwise `false`
 */
export function isNotEmpty(input) {
  return typeof input === "string" && input.trim().length > 0;
}

/**
 * 🔹 Validate if String Contains Only Letters (No Numbers/Symbols)
 * @param {string} text - The text input from user
 * @returns {boolean} - `true` if valid, otherwise `false`
 */
export function isOnlyLetters(text) {
  if (typeof text !== "string") return false;
  const lettersRegex = /^[A-Za-z\s]+$/;
  return lettersRegex.test(text);
}

/**
 * 🔹 Validate if String is a Valid URL
 * @param {string} url - The URL input from user
 * @returns {boolean} - `true` if valid, otherwise `false`
 */
export function isValidURL(url) {
  if (typeof url !== "string") return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * 🔹 Validate if Input is a Number
 * @param {string|number} value - The input value
 * @returns {boolean} - `true` if number, otherwise `false`
 */
export function isNumber(value) {
  return !isNaN(value) && value !== null && value !== "";
}

/**
 * 🔹 Validate if Username is Alphanumeric (Allows letters and numbers only)
 * @param {string} username - The username input from user
 * @returns {boolean} - `true` if valid, otherwise `false`
 */
export function isAlphanumeric(username) {
  if (typeof username !== "string") return false;
  const usernameRegex = /^[a-zA-Z0-9]+$/;
  return usernameRegex.test(username);
}

/**
 * 🔹 Validate Phone Number (Supports different formats)
 * - Matches 10-digit numbers, numbers with dashes, spaces, or parentheses
 * @param {string} phone - The phone number input
 * @returns {boolean} - `true` if valid, otherwise `false`
 */
export function isValidPhoneNumber(phone) {
  if (typeof phone !== "string") return false;
  const phoneRegex = /^(\+?\d{1,4}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}$/;
  return phoneRegex.test(phone);
}

/**
 * 🔹 Validate if Date is in `YYYY-MM-DD` format
 * @param {string} date - The date input from user
 * @returns {boolean} - `true` if valid, otherwise `false`
 */
export function isValidDate(date) {
  if (typeof date !== "string") return false;
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  return dateRegex.test(date) && !isNaN(new Date(date).getTime());
}
