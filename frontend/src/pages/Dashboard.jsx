import { useEffect, useState } from "react";
import { Pie, Line } from "react-chartjs-2";
import { Chart, ArcElement, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from "chart.js";
import io from "socket.io-client";
import axios from "axios";

Chart.register(ArcElement, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const socket = io("http://localhost:5000");

export default function Dashboard() {
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    // Function to fetch attendance
    const fetchAttendance = async () => {
      const res = await axios.get("http://localhost:5000/api/attendance");
      setAttendance(res.data);
    };

    // Fetch immediately
    fetchAttendance();

    // Set up polling every 5 seconds
    const interval = setInterval(fetchAttendance, 5000);

    // Cleanup on unmount
    return () => clearInterval(interval);
  }, []);

  // Mock stats for charts
  const present = attendance.filter(a => a.status === "Present").length;
  const absent = attendance.filter(a => a.status === "Absent").length;

  const pieData = {
    labels: ["Present", "Absent"],
    datasets: [
      {
        data: [present, absent],
        backgroundColor: ["#2563eb", "#d1d5db"],
      },
    ],
  };

  const lineData = {
    labels: attendance.map(a => new Date(a.time).toLocaleTimeString()).reverse().slice(0, 10),
    datasets: [
      {
        label: "Attendance Over Time",
        data: attendance.map(a => (a.status === "Present" ? 1 : 0)).reverse().slice(0, 10),
        fill: false,
        borderColor: "#2563eb",
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto py-10">
      <h2 className="text-3xl font-bold text-center mb-8">Live Dashboard Preview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Attendance List */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-bold text-xl mb-4">Real-Time Attendance List</h3>
          <ul className="divide-y">
            {attendance.slice(0, 10).map((a, i) => (
              <li key={i} className="py-2 flex items-center gap-3">
                {a.image && <img src={a.image} alt="face" className="w-8 h-8 rounded-full object-cover" />}
                <span className="font-semibold">{a.name}</span>
                <span className={`ml-auto px-2 py-1 rounded text-xs ${a.status === "Present" ? "bg-blue-100 text-blue-600" : "bg-gray-200 text-gray-600"}`}>{a.status}</span>
                <span className="ml-2 text-gray-400 text-xs">{new Date(a.time).toLocaleTimeString()}</span>
              </li>
            ))}
          </ul>
        </div>
        {/* Camera Feed Thumbnails & Stats */}
        <div className="flex flex-col gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-bold text-xl mb-4">Camera Feed Thumbnails</h3>
            <div className="flex gap-2">
              {attendance.slice(0, 4).map((a, i) => (
                <img key={i} src={a.image || "/hero-image.svg"} alt="feed" className="w-20 h-20 rounded object-cover border" />
              ))}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-bold text-xl mb-4">Attendance Stats</h3>
            <Pie data={pieData} />
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-bold text-xl mb-4">Attendance Over Time</h3>
            <Line data={lineData} />
          </div>
        </div>
      </div>
    </div>
  );
} 