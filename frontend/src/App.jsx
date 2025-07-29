import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import WebcamDemo from "./pages/WebcamDemo";
import MobileApp from "./pages/MobileApp";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import RegisterUser from "./pages/RegisterUser";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/webcam-demo" element={<WebcamDemo />} />
        <Route path="/mobile-app" element={<MobileApp />} />
        <Route path="/register" element={<RegisterUser />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
export default App; 