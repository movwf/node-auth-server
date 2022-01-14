import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String, default: "0" },
  },
  { emitIndexErrors: true }
);

const handleE11000 = (error, res, next) => {
  if (error.code === 11000) {
    const errorFields = Object.keys(error.keyPattern);

    next(`Duplicate key error: ${errorFields}`);
  } else {
    next();
  }
};

userSchema.post("save", handleE11000);
userSchema.post("create", handleE11000);
userSchema.post("update", handleE11000);
userSchema.post("insertOne", handleE11000);

const User = mongoose.model("User", userSchema);
export default User;
