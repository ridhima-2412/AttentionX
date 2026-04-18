import { motion } from 'framer-motion';

export default function FeatureCard({ icon, title, text }) {
  return (
    <motion.div
      className="card-glass text-center"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-4xl mb-4 text-primary">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-300">{text}</p>
    </motion.div>
  );
}
