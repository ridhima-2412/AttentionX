import { motion } from 'framer-motion';
import { Play, Download, Edit, Star } from 'lucide-react';

export default function ClipCard({ clip, onPreview, onDownload, onEdit }) {
  return (
    <motion.div
      className="card-glass"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative mb-4 rounded-lg overflow-hidden">
        {clip.videoUrl ? (
          <video
            src={clip.videoUrl}
            className="w-full h-48 object-cover rounded-lg"
            muted
            playsInline
            preload="metadata"
          />
        ) : (
          <img
            src={clip.thumbnail}
            alt={clip.title}
            className="w-full h-48 object-cover rounded-lg"
          />
        )}
        <button
          type="button"
          onClick={() => onPreview(clip)}
          className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-lg"
        >
          <Play className="w-12 h-12 text-white" />
        </button>
        <div className="absolute top-2 right-2 bg-primary/90 text-white px-2 py-1 rounded-full text-sm flex items-center space-x-1">
          <Star className="w-4 h-4" />
          <span>{clip.viralScore}</span>
        </div>
      </div>

      <h3 className="text-lg font-semibold mb-2">{clip.title}</h3>
      <p className="text-gray-300 text-sm mb-2">Duration: {clip.duration}</p>
      <p className="text-gray-400 text-xs mb-4">{clip.description}</p>

      <div className="flex space-x-2">
        <motion.button
          onClick={() => onPreview(clip)}
          className="flex-1 btn-secondary text-sm py-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Play className="w-4 h-4 inline mr-1" />
          Preview
        </motion.button>
        <motion.button
          onClick={() => onDownload(clip)}
          className="flex-1 btn-primary text-sm py-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Download className="w-4 h-4 inline mr-1" />
          Download
        </motion.button>
        <motion.button
          onClick={() => onEdit(clip)}
          className="btn-secondary p-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Edit className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  );
}