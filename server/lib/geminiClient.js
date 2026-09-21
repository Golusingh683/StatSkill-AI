// geminiClient.js
// -----------------------------------------------------------------------
// Thin wrapper around the Gemini API for MCQ generation. Keeps the
// prompt, JSON schema, and error mapping in one place so index.js stays
// focused on HTTP concerns.
// -----------------------------------------------------------------------

import { GoogleGenAI } from '@google/genai'
import { AppError } from './errors.js'

const MODEL_NAME = process.env.GEMINI_MODEL || 'gemini-3.6-flash'

let client = null
function getClient() {
  if (!process.env.GEMINI_API_KEY) {
    throw new AppError(
      500,
      'MISSING_API_KEY',
      'The server is not configured with a Gemini API key.'
    )
  }
  if (!client) {
    client = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })
  }
  return client
}

// Structured output schema -- asking Gemini to conform to this directly
// (responseMimeType + responseSchema) is far more reliable than asking
// for JSON in the prompt text alone.
const RESPONSE_SCHEMA = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      question: { type: 'string' },
      options: {
        type: 'array',
        items: { type: 'string' },
        minItems: 4,
        maxItems: 4,
      },
      correctIndex: { type: 'integer', minimum: 0, maximum: 3 },
      explanation: { type: 'string' },
      topic: { type: 'string' },
      difficulty: { type: 'string', enum: ['Easy', 'Medium', 'Hard'] },
    },
    required: ['question', 'options', 'correctIndex', 'explanation', 'topic', 'difficulty'],
  },
}

function buildPrompt({ text, questionCount, difficulty }) {
  const difficultyInstruction =
    difficulty === 'Mixed'
      ? 'Vary the difficulty across Easy, Medium and Hard so the set is a balanced mix.'
      : `Every question must be "${difficulty}" difficulty.`

  return `You are an assessment designer creating multiple-choice questions (MCQs) for officials of India's Official Statistical System, based strictly on the SOURCE MATERIAL below.

Rules:
- Generate exactly ${questionCount} MCQs.
- Base every question ONLY on facts, concepts, or explanations present in the SOURCE MATERIAL. Do not introduce outside facts.
- ${difficultyInstruction}
- Each question must have exactly 4 answer options, with exactly one correct answer.
- "correctIndex" is the zero-based index (0-3) of the correct option.
- "explanation" should briefly justify the correct answer using the source material.
- "topic" should be a short label (2-4 words) for the sub-topic the question covers, drawn from the material.
- Do not repeat the same question twice.
- Return ONLY the JSON array. No markdown, no commentary, no code fences.

SOURCE MATERIAL:
"""
${text}
"""`
}

export async function generateMcqsFromText({ text, questionCount, difficulty }) {
  const ai = getClient()
  const prompt = buildPrompt({ text, questionCount, difficulty })

  let response
  try {
    response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: RESPONSE_SCHEMA,
        temperature: 0.4,
      },
    })
  } catch (err) {
    throw new AppError(
      502,
      'GEMINI_API_ERROR',
      'The AI service could not process this request right now. Please try again in a moment.',
      err
    )
  }

  const rawText = response?.text
  if (!rawText) {
    throw new AppError(502, 'EMPTY_AI_RESPONSE', 'The AI service returned an empty response.')
  }

  return rawText
}

export { MODEL_NAME }
