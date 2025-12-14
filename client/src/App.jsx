import { useState } from "react";

export default function App() {
  const [cv, setCv] = useState("");
  const [job, setJob] = useState("");
  const [result, setResult] = useState("");

  const generate = async () => {
    const res = await fetch("http://localhost:5001/api/generate", { // Changed port to 5001
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cv, job })
    });
    const data = await res.json();
    setResult(data.coverLetter);
  };

  return (
    <div style={{ maxWidth: 800, margin: "2rem auto" }}>
      <h1>AI CV Assistant (MVP)</h1>

      <textarea
        placeholder="Lim inn CV"
        value={cv}
        onChange={e => setCv(e.target.value)}
        rows={6}
        style={{ width: "100%" }}
      />

      <textarea
        placeholder="Lim inn stillingsannonse"
        value={job}
        onChange={e => setJob(e.target.value)}
        rows={6}
        style={{ width: "100%", marginTop: "1rem" }}
      />

      <button onClick={generate} style={{ marginTop: "1rem" }}>
        Generer søknad
      </button>

      {result && (
        <pre style={{ marginTop: "1rem", background: "#111", color: "#fff", padding: "1rem" }}>
          {result}
        </pre>
      )}
    </div>
  );
}