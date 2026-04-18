import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Upload from "./pages/Upload";
import Processing from "./pages/Processing";
import Results from "./pages/Results";
import ExportPage from "./pages/Export";

export default function App() {
  const [page, setPage] = useState("home");

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
    <div>
      <Navbar setPage={setPage} />
      {renderPage()}
    </div>
  );
}
