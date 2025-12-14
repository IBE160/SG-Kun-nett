import { useState } from "react";

export default function App() {
  const [cvFile, setCvFile] = useState(null);
  const [jobFile, setJobFile] = useState(null);
  const [tone, setTone] = useState("professional");
  const [language, setLanguage] = useState("Norwegian");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState(null);

  const submit = async () => {
    setLoading(true);
    setError("");
    setData(null);

    try {
      if (!cvFile || !jobFile) throw new Error("Velg både CV og stillingsannonse.");

      const form = new FormData();
      form.append("cv", cvFile);
      form.append("job", jobFile);
      form.append("tone", tone);
      form.append("language", language);

      const res = await fetch("http://localhost:5000/api/analyze", {
        method: "POST",
        body: form
      });

      const payload = await res.json();
      if (!res.ok) throw new Error(payload.error || "Ukjent feil");

      setData(payload);
    } catch (e) {
      setError(e.message || String(e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 900, margin: "2rem auto", padding: "0 1rem" }}>
      <h1>AI CV & Job Application Assistant (MVP)</h1>

      <div style={{ display: "grid", gap: "1rem", marginTop: "1rem" }}>
        <div>
          <label><b>Last opp CV</b> (PDF/DOCX/TXT)</label>
          <input type="file" accept=".pdf,.docx,.txt" onChange={(e) => setCvFile(e.target.files?.[0] || null)} />
        </div>

        <div>
          <label><b>Last opp stillingsannonse</b> (PDF/DOCX/TXT)</label>
          <input type="file" accept=".pdf,.docx,.txt" onChange={(e) => setJobFile(e.target.files?.[0] || null)} />
        </div>

        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <label>
            <b>Tone</b>{" "}
            <select value={tone} onChange={(e) => setTone(e.target.value)}>
              <option value="professional">Professional</option>
              <option value="friendly">Friendly</option>
              <option value="formal">Formal</option>
              <option value="confident">Confident</option>
            </select>
          </label>

          <label>
            <b>Språk</b>{" "}
            <select value={language} onChange={(e) => setLanguage(e.target.value)}>
              <option value="Norwegian">Norsk</option>
              <option value="English">English</option>
            </select>
          </label>
        </div>

        <button onClick={submit} disabled={loading}>
          {loading ? "Analyserer..." : "Generer søknad + gap-analyse"}
        </button>

        {error && (
          <pre style={{ background: "#fee", padding: "1rem", borderRadius: 8 }}>
            FEIL: {error}
          </pre>
        )}

        {data && (
          <div style={{ display: "grid", gap: "1rem" }}>
            <div style={{ background: "#111", color: "#fff", padding: "1rem", borderRadius: 8 }}>
              <h2 style={{ marginTop: 0 }}>Generert søknad</h2>
              <pre style={{ whiteSpace: "pre-wrap" }}>{data.coverLetter}</pre>
            </div>

            <div style={{ background: "#f4f4f4", padding: "1rem", borderRadius: 8 }}>
              <h3>Match summary</h3>
              <p>{data.matchSummary}</p>
            </div>

            <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "1fr 1fr" }}>
              <div style={{ background: "#f4f4f4", padding: "1rem", borderRadius: 8 }}>
                <h3>Jobb-keywords</h3>
                <ul>{data.jobKeywords.map((k) => <li key={k}>{k}</li>)}</ul>
              </div>

              <div style={{ background: "#f4f4f4", padding: "1" }}>
                <h3>CV-keywords</h3>
                <ul>{data.cvKeywords.map((k) => <li key={k}>{k}</li>)}</ul>
              </div>
            </div>

            <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "1fr 1fr" }}>
              <div style={{ background: "#fff3cd", padding: "1rem", borderRadius: 8 }}>
                <h3>Manglende/svake kvalifikasjoner</h3>
                <ul>{data.missingQualifications.map((g) => <li key={g}>{g}</li>)}</ul>
              </div>

              <div style={{ background: "#d1e7dd", padding: "1rem", borderRadius: 8 }}>
                <h3>Forbedringsforslag</h3>
                <ul>{data.improvementSuggestions.map((s) => <li key={s}>{s}</li>)}</ul>
              </div>
            </div>

            <small>Meta: CV chars {data.meta?.cvChars} | Job chars {data.meta?.jobChars}</small>
          </div>
        )}
      </div>
    </div>
  );
}