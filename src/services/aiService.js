// aiService.js

import { competencyList, getCompetencyLevel } from "../data/competencies";

import { quizBank, quizTopics } from "../data/quizBank";

// =========================================================
// API BASE URL
// =========================================================

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

// =========================================================
// HELPERS
// =========================================================

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// =========================================================
// ROLE → RELEVANT COMPETENCIES
// =========================================================

const roleCompetencies = {
  "web-developer": ["programming", "web-development", "database"],

  "data-analyst": [
    "programming",
    "database",
    "data-analysis",
    "statistics",
    "data-visualization",
  ],

  "software-developer": ["programming", "database", "web-development"],

  "ai-ml-engineer": [
    "programming",
    "data-analysis",
    "statistics",
    "artificial-intelligence",
  ],

  "database-developer": ["programming", "database"],
};

// =========================================================
// COMPETENCY GAP ANALYSIS
// =========================================================

export async function analyzeCompetencyGaps(answerLog = [], role = "") {
  // Small delay to simulate AI processing.
  await delay(500);

  // =======================================================
  // FIND RELEVANT COMPETENCIES FOR SELECTED ROLE
  // =======================================================

  const relevantCompetencies =
    roleCompetencies[role] || competencyList.map((competency) => competency.id);

  // =======================================================
  // GROUP ANSWERS BY COMPETENCY
  // =======================================================

  const competencyScores = {};

  for (const answer of answerLog) {
    if (!answer || !answer.competencyId) {
      continue;
    }

    const competencyId = answer.competencyId;

    // Only process competencies relevant to selected role.
    if (!relevantCompetencies.includes(competencyId)) {
      continue;
    }

    // Create competency entry if it does not exist.
    if (!competencyScores[competencyId]) {
      competencyScores[competencyId] = {
        totalScore: 0,
        questionCount: 0,
      };
    }

    // =====================================================
    // GET SCORE
    // =====================================================

    let questionScore = 0;

    
    if (typeof answer.selectedIndex === "number") {
      const selectedIndex = Number(answer.selectedIndex);

      questionScore = (selectedIndex + 1) * 25;
    }

    // -----------------------------------------------------
    // SCORE FALLBACK
    // -----------------------------------------------------
    else if (typeof answer.score === "number") {
      questionScore = Number(answer.score);
    }

    // -----------------------------------------------------
    // OLD FORMAT FALLBACK
    // -----------------------------------------------------
    
    else if (typeof answer.correct === "boolean") {
      questionScore = answer.correct ? 100 : 25;
    }

    // Safety check.
    if (questionScore < 0 || questionScore > 100) {
      questionScore = 0;
    }

    // =====================================================
    // ADD SCORE
    // =====================================================

    competencyScores[competencyId].totalScore += questionScore;
    competencyScores[competencyId].questionCount += 1;
  }

  // =======================================================
  // CREATE SKILL SCORES
  // =======================================================

  const skillScores = competencyList
    .filter((competency) => relevantCompetencies.includes(competency.id))
    .map((competency) => {
      const stat = competencyScores[competency.id];

      let score = 0;

      if (stat && stat.questionCount > 0) {
        score = Math.round(stat.totalScore / stat.questionCount);
      }

      return {
        ...competency,
        score,
        ...getCompetencyLevel(score),
      };
    });

  // =======================================================
  // SORT LOWEST → HIGHEST
  // =======================================================

  const sortedSkills = [...skillScores].sort((a, b) => a.score - b.score);

  // =======================================================
  // PRIORITY GAPS
  // =======================================================
  

  const gaps = sortedSkills.filter((skill) => skill.score < 70).slice(0, 3);

  // =======================================================
  // STRENGTHS
  // =======================================================
  
  const strengths = [...skillScores]
    .sort((a, b) => b.score - a.score)
    .filter((skill) => skill.score >= 75)
    .slice(0, 3);

  // =======================================================
  // OVERALL SCORE
  // =======================================================

  const overallScore =
    skillScores.length > 0
      ? Math.round(
          skillScores.reduce((sum, skill) => sum + skill.score, 0) /
            skillScores.length,
        )
      : 0;

  // =======================================================
  // AI-STYLE NARRATIVE
  // =======================================================

  let narrative = "";

  if (gaps.length > 0) {
    const gapNames = gaps.map((gap) => gap.name).join(", ");

    narrative =
      `Your main competency gaps are ${gapNames}. ` +
      `Focus on these areas first to improve your readiness for the selected ${
        role || "career"
      } role.`;
  } else if (strengths.length > 0) {
    narrative =
      "You have a strong competency foundation for your selected career role. " +
      "Continue developing advanced concepts and practical project experience.";
  } else {
    narrative =
      "Complete the assessment questions to build your personalized competency profile.";
  }

  // =======================================================
  // RETURN ANALYSIS
  // =======================================================

  return {
    role,
    overallScore,
    skillScores,
    strengths,
    gaps,
    narrative,
  };
}

// =========================================================
// PERSONALIZED LEARNING RECOMMENDATIONS
// =========================================================



export async function getRecommendations(skillScores = [], allModules = []) {
  await delay(700);

  const scoreByCompetency = Object.fromEntries(
    skillScores.map((skill) => [skill.id, skill.score]),
  );

  return allModules
    .map((module) => ({
      ...module,
      gapScore: scoreByCompetency[module.competencyId] ?? 60,
    }))
    .sort((a, b) => a.gapScore - b.gapScore);
}

// =========================================================
// MOCK MCQ GENERATOR
// =========================================================
//


async function generateMcqsMock({
  fileName,
  questionCount = 5,
  difficulty = "Mixed",
}) {
  await delay(1200);

  // Combine all quiz topics.
  const pool = quizTopics.flatMap((topic) => quizBank[topic] || []);

  // =======================================================
  // FILTER DIFFICULTY
  // =======================================================

  const filtered =
    difficulty === "Mixed"
      ? pool
      : pool.filter((question) => question.difficulty === difficulty);

  
  const usable = filtered.length >= questionCount ? filtered : pool;

  // =======================================================
  // SHUFFLE
  // =======================================================

  const shuffled = [...usable].sort(() => Math.random() - 0.5);

  // =======================================================
  // SELECT QUESTIONS
  // =======================================================

  const selected = shuffled.slice(0, Math.min(questionCount, shuffled.length));

  // =======================================================
  // FORMAT QUESTIONS
  // =======================================================

  return selected.map((question, index) => ({
    id: `gen-${index + 1}`,
    ...question,
    sourceFile: fileName,
  }));
}

// =========================================================
// REAL BACKEND MCQ GENERATOR
// =========================================================

async function generateMcqsFromBackend({ file, questionCount, difficulty }) {
  const formData = new FormData();

  // Add uploaded file.
  formData.append("file", file);

  // Add question count.
  formData.append("questionCount", String(questionCount));

  // Add difficulty.
  formData.append("difficulty", difficulty);

  let response;

  // =======================================================
  // SEND REQUEST
  // =======================================================

  try {
    response = await fetch(`${API_BASE_URL}/api/generate-mcqs`, {
      method: "POST",
      body: formData,
    });
  } catch (networkErr) {
    const error = new Error(
      "Could not reach the AI Quiz Generator backend. Is the server running?",
    );

    error.code = "BACKEND_UNREACHABLE";
    error.cause = networkErr;

    throw error;
  }

  // =======================================================
  // READ JSON RESPONSE
  // =======================================================

  let payload = null;

  try {
    payload = await response.json();
  } catch {
    // Backend returned something other than JSON.
  }

  // =======================================================
  // BACKEND ERROR
  // =======================================================

  if (!response.ok) {
    const error = new Error(
      payload?.message ||
        "The AI Quiz Generator could not process this document. Please try again.",
    );

    error.code = payload?.error || "BACKEND_ERROR";

    throw error;
  }

  // =======================================================
  // INVALID RESPONSE
  // =======================================================

  if (!payload || !Array.isArray(payload.questions)) {
    const error = new Error(
      "The AI Quiz Generator returned an unexpected response.",
    );

    error.code = "BAD_RESPONSE";

    throw error;
  }

  // =======================================================
  // FORMAT QUESTIONS
  // =======================================================

  return payload.questions.map((question, index) => ({
    id: `gen-${index + 1}`,
    ...question,
    sourceFile: file.name,
  }));
}

// =========================================================
// PUBLIC MCQ GENERATOR
// =========================================================


export async function generateMcqs({
  file,
  fileName,
  questionCount = 5,
  difficulty = "Mixed",
}) {
  // =======================================================
  // NO FILE
  // =======================================================

  if (!file) {
    return generateMcqsMock({
      fileName,
      questionCount,
      difficulty,
    });
  }

  // =======================================================
  // REAL BACKEND
  // =======================================================

  try {
    return await generateMcqsFromBackend({
      file,
      questionCount,
      difficulty,
    });
  } catch (error) {
    // =====================================================
    // BACKEND NOT RUNNING
    // =====================================================

    if (error.code === "BACKEND_UNREACHABLE") {
      console.warn(
        "[aiService] Backend unreachable, falling back to sample questions:",
        error,
      );

      return generateMcqsMock({
        fileName: fileName ?? file.name,
        questionCount,
        difficulty,
      });
    }

    // =====================================================
    // REAL ERROR
    // =====================================================

    throw error;
  }
}
