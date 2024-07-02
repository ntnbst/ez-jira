import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  // console.log("process", process.env);
  try {
    await mongoose.connect(process.env.MONGO_URI || "");
    console.log("Monog connected!!!!");
  } catch (error: any) {
    console.error("got db error", error);
    // console.error("something went wrong wile connecting to db", error.message);
    process.exit(1);
  }
};

export default connectDB;
