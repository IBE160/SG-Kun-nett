// server/index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import mammoth from "mammoth";
import { z } from "zod";
const pdf = (await import('pdf-parse')).default; // Corrected import for pdf-parse

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.get("/api/health", (req, res) => res.json({ status: "ok" }));

// --- File upload config (memory, no disk storage)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 8 * 1024 * 1024 }, // 8 MB
});

// --- Helpers: text extraction
async function extractTextFromFile(file) {
  if (!file) return "";

  const name = (file.originalname || "").toLowerCase();
  const mime = (file.mimetype || "").toLowerCase();

  // TXT
  if (mime.includes("text/plain") || name.endsWith(".txt")) {
    return file.buffer.toString("utf-8");
  }

  // PDF
  if (mime.includes("pdf") || name.endsWith(".pdf")) {
    const data = await pdf(file.buffer);
    return data.text || "";
  }

  // DOCX
  if (
    mime.includes("officedocument.wordprocessingml.document") ||
    name.endsWith(".docx")
  ) {
    const result = await mammoth.extractRawText({ buffer: file.buffer });
    return result.value || "";
  }

  throw new Error(`Unsupported file type: ${file.originalname}`);
}

// --- AI: provider switch
async function callAI({ cvText, jobText, tone = "professional", language = "Norwegian" }) {
  const provider = (process.env.AI_PROVIDER || "openai").toLowerCase();

  const schema = {
    type: "object",
    additionalProperties: false,
    properties: {
      coverLetter: { type: "string" },
      jobKeywords: { type: "array", items: { type: "string" } },
      cvKeywords: { type: "array", items: { type: "string" } },
      missingQualifications: { type: "array", items: { type: "string" } },
      improvementSuggestions: { type: "array", items: { type: "string" } },
      matchSummary: { type: "string" }
    },
    required: [
      "coverLetter",
      "jobKeywords",
      "cvKeywords",
      "missingQualifications",
      "improvementSuggestions",
      "matchSummary"
    ]
  };

  const prompt = `
You are an assistant for students writing job applications.

TASK:
Given CV text and job posting text, produce:
1) A tailored cover letter
2) Keywords extracted from the job posting
3) Keywords extracted from the CV
4) Missing or weak qualifications (gap analysis)
5) Concrete improvement suggestions
6) A short match summary

OUTPUT RULES:
- Output MUST be valid JSON only (no markdown, no commentary).
- Follow this JSON Schema strictly:
${JSON.stringify(schema, null, 2)}

CONSTRAINTS:
- Language: ${language}
- Tone: ${tone}
- Be realistic and do not invent experience not present in CV.
- Keep cover letter 200–350 words.

INPUTS:
CV_TEXT:
"""${cvText}"""

JOB_TEXT:
"""${jobText}"""
`.trim();

  if (provider === "openai") {
    const { default: OpenAI } = await import("openai");
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const model = process.env.OPENAI_MODEL || "gpt-4o-mini";
    const resp = await client.chat.completions.create({
      model,
      messages: [
        { role: "system", content: "You output only strict JSON." },
        { role: "user", content: prompt }
      ],
      temperature: 0.4
    });

    return resp.choices?.[0]?.message?.content || "";
  }

  if (provider === "gemini") {
    const { GoogleGenerativeAI } = await import("@google/generative-ai");
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const modelName = process.env.GEMINI_MODEL || "gemini-1.5-flash";
    const model = genAI.getGenerativeModel({ model: modelName });

    const result = await model.generateContent(prompt);
    return result.response.text();
  }

  throw new Error(`Unknown AI_PROVIDER: ${provider}`);
}

// --- Validate JSON output
const OutputSchema = z.object({
  coverLetter: z.string(),
  jobKeywords: z.array(z.string()),
  cvKeywords: z.array(z.string()),
  missingQualifications: z.array(z.string()),
  improvementSuggestions: z.array(z.string()),
  matchSummary: z.string()
});

function safeJsonParse(text) {
  // Many models return trailing spaces/newlines; sometimes wrap JSON in ```json ... ```
  const cleaned = String(text)
    .trim()
    .replace(/^```json/i, "")
    .replace(/^```/i, "")
    .replace(/```$/i, "")
    .trim();

  return JSON.parse(cleaned);
}

// --- MVP endpoint: upload + analyze + generate
app.post(
  "/api/analyze",
  upload.fields([
    { name: "cv", maxCount: 1 },
    { name: "job", maxCount: 1 }
  ]),
  async (req, res) => {
    try {
      const cvFile = req.files?.cv?.[0];
      const jobFile = req.files?.job?.[0];

      const tone = req.body?.tone || "professional";
      const language = req.body?.language || "Norwegian";

      if (!cvFile || !jobFile) {
        return res.status(400).json({ error: "Both CV and job files are required." });
      }

      const cvText = (await extractTextFromFile(cvFile)).trim();
      const jobText = (await extractTextFromFile(jobFile)).trim();

      if (cvText.length < 50 || jobText.length < 50) {
        return res.status(400).json({
          error:
            "Extracted text is too short. Make sure the PDF/DOCX contains selectable text (not scanned images)."
        });
      }

      const raw = await callAI({ cvText, jobText, tone, language });

      let parsed;
      try {
        parsed = safeJsonParse(raw);
      } catch {
        return res.status(500).json({
          error: "AI did not return valid JSON. Try again or reduce input size.",
          rawPreview: raw.slice(0, 400)
        });
      }

      const validated = OutputSchema.parse(parsed);

      res.json({
        success: true,
        ...validated,
        meta: {
          cvChars: cvText.length,
          jobChars: jobText.length
        }
      });
    } catch (err) {
      res.status(500).json({ error: err.message || String(err) });
    }
  }
);

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});