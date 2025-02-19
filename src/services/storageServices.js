import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { app } from "./firebase";

// Initialize Firebase Storage
const storage = getStorage(app);

/**
 * 🔹 Upload a file to Firebase Storage
 * @param {File} file - File to be uploaded
 * @param {string} userId - User ID (to organize storage by user)
 * @returns {Promise<string>} - Download URL of the uploaded file
 */
export const uploadFile = async (file, userId) => {
  if (!file) throw new Error("No file selected for upload.");

  const fileRef = ref(storage, `uploads/${userId}/${file.name}`);

  try {
    await uploadBytes(fileRef, file);
    return await getDownloadURL(fileRef);
  } catch (error) {
    console.error("File upload error:", error);
    throw new Error("Failed to upload file. Please try again.");
  }
};

/**
 * 🔹 Get a file's download URL from Firebase Storage
 * @param {string} filePath - Path of the file in storage
 * @returns {Promise<string>} - Download URL
 */
export const getFileUrl = async (filePath) => {
  try {
    const fileRef = ref(storage, filePath);
    return await getDownloadURL(fileRef);
  } catch (error) {
    console.error("Error fetching file URL:", error);
    throw new Error("Failed to retrieve file.");
  }
};

/**
 * 🔹 Delete a file from Firebase Storage
 * @param {string} filePath - Path of the file to be deleted
 * @returns {Promise<void>}
 */
export const deleteFile = async (filePath) => {
  try {
    const fileRef = ref(storage, filePath);
    await deleteObject(fileRef);
  } catch (error) {
    console.error("Error deleting file:", error);
    throw new Error("Failed to delete file.");
  }
};

export { storage };
