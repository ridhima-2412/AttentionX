import Card from "../components/Card";

export default function Home({ setPage }) {
  return (
    <div className="page">
      <h1>Turn Long Videos into Viral Shorts</h1>
      <p>Upload podcasts, lectures, and workshops. AI creates reels instantly.</p>

      <button onClick={() => setPage("upload")}>Upload Video</button>

      <div className="grid">
        <Card title="Find Best Moments" text="Detect emotional peaks automatically." />
        <Card title="Smart Crop" text="Convert wide videos into vertical reels." />
        <Card title="Dynamic Captions" text="Generate subtitles and hook headlines." />
      </div>
    </div>
  );
}
