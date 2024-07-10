import { Query, ID } from "node-appwrite";
import {
  BUCKET_ID,
  DATABASE_ID,
  Databases,
  ENDPOINT,
  PATIENT_COLLECTION_ID,
  PROJECT_ID,
  Storage,
  Users,
} from "../appwrite.config";
import { parseStringify } from "../utils";
import { InputFile } from "node-appwrite/file";
// Create new user
export const createUser = async (user: CreateUserParams) => {
  try {
    const newUser = await Users.create(
      `${ID.unique()}`,
      `${user.email}`,
      `${user.phone}`,
      `${user.name}`
    );

    return parseStringify(newUser);
  } catch (error: any) {
    // Check existing user
    if (error && error?.code === 409) {
      const documents = await Users.list([Query.equal("email", [user.email])]);

      return documents.users[0];
    }
    console.error("An error occurred while creating a new user:", error);
  }
};
// Get USers
export const getUser = async (userid: string) => {
  try {
    const user = await Users.get(userid);
    return parseStringify(user);
  } catch (error: any) {
    console.log("error", error);
  }
};

//patient Register
export const registerPatient = async ({
  identificationDocument,
  ...patient
}: RegisterUserParams) => {
  try {
    let file;

    if (identificationDocument) {
      const inputFile = InputFile.fromBuffer(
        identificationDocument?.get("blobFile") as Blob,
        identificationDocument?.get("fileBame") as string
      );
      file = await Storage.createFile(BUCKET_ID!, ID.unique(), inputFile);
    }
    const newPatient = await Databases.createDocument(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      ID.unique(),
      {
        identificationDocumnetId: file?.$id || null,
        identificationDocumnetUrl: `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file?.$id}/view?project=${PROJECT_ID}`,
      }
    );
    return parseStringify(newPatient);
  } catch (error: any) {
    console.log("error", error);
  }
};
