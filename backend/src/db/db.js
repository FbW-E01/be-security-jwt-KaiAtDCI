import mongoose from "mongoose";
import dotenv from "dotenv";

const dotenvResult = dotenv.config();
if (dotenvResult.error) {
  console.log("ERROR when loading .env",dotenvResult.error);
  process.exit(1);
}

const username = process.env.DB_USER;
const password = process.env.DB_PASS;
const db = process.env.DB_NAME;

const connectionString = `mongodb://${username}:${password}@localhost:27017/${db}`;
console.log(connectionString);

mongoose.connection.on("error", (e) => console.log(">> Error!", e) || process.exit(0));
mongoose.connection.on("connecting", () => console.log(">> Connecting"));
mongoose.connection.on("disconnecting", () => console.log(">> Disconnecting"));
mongoose.connection.on("disconnected", () => console.log(">> Disconnected"));

export async function connect() {
    return await mongoose.connect(connectionString);
}

export async function disconnect() {
  return await mongoose.disconnect();
}
