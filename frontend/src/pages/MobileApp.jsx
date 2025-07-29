import { FaBell, FaHistory, FaFileAlt } from "react-icons/fa";
import { motion } from "framer-motion";

export default function MobileApp() {
  return (
    <div className="max-w-4xl mx-auto py-10">
      <h2 className="text-3xl font-bold text-center mb-8">Mobile App Features</h2>
      <div className="flex flex-col md:flex-row gap-10 items-center justify-center">
        <motion.div whileHover={{ scale: 1.05 }} className="bg-blue-50 p-6 rounded-lg shadow-md text-center w-72">
          <div className="text-blue-600 text-4xl mb-4"><FaHistory /></div>
          <h3 className="font-bold text-xl mb-2">Attendance History</h3>
          <p>View your attendance records anytime, anywhere.</p>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} className="bg-blue-50 p-6 rounded-lg shadow-md text-center w-72">
          <div className="text-blue-600 text-4xl mb-4"><FaBell /></div>
          <h3 className="font-bold text-xl mb-2">Instant Alerts</h3>
          <p>Get notified for absences, late marks, and more.</p>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} className="bg-blue-50 p-6 rounded-lg shadow-md text-center w-72">
          <div className="text-blue-600 text-4xl mb-4"><FaFileAlt /></div>
          <h3 className="font-bold text-xl mb-2">Reports On The Go</h3>
          <p>Download and share attendance reports from your phone.</p>
        </motion.div>
      </div>
      <div className="mt-10 text-center">
        <img src="/mobile-app-mockup.png" alt="Mobile App Mockup" className="mx-auto w-60 rounded shadow" />
      </div>
    </div>
  );
} 