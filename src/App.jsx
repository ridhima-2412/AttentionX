import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Upload from "./pages/Upload";
import Processing from "./pages/Processing";
import Results from "./pages/Results";
import ExportPage from "./pages/Export";

export default function App() {
  const [currentView, setCurrentView] = useState("home");
  const [videoUrl, setVideoUrl] = useState(null);
  const [activeClip, setActiveClip] = useState(null);

  useEffect(() => {
    // Smooth scroll to top when the visible page changes.
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  useEffect(() => {
    return () => {
      if (videoUrl) {
        URL.revokeObjectURL(videoUrl);
      }
    };
  }, [videoUrl]);

  const renderView = () => {
    switch (currentView) {
      case "upload":
        return <Upload setPage={setCurrentView} setVideoUrl={setVideoUrl} />;
      case "processing":
        return <Processing setPage={setCurrentView} />;
      case "results":
        return <Results setPage={setCurrentView} videoUrl={videoUrl} setSelectedClip={setActiveClip} />;
      case "export":
        return <ExportPage setPage={setCurrentView} videoUrl={videoUrl} selectedClip={activeClip} />;
      default:
        return <Home setPage={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen gradient-bg">
      <Navbar setPage={setCurrentView} />
      <main className="pt-16">
        {renderView()}
      </main>
    </div>
  );
}
