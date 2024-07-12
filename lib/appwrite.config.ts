import * as sdk from "node-appwrite";

export const {
  NEXT_PUBLIC_ENDPOINT: ENDPOINT,
  PROJECT_ID,
  API_KEY,
  DATABASE_ID,
  PATIENT_COLLECTION_ID,
  DOCTOR_COLLECTION_ID,
  APPOINTMENT_COLLECTION_ID,
  NEXT_PUBLIC_BUCKET_ID: BUCKET_ID,
} = process.env;

const client = new sdk.Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("668d753a003baedf94a1")
  .setKey(
    "9d474a4c6931205b020c13cfd59b55d1e327b3e1777c8be4bcae44b327be04bfff13b25b7581557118396d3d536dadb739abfd6807a6d9d0ef0d6603f0bc988704f3078dd6c6f56b18d537e11e7c7126c37c98f705544128c7cf718a3f812c82634bf817e24938c06f752160a71e7c5d9a15a90c8b8761a233d4313440165d79"
  );

export const databases = new sdk.Databases(client);
export const users = new sdk.Users(client);
export const Messaging = new sdk.Messaging(client);
export const storage = new sdk.Storage(client);
