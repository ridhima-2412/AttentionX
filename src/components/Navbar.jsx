import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

export default function Navbar({ setPage }) {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 w-full z-50 glass backdrop-blur-md border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div
            className="flex items-center space-x-2 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            onClick={() => setPage("home")}
          >
            <Zap className="w-8 h-8 text-primary" />
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
              AttentionX
            </span>
          </motion.div>

          <div className="hidden md:flex space-x-8">
            <button
              onClick={() => setPage("home")}
              className="text-gray-300 hover:text-white transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => setPage("upload")}
              className="btn-primary"
            >
              Get Started
            </button>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setPage("upload")}
              className="btn-primary"
            >
              Start
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
