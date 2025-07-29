import { motion } from "framer-motion";

export default function FeatureCard({ icon, title, desc }) {
  return (
    <motion.div whileHover={{ scale: 1.05 }} className="bg-blue-50 p-6 rounded-lg shadow-md text-center">
      <div className="text-blue-600 text-4xl mb-4">{icon}</div>
      <h3 className="font-bold text-xl mb-2">{title}</h3>
      <p>{desc}</p>
    </motion.div>
  );
} 