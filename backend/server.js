import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import User from "./models/User.js";
import Attendance from "./models/Attendance.js";

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/smart-attendance", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Register new user
app.post("/api/users/register", async (req, res) => {
  const { name, encoding, image } = req.body;
  if (!name || !encoding || !image) {
    return res.status(400).json({ error: "Name, encoding, and image required" });
  }
  const user = new User({ name, encoding, image });
  await user.save();
  res.json({ success: true, user });
});

// List users
app.get("/api/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Get all attendance
app.get("/api/attendance", async (req, res) => {
  const data = await Attendance.find().sort({ time: -1 }).limit(50);
  res.json(data);
});

// Add attendance (for demo/testing)
app.post("/api/attendance", async (req, res) => {
  const record = new Attendance(req.body);
  await record.save();
  res.json({ success: true });
});

app.listen(5000, () => console.log("Backend running on http://localhost:5000")); 