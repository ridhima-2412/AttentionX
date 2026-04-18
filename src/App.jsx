import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Upload from "./pages/Upload";
import Processing from "./pages/Processing";
import Results from "./pages/Results";
import ExportPage from "./pages/Export";

export default function App() {
  const [page, setPage] = useState("home");

  useEffect(() => {
    // Smooth scroll to top on page change
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  const renderPage = () => {
    switch (page) {
      case "upload":
        return <Upload setPage={setPage} />;
      case "processing":
        return <Processing setPage={setPage} />;
      case "results":
        return <Results setPage={setPage} />;
      case "export":
        return <ExportPage setPage={setPage} />;
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
      <Footer />
    </div>
  );
}
