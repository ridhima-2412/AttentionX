import { useState } from 'react';
import { motion } from 'framer-motion';
import ClipCard from '../components/ClipCard';
import Modal from '../components/Modal';
import { ArrowLeft, Download, Share } from 'lucide-react';

// Dummy data for generated clips
const generatedClips = [
  {
    id: 1,
    title: "The Ultimate Productivity Hack",
    duration: "0:32",
    viralScore: 95,
    thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=600&fit=crop",
    videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    description: "High-energy moment about productivity tips",
    platform: "instagram"
  },
  {
    id: 2,
    title: "When Life Gets Tough",
    duration: "0:28",
    viralScore: 87,
    thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop",
    videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    description: "Emotional peak about overcoming challenges",
    platform: "tiktok"
  },
  {
    id: 3,
    title: "Quick Success Story",
    duration: "0:45",
    viralScore: 92,
    thumbnail: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=600&fit=crop",
    videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    description: "Inspiring story about achieving goals",
    platform: "youtube"
  },
  {
    id: 4,
    title: "Mind-Blowing Fact",
    duration: "0:19",
    viralScore: 89,
    thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=600&fit=crop",
    videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    description: "Shocking statistic that went viral",
    platform: "instagram"
  },
  {
    id: 5,
    title: "Funny Moment",
    duration: "0:24",
    viralScore: 91,
    thumbnail: "https://images.unsplash.com/photo-1541532713592-79a0317b6b77?w=400&h=600&fit=crop",
    videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    description: "Hilarious reaction that got millions of views",
    platform: "tiktok"
  }
];

export default function Results({ setPage, videoUrl, selectedClip: appSelectedClip, setSelectedClip }) {
  const [previewClip, setPreviewClip] = useState(null);
  const [previewModal, setPreviewModal] = useState(false);

  const displayedClips = generatedClips.map((clip, index) => ({
    ...clip,
    thumbnail: videoUrl || clip.thumbnail,
    videoUrl: videoUrl || clip.videoUrl,
    title: videoUrl ? `Reel clip ${index + 1}` : clip.title,
  }));

  const handlePreview = (clip) => {
    setPreviewClip(clip);
    setPreviewModal(true);
    if (setSelectedClip) {
      setSelectedClip(clip);
    }
  };

  const handleDownload = (clip) => {
    // Simulate download
    alert(`Downloading ${clip.title}...`);
  };

  const handleEdit = (clip) => {
    if (setSelectedClip) {
      setSelectedClip(clip);
    }
    setPage('export');
  };

  const handleExportAll = () => {
    if (setSelectedClip) {
      setSelectedClip(null);
    }
    setPage('export');
  };

  return (
    <div className="min-h-screen py-20 pt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Your Viral Clips Are Ready!
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            AI generated {generatedClips.length} high-potential reels from your video
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <motion.button
              onClick={handleExportAll}
              className="btn-primary text-lg px-8 py-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download className="w-5 h-5 inline mr-2" />
              Export All Reels
            </motion.button>
            <motion.button
              onClick={() => setPage('upload')}
              className="btn-secondary text-lg px-8 py-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="w-5 h-5 inline mr-2" />
              Upload Another Video
            </motion.button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="glass p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">{generatedClips.length}</div>
            <div className="text-gray-300">Clips Generated</div>
          </div>
          <div className="glass p-6 text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">
              {Math.round(generatedClips.reduce((sum, clip) => sum + clip.viralScore, 0) / generatedClips.length)}
            </div>
            <div className="text-gray-300">Avg Viral Score</div>
          </div>
          <div className="glass p-6 text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">
              {generatedClips.reduce((sum, clip) => sum + parseInt(clip.duration.split(':')[1]), 0)}
            </div>
            <div className="text-gray-300">Total Duration (sec)</div>
          </div>
        </motion.div>

        {/* Clips Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {displayedClips.map((clip, index) => (
            <motion.div
              key={clip.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <ClipCard
                clip={clip}
                onPreview={handlePreview}
                onDownload={handleDownload}
                onEdit={handleEdit}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Preview Modal */}
        <Modal
          isOpen={previewModal}
          onClose={() => setPreviewModal(false)}
          title={previewClip?.title || "Preview"}
        >
          {previewClip && (
            <div className="space-y-4">
              <div className="aspect-[9/16] bg-black rounded-lg overflow-hidden relative">
                {previewClip.videoUrl ? (
                  <video
                    controls
                    src={previewClip.videoUrl}
                    poster={previewClip.thumbnail}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={previewClip.thumbnail}
                    alt={previewClip.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{previewClip.title}</h3>
                  <p className="text-sm text-gray-400">{previewClip.description}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleDownload(previewClip)}
                    className="btn-primary text-sm px-4 py-2"
                  >
                    <Download className="w-4 h-4 inline mr-1" />
                    Download
                  </button>
                  <button
                    onClick={() => {
                      setPreviewModal(false);
                      handleEdit(previewClip);
                    }}
                    className="btn-secondary text-sm px-4 py-2"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
}
