import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, max: 50, unique: true },
  password: { type: String, required: true },
  resetToken: String,
  resetTokenExpiration: Date,
});

const User = mongoose.model("Users", UserSchema);
export default User;
