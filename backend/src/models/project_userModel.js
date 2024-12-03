import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  time_played: {
    type: Number,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);
export default User;
