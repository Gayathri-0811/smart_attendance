import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-blue-600 font-bold text-2xl">SmartAttendance</Link>
        <div className="space-x-6">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <Link to="/dashboard" className="hover:text-blue-600">Dashboard</Link>
          <Link to="/webcam-demo" className="hover:text-blue-600">Webcam Demo</Link>
          <Link to="/mobile-app" className="hover:text-blue-600">Mobile App</Link>
          <Link to="/register" className="hover:text-blue-600">Register</Link>
        </div>
      </div>
    </nav>
  );
} 