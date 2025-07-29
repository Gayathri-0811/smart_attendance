import { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import Webcam from "react-webcam";
import axios from "axios";
import { motion } from "framer-motion";

export default function WebcamDemo() {
  const webcamRef = useRef(null);
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [recognized, setRecognized] = useState("");
  const [regPhoto, setRegPhoto] = useState(null);

  useEffect(() => {
    // Load models and fetch users
    (async () => {
      await faceapi.nets.ssdMobilenetv1.loadFromUri("/models");
      await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
      await faceapi.nets.faceRecognitionNet.loadFromUri("/models");
      const res = await axios.get("http://localhost:5000/api/users");
      setUsers(res.data);
    })();
  }, []);

  const handleScan = async () => {
    setMessage("Scanning...");
    const screenshot = webcamRef.current.getScreenshot();
    const img = await faceapi.fetchImage(screenshot);
    const detection = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
    if (!detection) {
      setMessage("No face detected.");
      setRecognized("");
      setRegPhoto(null);
      return;
    }
    // Compare with all users
    let bestMatch = { name: "Unknown", distance: 1.0 };
    users.forEach(user => {
      const dist = faceapi.euclideanDistance(detection.descriptor, user.encoding);
      if (dist < 0.5 && dist < bestMatch.distance) {
        bestMatch = { name: user.name, distance: dist };
      }
    });
    setRecognized(bestMatch.name);
    setMessage(bestMatch.name === "Unknown" ? "Face not recognized." : `Hello, ${bestMatch.name}!`);

    // Show registration photo if recognized
    if (bestMatch.name !== "Unknown") {
      const user = users.find(u => u.name === bestMatch.name);
      setRegPhoto(user?.image || null);
      await axios.post("http://localhost:5000/api/attendance", {
        name: bestMatch.name,
        status: "Present",
        time: new Date(),
        image: screenshot
      });
    } else {
      setRegPhoto(null);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10">
      <h2 className="text-3xl font-bold text-center mb-8">Webcam Scan Demo</h2>
      <div className="flex flex-col items-center gap-6">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={320}
          height={240}
          className="rounded shadow"
        />
        <button
          onClick={handleScan}
          className="bg-blue-600 text-white px-6 py-3 rounded-full font-bold shadow hover:bg-blue-700 transition"
        >
          Scan
        </button>
        {recognized && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full">
            <h3 className="font-bold text-lg mb-2 text-center">Detected Faces</h3>
            <div className="flex gap-4 justify-center">
              <div className="flex flex-col items-center">
                <img src={recognized} alt="face" className="w-16 h-16 rounded-full object-cover border" />
                <span className="mt-2 font-semibold">{recognized}</span>
                {recognized === "Unknown" && (
                  <span className="text-red-600 text-xs">Not registered. <a href='/register' className='underline'>Register?</a></span>
                )}
              </div>
            </div>
          </motion.div>
        )}
        {regPhoto && (
          <div className="flex flex-col items-center mt-4">
            <img src={regPhoto} alt="Registered" className="w-32 h-32 rounded-full object-cover border" />
            <span className="text-xs text-gray-500 mt-1">Registration photo</span>
          </div>
        )}
        {message && <div className="mt-2 text-center">{message}</div>}
        <div className="mt-8 text-center text-gray-600">
          <p>
            The system scans the room, detects faces, and updates attendance records automatically.
            <br />
            <span className="text-blue-600 font-semibold">No manual effort. No proxies. Just automation.</span>
          </p>
        </div>
      </div>
    </div>
  );
} 