import { useState, useRef } from "react";
import * as faceapi from "face-api.js";
import Webcam from "react-webcam";
import axios from "axios";

export default function RegisterUser() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const webcamRef = useRef(null);

  // Load models once
  const loadModels = async () => {
    await faceapi.nets.ssdMobilenetv1.loadFromUri("/models");
    await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
    await faceapi.nets.faceRecognitionNet.loadFromUri("/models");
  };

  const handleRegister = async () => {
    setMessage("Processing...");
    await loadModels();
    const screenshot = webcamRef.current.getScreenshot();
    const img = await faceapi.fetchImage(screenshot);
    const detection = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
    if (!detection) {
      setMessage("No face detected. Try again.");
      return;
    }
    // Send encoding, name, and image to backend
    await axios.post("http://localhost:5000/api/users/register", {
      name,
      encoding: Array.from(detection.descriptor),
      image: screenshot
    });
    setMessage("User registered!");
  };

  return (
    <div className="max-w-md mx-auto py-10">
      <h2 className="text-2xl font-bold mb-4">Register New User</h2>
      <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} className="border p-2 w-full mb-4" />
      <Webcam ref={webcamRef} screenshotFormat="image/jpeg" width={320} height={240} className="rounded shadow mb-4" />
      <button onClick={handleRegister} className="bg-blue-600 text-white px-4 py-2 rounded">Register</button>
      {message && <div className="mt-4 text-center">{message}</div>}
    </div>
  );
} 