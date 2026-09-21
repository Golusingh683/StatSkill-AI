import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  ChevronLeft,
  ChevronRight,
  Flag,
  BookOpenCheck,
  CheckCircle2,
} from 'lucide-react'

import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import ProgressBar from '../components/ui/ProgressBar'
import QuizQuestionCmp from '../components/ui/QuizQuestion'
import EmptyState from '../components/ui/EmptyState'
import { useAppData } from '../hooks/useAppData.jsx'

export default function Quiz() {
  const {
    activeQuiz,
    finishQuiz,
    clearActiveQuiz,
  } = useAppData()

  const navigate = useNavigate()

  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false)

  // =========================================================
  // NO ACTIVE QUIZ
  // =========================================================

  if (!activeQuiz || !activeQuiz.questions?.length) {
    return (
      <EmptyState
        icon={BookOpenCheck}
        title="No quiz in progress"
        description="Pick a quiz from the library, or generate one with AI from your own material."
        action={
          <Link to="/quizzes">
            <Button size="sm">
              Browse quizzes
            </Button>
          </Link>
        }
      />
    )
  }

  // =========================================================
  // QUIZ DATA
  // =========================================================

  const {
    title,
    topic,
    questions,
    competencyId,
  } = activeQuiz

  const total = questions.length

  const question = questions[currentIndex]

  const answeredCount =
    Object.keys(answers).length

  const unansweredCount =
    total - answeredCount

  const progress =
    Math.round(
      ((currentIndex + 1) / total) * 100
    )

  // =========================================================
  // SELECT ANSWER
  // =========================================================

  const selectAnswer = (optionIndex) => {
    setAnswers((prev) => ({
      ...prev,
      [currentIndex]: optionIndex,
    }))
  }

  // =========================================================
  // NEXT
  // =========================================================

  const goNext = () => {
    setCurrentIndex((index) =>
      Math.min(index + 1, total - 1)
    )
  }

  // =========================================================
  // PREVIOUS
  // =========================================================

  const goPrev = () => {
    setCurrentIndex((index) =>
      Math.max(index - 1, 0)
    )
  }

  // =========================================================
  // GO TO QUESTION
  // =========================================================

  const goToQuestion = (index) => {
    setCurrentIndex(index)
  }

  // =========================================================
  // OPEN SUBMIT CONFIRMATION
  // =========================================================

  const handleSubmitClick = () => {
    if (answeredCount < total) {
      return
    }

    setShowSubmitConfirm(true)
  }

  // =========================================================
  // FINAL SUBMIT
  // =========================================================

  const handleSubmit = () => {
    let score = 0

    const userAnswers = questions.map(
      (q, index) => {
        const selected =
          answers[index]

        const correct =
          selected === q.correctIndex

        if (correct) {
          score += 1
        }

        return {
          ...q,
          selectedIndex: selected,
          correct,
        }
      }
    )

    // =======================================================
    // SAVE QUIZ RESULT
    // =======================================================

    finishQuiz({
      title,
      topic,
      questions: userAnswers,
      userAnswers,
      score,
      total,
      competencyId,
    })

    // =======================================================
    // CLEAR CURRENT QUIZ
    // =======================================================

    clearActiveQuiz()

    // =======================================================
    // GO TO RESULT PAGE
    // =======================================================

    navigate('/quiz-results')
  }

  // =========================================================
  // CANCEL SUBMIT
  // =========================================================

  const cancelSubmit = () => {
    setShowSubmitConfirm(false)
  }

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div className="mx-auto max-w-3xl space-y-5">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h2 className="font-display text-lg font-semibold text-ink-900 sm:text-xl">
            {title}
          </h2>

          {topic && (
            <p className="mt-0.5 text-xs text-ink-700/60">
              {topic}
            </p>
          )}
        </div>

        <span className="flex items-center gap-1 text-xs text-ink-700/50">
          <Flag className="h-3.5 w-3.5" />

          {answeredCount}/{total} answered
        </span>

      </div>


      {/* =====================================================
          PROGRESS
      ===================================================== */}

      <div>

        <div className="mb-1.5 flex items-center justify-between text-xs text-ink-700/60">

          <span>
            Question {currentIndex + 1} of {total}
          </span>

          <span>
            {progress}%
          </span>

        </div>

        <ProgressBar
          value={progress}
          showValue={false}
        />

      </div>


      {/* =====================================================
          QUESTION NAVIGATION
      ===================================================== */}

      <Card>

        <div className="mb-5">

          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-ink-700/50">
            Question navigation
          </p>

          <div className="flex flex-wrap gap-2">

            {questions.map((_, index) => {

              const isCurrent =
                index === currentIndex

              const isAnswered =
                answers[index] !== undefined

              return (
                <button
                  key={index}
                  type="button"
                  onClick={() =>
                    goToQuestion(index)
                  }
                  className={`
                    flex h-8 w-8 items-center justify-center
                    rounded-md border text-xs font-medium
                    transition
                    ${
                      isCurrent
                        ? 'border-navy-700 bg-navy-700 text-white'
                        : isAnswered
                        ? 'border-moss-300 bg-moss-50 text-moss-700'
                        : 'border-navy-100 bg-white text-ink-700/60 hover:border-navy-300'
                    }
                  `}
                  aria-label={`Go to question ${index + 1}`}
                >
                  {isAnswered ? (
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  ) : (
                    index + 1
                  )}
                </button>
              )
            })}

          </div>

        </div>


        {/* ===================================================
            QUESTION
        =================================================== */}

        <QuizQuestionCmp
          question={question}
          index={currentIndex}
          total={total}
          selectedIndex={answers[currentIndex]}
          onSelect={selectAnswer}
        />


        {/* ===================================================
            NAVIGATION BUTTONS
        =================================================== */}

        <div className="mt-6 flex items-center justify-between gap-3">

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
              onClick={handleSubmitClick}
              disabled={answeredCount < total}
            >
              Submit quiz
            </Button>

          ) : (

            <Button
              icon={ChevronRight}
              iconPosition="right"
              onClick={goNext}
            >
              Next
            </Button>

          )}

        </div>

      </Card>


      {/* =====================================================
          INCOMPLETE WARNING
      ===================================================== */}

      {currentIndex === total - 1 &&
        unansweredCount > 0 && (

          <p className="text-center text-xs text-rust-500">
            Answer all {total} questions before
            submitting. {unansweredCount} question
            {unansweredCount > 1 ? 's are' : ' is'} still
            unanswered.
          </p>

        )}


      {/* =====================================================
          SUBMIT CONFIRMATION
      ===================================================== */}

      {showSubmitConfirm && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">

            <div className="mb-4 flex items-center gap-3">

              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-moss-50 text-moss-700">

                <CheckCircle2 className="h-5 w-5" />

              </span>

              <div>

                <h3 className="text-base font-semibold text-ink-900">
                  Submit quiz?
                </h3>

                <p className="text-xs text-ink-700/60">
                  You have answered all {total} questions.
                </p>

              </div>

            </div>


            <div className="rounded-lg bg-navy-50 p-4">

              <div className="flex items-center justify-between text-sm">

                <span className="text-ink-700/60">
                  Questions answered
                </span>

                <span className="font-semibold text-ink-900">
                  {answeredCount}/{total}
                </span>

              </div>

            </div>


            <p className="mt-4 text-sm leading-relaxed text-ink-700/70">
              Once you submit, your answers will be
              evaluated and your result will be saved
              in quiz history.
            </p>


            <div className="mt-5 flex justify-end gap-2">

              <Button
                variant="secondary"
                onClick={cancelSubmit}
              >
                Continue quiz
              </Button>

              <Button
                onClick={handleSubmit}
              >
                Submit quiz
              </Button>

            </div>

          </div>

        </div>

      )}

    </div>
  )
}