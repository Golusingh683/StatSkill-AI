import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CheckCircle2,
  XCircle,
  RotateCcw,
  GraduationCap,
  Trophy,
  TrendingUp,
  ArrowLeft,
  BookOpenCheck,
} from 'lucide-react'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts'

import Card, { CardHeader } from '../components/ui/Card'
import ChartCard from '../components/ui/ChartCard'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import QuizQuestionCmp from '../components/ui/QuizQuestion'
import EmptyState from '../components/ui/EmptyState'

import { useAppData } from '../hooks/useAppData.jsx'


// =========================================================
// MAIN COMPONENT
// =========================================================

export default function QuizResults() {

  const {
    lastQuizResult,
    assessment,
    setActiveQuiz,
  } = useAppData()

  const navigate = useNavigate()


  // =======================================================
  // NO RESULT
  // =======================================================

  if (!lastQuizResult) {

    return (
      <EmptyState
        icon={Trophy}
        title="No recent quiz results"
        description="Take a quiz to see your score and topic-wise performance here."
        action={
          <Link to="/quizzes">
            <Button
              size="sm"
              icon={BookOpenCheck}
            >
              Browse quizzes
            </Button>
          </Link>
        }
      />
    )
  }


  // =======================================================
  // RESULT DATA
  // =======================================================

  const {
    title,
    topic,
    questions = [],
    score = 0,
    total = questions.length,
    competencyId,
    competencyUpdated,
  } = lastQuizResult


  // =======================================================
  // SCORE CALCULATIONS
  // =======================================================

  const percentage =
    total > 0
      ? Math.round((score / total) * 100)
      : 0

  const incorrect =
    questions.filter(
      (question) => !question.correct
    )

  const correctCount =
    questions.filter(
      (question) => question.correct
    ).length

  const answeredCount =
    questions.filter(
      (question) =>
        question.selectedIndex !== undefined &&
        question.selectedIndex !== null
    ).length

  const unansweredCount =
    total - answeredCount


  // =======================================================
  // SCORE TONE
  // =======================================================

  const scoreTone =
    percentage >= 70
      ? 'strong'
      : percentage >= 50
      ? 'moderate'
      : 'weak'


  const scoreMessage =
    percentage >= 70
      ? 'Well done'
      : percentage >= 50
      ? 'Good effort'
      : 'Keep practicing'


  // =======================================================
  // UPDATED COMPETENCY
  // =======================================================

  const updatedCompetency =
    competencyUpdated && competencyId
      ? assessment.analysis?.skillScores?.find(
          (skill) => skill.id === competencyId
        )
      : null


  // =======================================================
  // TOPIC-WISE PERFORMANCE
  // =======================================================

  const byTopic = {}

  questions.forEach((question) => {

    const questionTopic =
      question.topic ||
      topic ||
      'General'

    if (!byTopic[questionTopic]) {

      byTopic[questionTopic] = {
        topic: questionTopic,
        correct: 0,
        total: 0,
      }

    }

    byTopic[questionTopic].total += 1

    if (question.correct) {
      byTopic[questionTopic].correct += 1
    }

  })


  const topicData =
    Object.values(byTopic).map((item) => ({
      topic: item.topic,
      percentage:
        item.total > 0
          ? Math.round(
              (item.correct / item.total) * 100
            )
          : 0,
    }))


  // =======================================================
  // RETRY QUIZ
  // =======================================================

  const handleRetry = () => {

    const freshQuestions =
      questions.map(
        ({
          selectedIndex: _selectedIndex,
          correct: _correct,
          ...question
        }) => question
      )

    setActiveQuiz({
      title,
      topic,
      questions: freshQuestions,
      competencyId,
    })

    navigate('/quiz/retry')
  }


  // =======================================================
  // BACK TO QUIZZES
  // =======================================================

  const handleBackToQuizzes = () => {
    navigate('/quizzes')
  }


  // =======================================================
  // RENDER
  // =======================================================

  return (

    <div className="space-y-6">


      {/* =====================================================
          RESULT SUMMARY
      ===================================================== */}

      <Card className="text-center">

        {/* TROPHY */}

        <span className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-navy-50 text-navy-700">

          <Trophy className="h-6 w-6" />

        </span>


        {/* TITLE */}

        <h2 className="font-display text-xl font-semibold text-ink-900 sm:text-2xl">

          {title} — Results

        </h2>


        <p className="mt-1 text-sm text-ink-700/70">

          Here's how you performed in this quiz.

        </p>


        {/* =================================================
            SCORE GRID
        ================================================= */}

        <div className="mx-auto mt-6 grid max-w-lg grid-cols-3 gap-4">

          {/* SCORE */}

          <div>

            <p className="font-display text-3xl font-semibold text-ink-900">

              {score}/{total}

            </p>

            <p className="text-xs text-ink-700/60">

              Score

            </p>

          </div>


          {/* PERCENTAGE */}

          <div>

            <p className="font-display text-3xl font-semibold text-ink-900">

              {percentage}%

            </p>

            <p className="text-xs text-ink-700/60">

              Percentage

            </p>

          </div>


          {/* PERFORMANCE */}

          <div className="flex items-center justify-center">

            <Badge
              tone={scoreTone}
              className="text-sm"
            >

              {scoreMessage}

            </Badge>

          </div>

        </div>


        {/* =================================================
            ANSWER COUNTS
        ================================================= */}

        <div className="mx-auto mt-6 grid max-w-lg grid-cols-3 gap-3">

          {/* CORRECT */}

          <div className="rounded-lg bg-moss-50 p-3">

            <CheckCircle2 className="mx-auto h-5 w-5 text-moss-600" />

            <p className="mt-1 text-lg font-semibold text-ink-900">

              {correctCount}

            </p>

            <p className="text-xs text-ink-700/60">

              Correct

            </p>

          </div>


          {/* INCORRECT */}

          <div className="rounded-lg bg-rust-50 p-3">

            <XCircle className="mx-auto h-5 w-5 text-rust-500" />

            <p className="mt-1 text-lg font-semibold text-ink-900">

              {incorrect.length}

            </p>

            <p className="text-xs text-ink-700/60">

              Incorrect

            </p>

          </div>


          {/* UNANSWERED */}

          <div className="rounded-lg bg-ink-50 p-3">

            <p className="mx-auto flex h-5 items-center justify-center text-sm font-semibold text-ink-700/60">

              —

            </p>

            <p className="mt-1 text-lg font-semibold text-ink-900">

              {unansweredCount}

            </p>

            <p className="text-xs text-ink-700/60">

              Unanswered

            </p>

          </div>

        </div>


        {/* =================================================
            COMPETENCY UPDATE
        ================================================= */}

        {updatedCompetency && (

          <div className="mx-auto mt-5 flex max-w-lg items-center justify-center gap-2 rounded-md border border-navy-200 bg-navy-50 px-4 py-3 text-xs">

            <TrendingUp className="h-4 w-4 shrink-0 text-navy-600" />

            <span className="text-ink-700/80">

              Competency updated:

              {' '}

              <span className="font-medium text-ink-900">

                {updatedCompetency.name}

              </span>

              {' '}is now{' '}

              <Badge
                tone={
                  updatedCompetency.tone ||
                  'neutral'
                }
                className="align-middle"
              >

                {updatedCompetency.score}%

              </Badge>

            </span>

          </div>

        )}

      </Card>


      {/* =====================================================
          TOPIC PERFORMANCE
      ===================================================== */}

      {topicData.length > 0 && (

        <ChartCard
          title="Topic-wise performance"
          subtitle="Your performance across the topics covered in this quiz."
        >

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <BarChart data={topicData}>

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#EEF3F7"
              />

              <XAxis
                dataKey="topic"
                tick={{ fontSize: 11 }}
              />

              <YAxis
                domain={[0, 100]}
                tick={{ fontSize: 12 }}
              />

              <Tooltip
                formatter={(value) => [
                  `${value}%`,
                  'Score',
                ]}
              />

              <Bar
                dataKey="percentage"
                fill="#396A8C"
                radius={[6, 6, 0, 0]}
                barSize={36}
              />

            </BarChart>

          </ResponsiveContainer>

        </ChartCard>

      )}


      {/* =====================================================
          QUESTION REVIEW
      ===================================================== */}

      {questions.length > 0 && (

        <Card>

          <CardHeader
            title="Review your answers"
            subtitle="Check your selected answers, correct answers, and explanations."
          />


          <div className="space-y-6 divide-y divide-navy-100">

            {questions.map((question, index) => (

              <div
                key={
                  question.id ||
                  `question-${index}`
                }
                className={
                  index > 0
                    ? 'pt-6'
                    : ''
                }
              >

                <div className="mb-3 flex items-center justify-between">

                  <span className="text-xs font-medium text-ink-700/50">

                    Question {index + 1}

                  </span>


                  {question.correct ? (

                    <Badge tone="strong">

                      <span className="flex items-center gap-1">

                        <CheckCircle2 className="h-3 w-3" />

                        Correct

                      </span>

                    </Badge>

                  ) : (

                    <Badge tone="weak">

                      <span className="flex items-center gap-1">

                        <XCircle className="h-3 w-3" />

                        Incorrect

                      </span>

                    </Badge>

                  )}

                </div>


                <QuizQuestionCmp
                  question={question}
                  index={index}
                  total={total}
                  selectedIndex={
                    question.selectedIndex
                  }
                  reviewMode
                />

              </div>

            ))}

          </div>

        </Card>

      )}


      {/* =====================================================
          ACTION BUTTONS
      ===================================================== */}

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">

        {/* RETRY */}

        <Button
          variant="secondary"
          icon={RotateCcw}
          onClick={handleRetry}
        >

          Retry quiz

        </Button>


        {/* LEARNING */}

        <Link to="/learning">

          <Button
            icon={GraduationCap}
            className="w-full sm:w-auto"
          >

            Continue learning

          </Button>

        </Link>


        {/* QUIZZES */}

        <Button
          variant="ghost"
          icon={ArrowLeft}
          onClick={handleBackToQuizzes}
        >

          Back to quizzes

        </Button>

      </div>

    </div>
  )
}