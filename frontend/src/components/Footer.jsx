export default function Footer() {
  return (
    <footer className="bg-blue-600 text-white py-6 mt-10">
      <div className="max-w-7xl mx-auto text-center">
        &copy; {new Date().getFullYear()} Smart Attendance Tracking System. All rights reserved.
      </div>
    </footer>
  );
} 