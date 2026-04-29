import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export async function connectDB() {
  try {
    console.log("inside connect to db");

    mongoose.set("strictQuery", true);

    await mongoose.connect(process.env.MONGO_URL as string);

    console.log(
      "Mongo DB Connected",
      process.env.MONGO_URL
    );
  } catch (error) {
    console.error("Mongo DB Connection Error:", error);
    process.exit(1);
  }
}