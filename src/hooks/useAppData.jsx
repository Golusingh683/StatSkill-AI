import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

import { analyzeCompetencyGaps } from '../services/aiService'
import { recentQuizScores as mockRecentScores } from '../data/progress'
import { getCompetencyLevel } from '../data/competencies'
import { resolveQuizCompetencyId } from '../data/topicCompetencyMap'

// App-wide data store.
// Frontend-only for now.
// Data is stored in localStorage so it survives page refresh.

const STORAGE_KEY = 'statskill_app_data'

const AppDataContext = createContext(null)

// =========================================================
// INITIAL DATA
// =========================================================

function loadInitial() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)

    if (raw) {
      const parsed = JSON.parse(raw)

      return {
        assessment: {
          completed: parsed.assessment?.completed || false,
          role: parsed.assessment?.role || null,
          answerLog: parsed.assessment?.answerLog || null,
          analysis: parsed.assessment?.analysis || null,
          completedAt: parsed.assessment?.completedAt || null,

          // First assessment snapshot used for Before vs After comparison.
          baselineAnalysis:
            parsed.assessment?.baselineAnalysis || null,

          baselineCompletedAt:
            parsed.assessment?.baselineCompletedAt || null,

          // Number of assessments completed.
          assessmentAttempts:
            parsed.assessment?.assessmentAttempts || 0,
        },

        quizHistory: parsed.quizHistory || mockRecentScores,
      }
    }
  } catch (error) {
    console.error('Failed to load app data:', error)
  }

  // First-time application state.
  return {
    assessment: {
      completed: false,
      role: null,
      answerLog: null,
      analysis: null,
      completedAt: null,
      baselineAnalysis: null,
      baselineCompletedAt: null,
      assessmentAttempts: 0,
    },

    quizHistory: mockRecentScores.map((quiz) => ({
      ...quiz,
      id: quiz.id,
    })),
  }
}

// =========================================================
// PROVIDER
// =========================================================

export function AppDataProvider({ children }) {
  const [data, setData] = useState(loadInitial)
  const [activeQuiz, setActiveQuizState] = useState(null)
  const [lastQuizResult, setLastQuizResult] = useState(null)

  // =======================================================
  // SAVE DATA TO LOCAL STORAGE
  // =======================================================

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(data)
      )
    } catch (error) {
      console.error('Failed to save app data:', error)
    }
  }, [data])

  // =======================================================
  // SUBMIT ASSESSMENT
  // =======================================================

  const submitAssessment = async (answerLog, role) => {
    try {
      console.log('================================')
      console.log('SUBMITTING ASSESSMENT')
      console.log('ROLE:', role)
      console.log('ANSWER LOG:', answerLog)
      console.log('================================')

      // Safe answer log.
      const safeAnswerLog = Array.isArray(answerLog)
        ? answerLog
        : []

      // Generate AI analysis.
      const analysis = await analyzeCompetencyGaps(
        safeAnswerLog,
        role
      )

      console.log('GENERATED ANALYSIS:', analysis)

      // Save assessment.
      setData((prev) => {
        const previousAssessment = prev.assessment || {}

        const isFirstAssessment =
          !previousAssessment.completed ||
          !previousAssessment.baselineAnalysis

        // The first assessment becomes the permanent
        // "Before Learning" snapshot.
        const baselineAnalysis = isFirstAssessment
          ? analysis
          : previousAssessment.baselineAnalysis

        const baselineCompletedAt = isFirstAssessment
          ? new Date().toISOString()
          : previousAssessment.baselineCompletedAt

        const assessmentAttempts =
          (previousAssessment.assessmentAttempts || 0) + 1

        return {
          ...prev,

          assessment: {
            completed: true,
            role: role || '',
            answerLog: safeAnswerLog,

            analysis: {
              ...analysis,
              role: role || '',
            },

            completedAt: new Date().toISOString(),

            // Before score.
            baselineAnalysis,
            baselineCompletedAt,

            // Number of assessments taken.
            assessmentAttempts,
          },
        }
      })

      return analysis
    } catch (error) {
      console.error('Assessment submission failed:', error)
      throw error
    }
  }

  // =======================================================
  // RECORD QUIZ RESULT
  // =======================================================

  const recordQuizResult = (result) => {
    setData((prev) => ({
      ...prev,

      quizHistory: [
        {
          ...result,
          id: `quiz-${Date.now()}`,
        },
        ...prev.quizHistory,
      ],
    }))
  }

  // =======================================================
  // RESET ASSESSMENT
  // =======================================================

  const resetAssessment = () => {
    setData((prev) => ({
      ...prev,

      assessment: {
        completed: false,
        role: null,
        answerLog: null,
        analysis: null,
        completedAt: null,
        baselineAnalysis: null,
        baselineCompletedAt: null,
        assessmentAttempts: 0,
      },
    }))
  }

  // =======================================================
  // ACTIVE QUIZ
  // =======================================================

  const setActiveQuiz = (quiz) => {
    setActiveQuizState(quiz)
  }

  const clearActiveQuiz = () => {
    setActiveQuizState(null)
  }

  // =======================================================
  // UPDATE COMPETENCY FROM QUIZ
  // =======================================================

  const updateCompetencyFromQuiz = (
    competencyId,
    quizPercentScore
  ) => {
    if (!competencyId) {
      return
    }

    setData((prev) => {
      if (
        !prev.assessment.completed ||
        !prev.assessment.analysis
      ) {
        return prev
      }

      const prevAnalysis = prev.assessment.analysis
      const prevSkillScores = prevAnalysis.skillScores || []

      const targetIndex = prevSkillScores.findIndex(
        (skill) => skill.id === competencyId
      )

      if (targetIndex === -1) {
        return prev
      }

      const oldScore = prevSkillScores[targetIndex].score

      // Blend quiz score.
      const blended = Math.round(
        oldScore * 0.7 + quizPercentScore * 0.3
      )

      const clampedScore = Math.max(
        0,
        Math.min(100, blended)
      )

      // Update skill.
      const updatedSkillScores = prevSkillScores.map(
        (skill, i) =>
          i === targetIndex
            ? {
                ...skill,
                score: clampedScore,
                ...getCompetencyLevel(clampedScore),
              }
            : skill
      )

      // Calculate overall score.
      const overallScore =
        updatedSkillScores.length > 0
          ? Math.round(
              updatedSkillScores.reduce(
                (sum, skill) => sum + skill.score,
                0
              ) / updatedSkillScores.length
            )
          : 0

      // Calculate gaps.
      const gaps = [...updatedSkillScores]
        .sort((a, b) => a.score - b.score)
        .filter((skill) => skill.score < 70)
        .slice(0, 3)

      // Calculate strengths.
      const strengths = [...updatedSkillScores]
        .sort((a, b) => b.score - a.score)
        .filter((skill) => skill.score >= 75)
        .slice(0, 3)

      return {
        ...prev,

        assessment: {
          ...prev.assessment,

          analysis: {
            ...prevAnalysis,
            skillScores: updatedSkillScores,
            overallScore,
            gaps,
            strengths,
          },
        },
      }
    })
  }

  // =======================================================
  // FINISH QUIZ
  // =======================================================

  const finishQuiz = (result) => {
    const competencyId =
      result.competencyId ||
      resolveQuizCompetencyId(result.questions)

    const percentScore =
      result.total > 0
        ? Math.round(
            (result.score / result.total) * 100
          )
        : 0

    const competencyUpdated =
      Boolean(competencyId) &&
      data.assessment.completed

    const withDate = {
      ...result,
      date: new Date().toISOString(),
      competencyId: competencyId || null,
      competencyUpdated,
    }

    setLastQuizResult(withDate)

    recordQuizResult({
      title: result.title,
      topic: result.topic,
      score: result.score,
      total: result.total,
      date: withDate.date,
    })

    if (competencyUpdated) {
      updateCompetencyFromQuiz(
        competencyId,
        percentScore
      )
    }
  }

  // =======================================================
  // BEFORE / AFTER HELPERS
  // =======================================================

  const getBeforeScore = () => {
    return (
      data.assessment?.baselineAnalysis?.overallScore ??
      null
    )
  }

  const getCurrentScore = () => {
    return (
      data.assessment?.analysis?.overallScore ??
      null
    )
  }

  const getScoreImprovement = () => {
    const before = getBeforeScore()
    const current = getCurrentScore()

    if (before === null || current === null) {
      return null
    }

    return current - before
  }

  // =======================================================
  // CONTEXT
  // =======================================================

  return (
    <AppDataContext.Provider
      value={{
        // Main application data.
        ...data,

        // Assessment.
        submitAssessment,
        resetAssessment,

        // Before / After.
        getBeforeScore,
        getCurrentScore,
        getScoreImprovement,

        // Quiz.
        recordQuizResult,
        activeQuiz,
        setActiveQuiz,
        clearActiveQuiz,
        lastQuizResult,
        finishQuiz,
      }}
    >
      {children}
    </AppDataContext.Provider>
  )
}

// =========================================================
// CUSTOM HOOK
// =========================================================

export function useAppData() {
  const ctx = useContext(AppDataContext)

  if (!ctx) {
    throw new Error(
      'useAppData must be used within an AppDataProvider'
    )
  }

  return ctx
}