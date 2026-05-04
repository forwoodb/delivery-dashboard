import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { nextCookies } from "better-auth/next-js";
import { admin } from "better-auth/plugins";
import { MongoClient } from "mongodb";

// Connect to db client
const dbUrl = process.env.MONGODB_URL;

if (!dbUrl) {
  throw new Error("No database URL");
}

const client = new MongoClient(dbUrl);

const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db, { client, usePlural: true }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [admin(), nextCookies()],
});
