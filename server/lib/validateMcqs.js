// validateMcqs.js
// -----------------------------------------------------------------------
// Validates and sanitizes the JSON array Gemini returns, so a malformed
// or partially-wrong model response can never reach the frontend. Throws
// AppError(502, 'INVALID_AI_RESPONSE', ...) on any structural problem.
// -----------------------------------------------------------------------

import { AppError } from './errors.js'

const ALLOWED_DIFFICULTIES = new Set(['Easy', 'Medium', 'Hard'])

function invalid(reason) {
  throw new AppError(
    502,
    'INVALID_AI_RESPONSE',
    `The AI response could not be used to build a quiz (${reason}). Please try again.`
  )
}

export function validateMcqs(payload, { expectedCount, requestedDifficulty }) {
  let parsed = payload

  if (typeof payload === 'string') {
    try {
      parsed = JSON.parse(payload)
    } catch {
      invalid('response was not valid JSON')
    }
  }

  if (!Array.isArray(parsed)) invalid('response was not a JSON array')
  if (parsed.length === 0) invalid('response contained no questions')

  const cleaned = parsed.map((item, i) => {
    if (typeof item !== 'object' || item === null) invalid(`item ${i} was not an object`)

    const { question, options, correctIndex, explanation, topic, difficulty } = item

    if (typeof question !== 'string' || !question.trim()) {
      invalid(`item ${i} is missing a valid "question"`)
    }
    if (!Array.isArray(options) || options.length !== 4 || options.some((o) => typeof o !== 'string' || !o.trim())) {
      invalid(`item ${i} does not have exactly 4 valid "options"`)
    }
    if (!Number.isInteger(correctIndex) || correctIndex < 0 || correctIndex > 3) {
      invalid(`item ${i} has an invalid "correctIndex"`)
    }
    if (typeof explanation !== 'string' || !explanation.trim()) {
      invalid(`item ${i} is missing a valid "explanation"`)
    }
    if (typeof topic !== 'string' || !topic.trim()) {
      invalid(`item ${i} is missing a valid "topic"`)
    }
    const safeDifficulty = ALLOWED_DIFFICULTIES.has(difficulty)
      ? difficulty
      : requestedDifficulty !== 'Mixed'
        ? requestedDifficulty
        : 'Medium'

    return {
      question: question.trim(),
      options: options.map((o) => o.trim()),
      correctIndex,
      explanation: explanation.trim(),
      topic: topic.trim(),
      difficulty: safeDifficulty,
    }
  })

  // Gemini can sometimes return more or fewer than requested; trim to the
  // requested count if we have enough, otherwise return what's valid.
  return expectedCount ? cleaned.slice(0, expectedCount) : cleaned
}
