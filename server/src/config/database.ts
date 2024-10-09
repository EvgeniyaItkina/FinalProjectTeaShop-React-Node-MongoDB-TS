import mongoose from "mongoose";
import "./enviroment";

export async function connectMongoose() {
  try {
    const db =
      process.env.NODE_ENV === "development"
        ? process.env.MONGO_DB_URL
        : process.env.ATLAS_URL;
    console.log(db);

    await mongoose.connect(db as string);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error: ", error);
    process.exit(1);
  }
}
