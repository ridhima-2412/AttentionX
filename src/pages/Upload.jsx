import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload as UploadIcon, FileVideo, X, Check, Instagram, Youtube, Music } from 'lucide-react';

const platforms = [
  { id: 'instagram', name: 'Instagram Reels', icon: Instagram, color: 'from-pink-500 to-purple-500' },
  { id: 'tiktok', name: 'TikTok', icon: Music, color: 'from-black to-gray-800' },
  { id: 'youtube', name: 'YouTube Shorts', icon: Youtube, color: 'from-red-500 to-red-600' }
];

export default function Upload({ setPage, setVideoUrl }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      selectVideoFile(e.dataTransfer.files[0]);
    }
  };

  const isVideoFile = (file) => file?.type?.startsWith('video/');

  const selectVideoFile = (file) => {
    if (!isVideoFile(file)) {
      alert('Please select a video file');
      return;
    }

    setSelectedFile(file);
    setVideoUrl(URL.createObjectURL(file));
  };

  const handleFileSelect = (event) => {
    if (event.target.files && event.target.files[0]) {
      selectVideoFile(event.target.files[0]);
    }
  };

  const clearSelection = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setVideoUrl(null);
  };

  const togglePlatformSelection = (platformId) => {
    setSelectedPlatforms((previous) =>
      previous.includes(platformId)
        ? previous.filter((id) => id !== platformId)
        : [...previous, platformId]
    );
  };

  const startUpload = () => {
    if (!selectedFile || selectedPlatforms.length === 0) {
      alert('Please select a file and at least one platform');
      return;
    }

    setUploading(true);

    const interval = setInterval(() => {
      setUploadProgress((progress) => {
        if (progress >= 100) {
          clearInterval(interval);
          setTimeout(() => setPage('processing'), 500);
          return 100;
        }
        return progress + 10;
      });
    }, 200);
  };

  return (
    <div className="min-h-screen py-20 pt-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Upload Your Video
          </h1>
          <p className="text-xl text-gray-300">
            Drop your long-form content and let AI do the magic
          </p>
        </motion.div>

        {/* Upload Area */}
        <motion.div
          className={`relative mb-8 ${dragActive ? 'scale-105' : ''}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {!selectedFile ? (
            <div
              className={`glass p-12 text-center cursor-pointer transition-all duration-300 ${
                dragActive ? 'border-primary border-2' : 'border-dashed border-white/30'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <UploadIcon className="w-16 h-16 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-2">Drop your video here</h3>
              <p className="text-gray-300 mb-4">
                Or click to browse files (MP4, MOV, AVI up to 2GB)
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept="video/*"
                onChange={handleFileSelect}
                className="hidden"
              />
              <button className="btn-primary">
                Choose File
              </button>
            </div>
          ) : (
            <motion.div
              className="glass p-6"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <FileVideo className="w-12 h-12 text-primary" />
                  <div>
                    <h3 className="text-lg font-semibold">{selectedFile.name}</h3>
                    <p className="text-gray-300">
                      {(selectedFile.size / (1024 * 1024)).toFixed(1)} MB
                    </p>
                  </div>
                </div>
                <button
                  onClick={clearSelection}
                  className="text-red-400 hover:text-red-300 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {uploading && (
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Uploading...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <motion.div
                      className="bg-primary h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </motion.div>

        {/* Platform Selection */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Choose Your Platforms
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {platforms.map((platform) => {
              const Icon = platform.icon;
              const isSelected = selectedPlatforms.includes(platform.id);
              return (
                <motion.button
                  key={platform.id}
                  onClick={() => togglePlatformSelection(platform.id)}
                  className={`glass p-6 text-center transition-all duration-300 ${
                    isSelected ? 'ring-2 ring-primary' : ''
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${platform.color} flex items-center justify-center mx-auto mb-3`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-1">{platform.name}</h3>
                  {isSelected && (
                    <Check className="w-5 h-5 text-primary mx-auto" />
                  )}
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Generate Button */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <button
            onClick={startUpload}
            disabled={!selectedFile || selectedPlatforms.length === 0 || uploading}
            className="btn-primary text-lg px-12 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploading ? 'Processing...' : 'Generate Viral Reels'}
          </button>
          <p className="text-gray-400 mt-4">
            {!selectedFile && 'Please select a video file'}
            {selectedFile && selectedPlatforms.length === 0 && 'Please select at least one platform'}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
