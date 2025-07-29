import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
  name: String,
  encoding: [Number], // 128-d array from face-api.js
  image: String // base64 or data URL for registration photo
});
export default mongoose.model("User", UserSchema); 