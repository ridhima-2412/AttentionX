export default function ExportPage({ setPage }) {
  return (
    <div className="page">
      <h1>Export Ready</h1>
      <p>Vertical reel with captions and hook title generated.</p>

      <button onClick={() => setPage("home")}>Back Home</button>
    </div>
  );
}
