"use server";

import { ID, Query } from "node-appwrite";
import { InputFile } from "node-appwrite/file";
import {
  BUCKET_ID,
  DATABASE_ID,
  ENDPOINT,
  PATIENT_COLLECTION_ID,
  PROJECT_ID,
  databases,
  storage,
  users,
} from "../appwrite.config";
import { parseStringify } from "../utils";
import sdk from "node-appwrite";
// CREATE APPWRITE USER
export const createUser = async (user: CreateUserParams) => {
  try {
    // Check if the user email already exists
    const existingUsers = await users.list([
      Query.equal("email", [user.email]),
    ]);

    if (existingUsers.total > 0) {
      // If user exists, return the existing user
      return { existingUser: existingUsers.users[0] };
    } else {
      // If user does not exist, create a new user
      const newUser = await users.create(
        ID.unique(),
        user.email,
        user.phone,
        undefined,
        user.name
      );
      const parsedUser = parseStringify(newUser);
      return { newUser: parsedUser };
    }
  } catch (error: any) {
    console.error("An error occurred while creating a new user:", error);
    throw error;
  }
};
// check User Profile
export const checkUserEmail = async (email: string) => {
  try {
    const result = await databases.listDocuments(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      [sdk.Query.equal("email", email)]
    );

    if (result.documents.length > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("An error occurred while checking the user email:", error);
    return false;
  }
};
// GET USER
export const getUser = async (userId: string) => {
  try {
    const user = await users.get(userId);
    return parseStringify(user);
  } catch (error) {
    console.error(
      "An error occurred while retrieving the user details:",
      error
    );
  }
};

// REGISTER PATIENT
export const registerPatient = async ({
  identificationDocument,
  ...patient
}: RegisterUserParams) => {
  try {
    // Upload file
    let file;
    if (identificationDocument) {
      const buffer = Buffer.from(
        identificationDocument.base64.split(",")[1],
        "base64"
      );
      const inputFile = InputFile.fromBuffer(
        buffer,
        identificationDocument?.name
      );
      file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile);
    }

    // Create new patient document
    const newPatient = await databases.createDocument(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      ID.unique(),
      {
        identificationDocumentId: file?.$id ? file.$id : null,
        identificationDocumentUrl: `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file?.$id}/view??project=${PROJECT_ID}`,
        ...patient,
      }
    );

    return parseStringify(newPatient);
  } catch (error) {
    console.error("An error occurred while creating a new patient:", error);
  }
};

// GET PATIENT
export const getPatient = async (userId: string) => {
  try {
    const patients = await databases.listDocuments(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      [Query.equal("userId", [userId])]
    );

    return parseStringify(patients.documents[0]);
  } catch (error) {
    console.error(
      "An error occurred while retrieving the patient details:",
      error
    );
  }
};
