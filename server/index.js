import express from "express";
import cors from "cors";
import multer from "multer";
import "dotenv/config";

import { extractText } from "./lib/extractText.js";
import { generateMcqsFromText } from "./lib/geminiClient.js";
import { validateMcqs } from "./lib/validateMcqs.js";
import { AppError } from "./lib/errors.js";

const app = express();

const PORT = 3001;

// =====================================================
// MIDDLEWARE
// =====================================================

app.use(cors());
app.use(express.json());

// =====================================================
// FILE UPLOAD
// =====================================================

const upload = multer({
  storage: multer.memoryStorage(),

  limits: {
    fileSize: 20 * 1024 * 1024,
  },
});

// =====================================================
// TEST ROUTE
// =====================================================

app.get("/", (req, res) => {
  res.json({
    message: "StatSkill AI backend is running 🚀",
  });
});

// =====================================================
// CHAT ROUTE
// =====================================================

app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        error: "MESSAGE_REQUIRED",
        message: "Please provide a message.",
      });
    }

    const { GoogleGenAI } = await import("@google/genai");

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const interaction = await ai.interactions.create({
      model: "gemini-3.6-flash",

      system_instruction: `
You are StatSkill AI, an educational AI assistant.

You are part of the StatSkill AI learning platform.

Help students with:
- Statistics
- Data analysis
- Sampling
- Probability
- Programming
- Learning modules
- Competency gaps
- Quizzes
- Study planning
- General academic questions

Give clear, beginner-friendly answers.

If the user asks a technical question, explain it step by step.

Keep answers useful and reasonably concise.

Do not pretend to know a student's personal progress unless that information
has actually been provided to you.
`,

      input: message,
    });

    return res.json({
      reply: interaction.output_text,
    });
  } catch (error) {
    console.error("Gemini error:", error);

    return res.status(500).json({
      error: "GEMINI_API_ERROR",
      message:
        error?.message || "Something went wrong while connecting to Gemini.",
    });
  }
});

// =====================================================
// MCQ GENERATOR ROUTE
// =====================================================

app.post("/api/generate-mcqs", upload.single("file"), async (req, res) => {
  try {
    // =================================================
    // CHECK FILE
    // =================================================

    if (!req.file) {
      throw new AppError(400, "NO_FILE", "Please upload a PDF or DOCX file.");
    }

    // =================================================
    // READ GENERATION SETTINGS
    // =================================================

    const questionCount = Number(req.body.questionCount || 5);

    const difficulty = req.body.difficulty || "Mixed";

    // =================================================
    // VALIDATE QUESTION COUNT
    // =================================================

    const allowedCounts = [5, 10, 15];

    if (!allowedCounts.includes(questionCount)) {
      throw new AppError(
        400,
        "INVALID_QUESTION_COUNT",
        "Question count must be 5, 10, or 15.",
      );
    }

    // =================================================
    // VALIDATE DIFFICULTY
    // =================================================

    const allowedDifficulties = ["Mixed", "Easy", "Medium", "Hard"];

    if (!allowedDifficulties.includes(difficulty)) {
      throw new AppError(
        400,
        "INVALID_DIFFICULTY",
        "Invalid difficulty level.",
      );
    }

    // =================================================
    // EXTRACT TEXT
    // =================================================

    const extracted = await extractText(req.file);

    console.log(
      `Extracted ${extracted.originalLength} characters from ${req.file.originalname}`,
    );

    // =================================================
    // GENERATE MCQs WITH GEMINI
    // =================================================

    const aiResponse = await generateMcqsFromText({
      text: extracted.text,
      questionCount,
      difficulty,
    });

    // =================================================
    // VALIDATE AI RESPONSE
    // =================================================

    const questions = validateMcqs(aiResponse, {
      expectedCount: questionCount,
      requestedDifficulty: difficulty,
    });

    // =================================================
    // RETURN RESPONSE
    // =================================================

    return res.json({
      questions,
      sourceFile: req.file.originalname,
      truncated: extracted.truncated,
    });
  } catch (error) {
    console.error("MCQ generation error:", error);

    // ===============================================
    // KNOWN APPLICATION ERROR
    // ===============================================

    if (error instanceof AppError) {
      return res.status(error.status).json({
        error: error.code,
        message: error.message,
      });
    }

    // ===============================================
    // UNKNOWN ERROR
    // ===============================================

    return res.status(500).json({
      error: "MCQ_GENERATION_ERROR",
      message: error?.message || "Could not generate MCQs from this document.",
    });
  }
});

// =====================================================
// START SERVER
// =====================================================

app.listen(PORT, () => {
  console.log(`StatSkill AI backend listening on http://localhost:${PORT}`);
});
