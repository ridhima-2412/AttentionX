import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Upload from "./pages/Upload";
import Processing from "./pages/Processing";
import Results from "./pages/Results";
import ExportPage from "./pages/Export";

export default function App() {
  const [page, setPage] = useState("home");
  const [videoUrl, setVideoUrl] = useState(null);
  const [selectedClip, setSelectedClip] = useState(null);

  useEffect(() => {
    // Smooth scroll to top on page change
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  useEffect(() => {
    return () => {
      if (videoUrl) {
        URL.revokeObjectURL(videoUrl);
      }
    };
  }, [videoUrl]);

  const renderPage = () => {
    switch (page) {
      case "upload":
        return <Upload setPage={setPage} setVideoUrl={setVideoUrl} />;
      case "processing":
        return <Processing setPage={setPage} />;
      case "results":
        return <Results setPage={setPage} videoUrl={videoUrl} selectedClip={selectedClip} setSelectedClip={setSelectedClip} />;
      case "export":
        return <ExportPage setPage={setPage} videoUrl={videoUrl} selectedClip={selectedClip} />;
      default:
        return <Home setPage={setPage} />;
    }
  };

  return (
    <div className="min-h-screen gradient-bg">
      <Navbar setPage={setPage} />
      <main className="pt-16">
        {renderPage()}
      </main>
    </div>
  );
}
