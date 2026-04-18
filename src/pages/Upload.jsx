export default function Upload({ setPage }) {
  return (
    <div className="page">
      <h1>Upload Your Video</h1>
      <div className="upload-box">
        Drag & Drop Video Here
      </div>
      <button onClick={() => setPage("processing")}>Generate Clips</button>
    </div>
  );
}
