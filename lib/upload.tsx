// lib/upload.ts
import { storage } from "./appwrite.config";

export const uploadFile = async (file: File) => {
  try {
    const response = await storage.createFile(
      `${process.env.DATABASE_ID}`, // Your bucket ID
      file,
      ["*"], // Optional: List of read permissions
      ["*"] // Optional: List of write permissions
    );
    return response.$id; // Return the file ID
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};
