import { FaCamera, FaUserCheck, FaSync, FaChartPie, FaMobileAlt, FaShieldAlt, FaCloud } from "react-icons/fa";
import FeatureCard from "../components/FeatureCard";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20 text-center">
        <motion.h1 initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} className="text-5xl font-bold mb-4">
          Smarter Attendance, Zero Proxies.
        </motion.h1>
        <p className="text-xl mb-8">AI-powered attendance for modern colleges. No manual effort, no proxies, just seamless automation.</p>
        <motion.img src="/hero-image.svg" alt="Smart Attendance" className="mx-auto w-2/3 md:w-1/3" initial={{ scale: 0.8 }} animate={{ scale: 1 }} />
        <div className="mt-8">
          <Link to="/webcam-demo" className="bg-white text-blue-600 px-6 py-3 rounded-full font-bold shadow hover:bg-blue-100 transition">See How It Works</Link>
        </div>
      </section>
      {/* Features */}
      <section className="py-16 bg-white">
        <h2 className="text-3xl font-bold text-center mb-10">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <FeatureCard icon={<FaCamera />} title="Facial Recognition" desc="AI detects and matches faces instantly." />
          <FeatureCard icon={<FaUserCheck />} title="Motion Detection" desc="Sensors ensure only present students are marked." />
          <FeatureCard icon={<FaSync />} title="Real-Time Sync" desc="Attendance logs update across all devices." />
          <FeatureCard icon={<FaChartPie />} title="Dashboard Analytics" desc="Visualize attendance trends and stats." />
          <FeatureCard icon={<FaMobileAlt />} title="Mobile App" desc="View attendance, alerts, and reports on the go." />
          <FeatureCard icon={<FaShieldAlt />} title="Anti-Proxy & Security" desc="No proxies, secure cloud sync, admin controls." />
        </div>
      </section>
      {/* How It Works */}
      <section className="py-16 bg-blue-50">
        <h2 className="text-3xl font-bold text-center mb-10">How It Works</h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-10 max-w-5xl mx-auto">
          <Step icon={<FaCamera />} title="Camera Capture" desc="Webcam or classroom camera captures the room." />
          <Step icon={<FaUserCheck />} title="Face Detection" desc="AI detects and identifies faces in real time." />
          <Step icon={<FaSync />} title="Identity Match" desc="System matches faces to student records." />
          <Step icon={<FaChartPie />} title="Attendance Update" desc="Attendance is marked and synced instantly." />
        </div>
      </section>
      {/* Security & Integration */}
      <section className="py-16 bg-white">
        <h2 className="text-3xl font-bold text-center mb-10">Seamless Integration & Security</h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-10 max-w-5xl mx-auto">
          <FeatureCard icon={<FaCloud />} title="Cloud Sync" desc="All data is securely synced to the cloud." />
          <FeatureCard icon={<FaShieldAlt />} title="Admin Access Control" desc="Only authorized personnel can access sensitive data." />
        </div>
      </section>
    </div>
  );
}

function Step({ icon, title, desc }) {
  return (
    <motion.div whileHover={{ scale: 1.05 }} className="bg-white p-6 rounded-lg shadow-md text-center w-60">
      <div className="text-blue-600 text-4xl mb-4">{icon}</div>
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      <p>{desc}</p>
    </motion.div>
  );
} 