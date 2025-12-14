import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.post("/api/generate", (req, res) => {
  const { cv, job } = req.body;

  res.json({
    coverLetter: `Dette er en MVP-søknad basert på CV og stillingsannonse.
CV-lengde: ${cv?.length || 0}
Job-lengde: ${job?.length || 0}`
  });
});

app.listen(PORT, () =>
  console.log(`Backend kjører på http://localhost:${PORT}`)
);