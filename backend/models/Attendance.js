import mongoose from "mongoose";
const AttendanceSchema = new mongoose.Schema({
  name: String,
  time: { type: Date, default: Date.now },
  status: String,
  image: String // base64 or data URL
});
export default mongoose.model("Attendance", AttendanceSchema); 