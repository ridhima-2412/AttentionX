export default function Processing({ setPage }) {
  return (
    <div className="page">
      <h1>Processing...</h1>
      <p>Analyzing speech...</p>
      <p>Detecting emotional peaks...</p>
      <p>Generating captions...</p>
      <button onClick={() => setPage("results")}>See Results</button>
    </div>
  );
}
