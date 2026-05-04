import mongoose from "mongoose";

export const connectDb = async () => {
  const dbUrl = process.env.MONGODB_URL;
  try {
    if (dbUrl) {
      await mongoose.connect(dbUrl);
    } else {
      console.log("No URL detected");
    }
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
};
