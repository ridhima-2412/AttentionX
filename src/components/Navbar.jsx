export default function Navbar({ setPage }) {
  return (
    <nav className="navbar">
      <h2 onClick={() => setPage("home")}>AttentionX</h2>
      <button onClick={() => setPage("upload")}>Get Started</button>
    </nav>
  );
}
