export default function Results({ setPage }) {
  return (
    <div className="page">
      <h1>Generated Clips</h1>

      <div className="card">
        <h3>Clip 1</h3>
        <p>Motivation Peak - 00:32</p>
      </div>

      <div className="card">
        <h3>Clip 2</h3>
        <p>Funny Moment - 12:10</p>
      </div>

      <button onClick={() => setPage("export")}>Export Reel</button>
    </div>
  );
}
