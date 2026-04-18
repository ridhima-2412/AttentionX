import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Edit, Palette, Type, ArrowLeft, Check } from 'lucide-react';

const captionStyles = [
  { id: 'modern', name: 'Modern', preview: 'Clean and minimal design' },
  { id: 'vintage', name: 'Vintage', preview: 'Retro film look' },
  { id: 'neon', name: 'Neon', preview: 'Bright cyberpunk style' },
  { id: 'minimal', name: 'Minimal', preview: 'Simple black and white' }
];

const hookTitles = [
  "You won't believe what happened next...",
  "This changed everything for me",
  "The secret they don't want you to know",
  "Watch till the end for the twist",
  "This is blowing up right now"
];

export default function ExportPage({ setPage }) {
  const [selectedStyle, setSelectedStyle] = useState('modern');
  const [customTitle, setCustomTitle] = useState('');
  const [selectedHook, setSelectedHook] = useState(hookTitles[0]);
  const [exporting, setExporting] = useState(false);

  const handleExport = () => {
    setExporting(true);
    // Simulate export process
    setTimeout(() => {
      setExporting(false);
      alert('Reel exported successfully! 🎉');
      setPage('home');
    }, 3000);
  };

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <button
            onClick={() => setPage('results')}
            className="btn-secondary mb-4"
          >
            <ArrowLeft className="w-4 h-4 inline mr-2" />
            Back to Results
          </button>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Customize Your Reel
          </h1>
          <p className="text-xl text-gray-300">
            Add the perfect finishing touches before export
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Preview Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="glass p-6 sticky top-24">
              <h2 className="text-2xl font-semibold mb-6 flex items-center">
                <Edit className="w-6 h-6 mr-2" />
                Preview
              </h2>

              <div className="aspect-[9/16] bg-black rounded-lg overflow-hidden mb-6 relative">
                <img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=600&fit=crop"
                  alt="Reel preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <div className="text-white">
                    <h3 className="font-bold text-lg mb-1">
                      {customTitle || selectedHook}
                    </h3>
                    <p className="text-sm opacity-90">
                      Amazing productivity hack that changed my life forever! 💪
                    </p>
                  </div>
                </div>
                <div className="absolute top-4 right-4 bg-primary/90 text-white px-2 py-1 rounded-full text-xs font-semibold">
                  {selectedStyle.toUpperCase()}
                </div>
              </div>

              <div className="text-center">
                <button
                  onClick={handleExport}
                  disabled={exporting}
                  className="btn-primary text-lg px-8 py-4 w-full disabled:opacity-50"
                >
                  {exporting ? (
                    <>
                      <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full inline mr-2"></div>
                      Exporting...
                    </>
                  ) : (
                    <>
                      <Download className="w-5 h-5 inline mr-2" />
                      Download Final Reel
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>

          {/* Customization Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="space-y-8"
          >
            {/* Hook Title */}
            <div className="glass p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Type className="w-5 h-5 mr-2" />
                Hook Title
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Custom Title (Optional)</label>
                  <input
                    type="text"
                    value={customTitle}
                    onChange={(e) => setCustomTitle(e.target.value)}
                    placeholder="Enter your own hook title..."
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Or Choose a Template</label>
                  <div className="space-y-2">
                    {hookTitles.map((hook, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setSelectedHook(hook);
                          setCustomTitle('');
                        }}
                        className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                          selectedHook === hook && !customTitle
                            ? 'bg-primary/20 border border-primary'
                            : 'bg-white/5 hover:bg-white/10 border border-white/10'
                        }`}
                      >
                        {hook}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Caption Style */}
            <div className="glass p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Palette className="w-5 h-5 mr-2" />
                Caption Style
              </h3>

              <div className="grid grid-cols-2 gap-3">
                {captionStyles.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => setSelectedStyle(style.id)}
                    className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                      selectedStyle === style.id
                        ? 'border-primary bg-primary/10'
                        : 'border-white/20 bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    <div className="text-center">
                      <div className={`w-8 h-8 rounded-full mx-auto mb-2 ${
                        style.id === 'modern' ? 'bg-blue-500' :
                        style.id === 'vintage' ? 'bg-amber-600' :
                        style.id === 'neon' ? 'bg-pink-500' : 'bg-gray-700'
                      }`}></div>
                      <h4 className="font-semibold text-sm">{style.name}</h4>
                      <p className="text-xs text-gray-400 mt-1">{style.preview}</p>
                      {selectedStyle === style.id && (
                        <Check className="w-4 h-4 text-primary mx-auto mt-2" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Export Settings */}
            <div className="glass p-6">
              <h3 className="text-xl font-semibold mb-4">Export Settings</h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Include Watermark</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <span>Auto-add Hashtags</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <span>Background Music</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
