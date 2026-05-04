import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  emailVerified: Boolean,

  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  role: {
    type: String,
    required: true,
    default: "user",
  },
  banned: Boolean,
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
