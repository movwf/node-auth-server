import mongoose from "mongoose";
import { logError, logSuccess } from "./logColors";

const connect = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);

    logSuccess("DB: Connection established.");
  } catch (error) {
    logError("DB: Connection error!");
  }
};

export default { connect };
