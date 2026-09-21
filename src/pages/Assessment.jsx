import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Briefcase,
  CheckCircle2,
} from 'lucide-react'

import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import ProgressBar from '../components/ui/ProgressBar'

import { assessmentQuestions } from '../data/assessmentQuestions'
import { useAppData } from '../hooks/useAppData.jsx'
import { useToast } from '../hooks/useToast.jsx'

// =========================================================
// JOB ROLES
// =========================================================

const jobRoles = [
  {
    id: 'web-developer',
    title: 'Web Developer',
    description:
      'HTML, CSS, JavaScript, React, APIs and web development',
  },

  {
    id: 'data-analyst',
    title: 'Data Analyst',
    description:
      'SQL, Python, statistics, data analysis and visualization',
  },

  {
    id: 'software-developer',
    title: 'Software Developer',
    description:
      'Programming, algorithms, data structures and software development',
  },

  {
    id: 'ai-ml-engineer',
    title: 'AI / ML Engineer',
    description:
      'Artificial intelligence, machine learning and Python',
  },

  {
    id: 'database-developer',
    title: 'Database Developer',
    description:
      'SQL, databases, queries and database management',
  },
]

// =========================================================
// MAIN COMPONENT
// =========================================================

export default function Assessment() {
  const navigate = useNavigate()

  const { submitAssessment } = useAppData()
  const { notify } = useToast()

  // =======================================================
  // STATE
  // =======================================================

  const [started, setStarted] = useState(false)

  const [selectedRole, setSelectedRole] = useState('')

  const [currentIndex, setCurrentIndex] = useState(0)

  const [answers, setAnswers] = useState({})

  const [submitting, setSubmitting] = useState(false)

  // =======================================================
  // ROLE-SPECIFIC QUESTIONS
  // =======================================================

  const roleQuestions = useMemo(() => {
    if (!selectedRole) {
      return []
    }

    return assessmentQuestions.filter((question) => {
      // question.role
      if (question.role === selectedRole) {
        return true
      }

      // question.roles
      if (
        Array.isArray(question.roles) &&
        question.roles.includes(selectedRole)
      ) {
        return true
      }

      return false
    })
  }, [selectedRole])

  // =======================================================
  // CURRENT QUESTION
  // =======================================================

  const total = roleQuestions.length

  const question = roleQuestions[currentIndex]

  // =======================================================
  // ANSWER COUNT
  // =======================================================

  const answeredCount = roleQuestions.filter(
    (q) =>
      answers[q.id] !== undefined &&
      answers[q.id] !== null
  ).length

  const percentComplete =
    total > 0
      ? Math.round((answeredCount / total) * 100)
      : 0

  // =======================================================
  // SELECT ANSWER
  // =======================================================

  const selectAnswer = (optionIndex) => {
    if (!question) {
      return
    }

    setAnswers((prev) => ({
      ...prev,
      [question.id]: optionIndex,
    }))
  }

  // =======================================================
  // NEXT
  // =======================================================

  const goNext = () => {
    if (!question) {
      return
    }

    setCurrentIndex((index) =>
      Math.min(index + 1, total - 1)
    )
  }

  // =======================================================
  // PREVIOUS
  // =======================================================

  const goPrev = () => {
    setCurrentIndex((index) =>
      Math.max(index - 1, 0)
    )
  }

  // =======================================================
  // START ASSESSMENT
  // =======================================================

  const handleStartAssessment = () => {
    if (!selectedRole) {
      notify(
        'Please select your job role first.',
        {
          type: 'error',
        }
      )

      return
    }

    if (roleQuestions.length === 0) {
      notify(
        'No assessment questions are available for this role yet.',
        {
          type: 'error',
        }
      )

      return
    }

    // Reset previous answers
    setAnswers({})

    setCurrentIndex(0)

    setStarted(true)
  }

  // =======================================================
  // SUBMIT ASSESSMENT
  // =======================================================

  const handleSubmit = async () => {
    if (!selectedRole) {
      notify(
        'Please select a job role.',
        {
          type: 'error',
        }
      )

      return
    }

    if (!roleQuestions.length) {
      notify(
        'No questions available for this role.',
        {
          type: 'error',
        }
      )

      return
    }

    // =====================================================
    // CHECK ALL QUESTIONS ANSWERED
    // =====================================================

    const unansweredQuestions =
      roleQuestions.filter(
        (q) =>
          answers[q.id] === undefined ||
          answers[q.id] === null
      )

    if (unansweredQuestions.length > 0) {
      notify(
        `Please answer all ${total} questions before submitting.`,
        {
          type: 'error',
        }
      )

      return
    }

    setSubmitting(true)

    try {
      // ===================================================
      // CREATE ANSWER LOG
      // ===================================================

      const answerLog = roleQuestions.map((q) => {
  const selectedAnswer = Number(answers[q.id])

  const scoreMap = {
    0: 25,
    1: 50,
    2: 75,
    3: 100,
  }

  const score = scoreMap[selectedAnswer] || 0

  return {
    questionId: q.id,
    competencyId: q.competencyId,
    correct: selectedAnswer >= 2,
    score: (Number(answers[q.id]) + 1) * 25,
    role: selectedRole,
  }
})

      // ===================================================
      // DEBUG
      // ===================================================

      console.log(
        '========================================'
      )

      console.log(
        'ASSESSMENT SUBMISSION'
      )

      console.log(
        'Selected Role:',
        selectedRole
      )

      console.log(
        'Total Questions:',
        total
      )

      console.log(
        'Answered Questions:',
        answeredCount
      )

      console.log(
        'Answers:',
        answers
      )

      console.log(
        'Answer Log:',
        answerLog
      )

      console.log(
        '========================================'
      )

      // ===================================================
      // SUBMIT
      // ===================================================

      const analysis =
        await submitAssessment(
          answerLog,
          selectedRole
        )

      // ===================================================
      // DEBUG ANALYSIS
      // ===================================================

      console.log(
        '========================================'
      )

      console.log(
        'ASSESSMENT ANALYSIS'
      )

      console.log(
        analysis
      )

      console.log(
        '========================================'
      )

      // ===================================================
      // SUCCESS
      // ===================================================

      notify(
        'Assessment submitted. Your competency analysis is ready.',
        {
          type: 'success',
        }
      )

      // ===================================================
      // GO TO COMPETENCY PAGE
      // ===================================================

      navigate('/competency-gaps')

    } catch (error) {
      console.error(
        'Assessment submission failed:',
        error
      )

      notify(
        error?.message ||
          'Something went wrong while submitting the assessment.',
        {
          type: 'error',
        }
      )

    } finally {
      setSubmitting(false)
    }
  }

  // =========================================================
  // ROLE SELECTION SCREEN
  // =========================================================

  if (!started) {
    return (
      <div className="mx-auto max-w-3xl">

        <Card>

          {/* HEADER */}

          <div className="text-center">

            <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-navy-50 text-navy-700">

              <ClipboardCheck className="h-6 w-6" />

            </span>

            <h2 className="font-display text-xl font-semibold text-ink-900 sm:text-2xl">

              Competency Assessment

            </h2>

            <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-ink-700/70">

              Before starting the assessment, tell us about
              the job role you are preparing for. Your questions
              will be personalized according to your selected role.

            </p>

          </div>

          {/* ROLE SELECTION */}

          <div className="mt-8">

            <div className="mb-3 flex items-center gap-2">

              <Briefcase className="h-4 w-4 text-navy-600" />

              <h3 className="text-sm font-semibold text-ink-900">

                Select your job role

              </h3>

            </div>

            <div className="grid gap-3 sm:grid-cols-2">

              {jobRoles.map((role) => {

                const selected =
                  selectedRole === role.id

                return (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() =>
                      setSelectedRole(role.id)
                    }
                    className={`rounded-lg border p-4 text-left transition-all ${
                      selected
                        ? 'border-navy-600 bg-navy-50 ring-1 ring-navy-500'
                        : 'border-navy-200 bg-white hover:border-navy-400 hover:bg-navy-50/50'
                    }`}
                  >

                    <div className="flex items-start justify-between gap-3">

                      <div>

                        <h4 className="text-sm font-semibold text-ink-900">

                          {role.title}

                        </h4>

                        <p className="mt-1 text-xs leading-relaxed text-ink-700/60">

                          {role.description}

                        </p>

                      </div>

                      {selected && (

                        <CheckCircle2 className="h-5 w-5 shrink-0 text-navy-600" />

                      )}

                    </div>

                  </button>
                )
              })}

            </div>

          </div>

          {/* SELECTED ROLE INFO */}

          {selectedRole && (

            <div className="mt-5 rounded-lg bg-navy-50 p-4">

              <p className="text-xs text-ink-700/60">

                Selected role

              </p>

              <p className="mt-1 text-sm font-semibold text-navy-800">

                {
                  jobRoles.find(
                    (role) =>
                      role.id === selectedRole
                  )?.title
                }

              </p>

              <p className="mt-1 text-xs text-ink-700/60">

                {roleQuestions.length} role-specific questions available

              </p>

            </div>

          )}

          {/* START BUTTON */}

          <div className="mt-6 flex justify-center">

            <Button
              onClick={
                handleStartAssessment
              }
              disabled={!selectedRole}
              icon={ClipboardCheck}
            >

              Start personalized assessment

            </Button>

          </div>

        </Card>

      </div>
    )
  }

  // =========================================================
  // SAFETY CHECK
  // =========================================================

  if (!question) {
    return (
      <Card className="mx-auto max-w-2xl text-center">

        <h2 className="text-lg font-semibold text-ink-900">

          No questions available

        </h2>

        <p className="mt-2 text-sm text-ink-700/70">

          There are currently no questions available
          for the selected job role.

        </p>

        <Button
          className="mt-5"
          variant="secondary"
          onClick={() =>
            setStarted(false)
          }
        >

          Choose another role

        </Button>

      </Card>
    )
  }

  // =========================================================
  // ASSESSMENT QUESTION SCREEN
  // =========================================================

  return (
    <div className="mx-auto max-w-2xl space-y-5">

      {/* ROLE HEADER */}

      <div className="rounded-lg border border-navy-200 bg-navy-50 px-4 py-3">

        <div className="flex items-center justify-between gap-3">

          <div>

            <p className="text-xs text-ink-700/60">

              Assessment for

            </p>

            <p className="text-sm font-semibold text-navy-800">

              {
                jobRoles.find(
                  (role) =>
                    role.id === selectedRole
                )?.title
              }

            </p>

          </div>

          <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-navy-700">

            {total} questions

          </span>

        </div>

      </div>

      {/* PROGRESS */}

      <ProgressBar
        value={percentComplete}
        label={`${answeredCount} of ${total} answered`}
        tone="neutral"
      />

      {/* QUESTION CARD */}

      <Card>

        <p className="mb-1 text-xs font-medium uppercase tracking-wide text-navy-500">

          Question {currentIndex + 1} of {total}

        </p>

        <h3 className="mb-5 text-lg font-medium leading-snug text-ink-900">

          {question.question}

        </h3>

        {/* OPTIONS */}

        <div className="space-y-2.5">

          {question.options.map(
            (option, index) => {

              const selected =
                Number(answers[question.id]) ===
                Number(index)

              return (

                <button
                  key={index}
                  type="button"
                  onClick={() =>
                    selectAnswer(index)
                  }
                  className={`flex w-full items-center justify-between rounded-md border px-4 py-3 text-left text-sm transition-colors ${
                    selected
                      ? 'border-navy-600 bg-navy-50 ring-1 ring-navy-500'
                      : 'border-navy-200 hover:border-navy-400 hover:bg-navy-50'
                  }`}
                >

                  <span className="text-ink-900">

                    {option}

                  </span>

                  {selected && (

                    <CheckCircle2 className="h-4 w-4 shrink-0 text-navy-600" />

                  )}

                </button>

              )
            }
          )}

        </div>

        {/* NAVIGATION */}

        <div className="mt-6 flex items-center justify-between">

          <Button
            variant="ghost"
            icon={ChevronLeft}
            onClick={goPrev}
            disabled={currentIndex === 0}
          >

            Previous

          </Button>

          {currentIndex === total - 1 ? (

            <Button
              onClick={handleSubmit}
              loading={submitting}
              disabled={answeredCount < total}
            >

              Submit assessment

            </Button>

          ) : (

            <Button
              icon={ChevronRight}
              iconPosition="right"
              onClick={goNext}
              disabled={
                answers[question.id] === undefined ||
                answers[question.id] === null
              }
            >

              Next

            </Button>

          )}

        </div>

      </Card>

      {/* INCOMPLETE WARNING */}

      {currentIndex === total - 1 &&
        answeredCount < total && (

          <p className="text-center text-xs text-rust-500">

            Answer all {total} questions before
            submitting ({answeredCount}/{total} answered).

          </p>

        )}

    </div>
  )
}