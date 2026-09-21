import React, { useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock,
  PlayCircle,
  Trophy,
} from 'lucide-react'

import Card, { CardHeader } from '../components/ui/Card'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import ProgressBar from '../components/ui/ProgressBar'
import EmptyState from '../components/ui/EmptyState'

import { learningModules } from '../data/learningModules'
import { competencyList } from '../data/competencies'


const difficultyTone = {
  Beginner: 'strong',
  Intermediate: 'moderate',
  Advanced: 'weak',
}


// LESSON DATA

const lessonData = {
  'react-development': [
    'React fundamentals',
    'Components and JSX',
    'Props and State',
    'Hooks',
    'Routing',
    'API integration',
  ],

  'node-express': [
    'Node.js fundamentals',
    'Modules and npm',
    'Creating a server',
    'Express.js',
    'REST APIs',
    'Middleware',
  ],

  'cpp-programming': [
    'C++ fundamentals',
    'Variables and data types',
    'Functions',
    'Arrays and strings',
    'Pointers',
    'Object-oriented programming',
  ],

  'sql-fundamentals': [
    'SQL fundamentals',
    'SELECT queries',
    'WHERE and filtering',
    'JOINs',
    'GROUP BY',
    'Subqueries',
  ],

  'python-data-analysis': [
    'Python fundamentals',
    'NumPy',
    'Pandas',
    'Data cleaning',
    'Data analysis',
    'Visualization',
  ],

  'machine-learning': [
    'Machine learning fundamentals',
    'Supervised learning',
    'Unsupervised learning',
    'Feature engineering',
    'Model training',
    'Model evaluation',
  ],
}


// DEFAULT LESSONS

const defaultLessons = [
  'Introduction',
  'Core concepts',
  'Practical implementation',
  'Advanced concepts',
  'Practice',
  'Final assessment',
]


// COMPONENT

export default function LearningModule() {

  const { courseId } = useParams()
  const navigate = useNavigate()

  const [completedLessons, setCompletedLessons] = useState([])

  // FIND COURSE

  const course = useMemo(() => {

    return learningModules.find(
      (module) => String(module.id) === String(courseId)
    )

  }, [courseId])


  // COURSE NOT FOUND

  if (!course) {

    return (
      <EmptyState
        icon={BookOpen}
        title="Course not found"
        description="The requested learning module does not exist."
        action={
          <Link to="/learning">
            <Button size="sm">
              Back to learning
            </Button>
          </Link>
        }
      />
    )
  }


  // COMPETENCY

  const competency =
    competencyList.find(
      (item) => item.id === course.competencyId
    )


  // LESSONS

  const lessons =
    lessonData[course.id] || defaultLessons


  // PROGRESS

  const completedCount =
    completedLessons.length

  const progress =
    lessons.length > 0
      ? Math.round(
          (completedCount / lessons.length) * 100
        )
      : 0


  // TOGGLE LESSON

  const toggleLesson = (index) => {

    setCompletedLessons((prev) => {

      if (prev.includes(index)) {

        return prev.filter(
          (item) => item !== index
        )

      }

      return [
        ...prev,
        index,
      ]

    })

  }


  // COMPLETE COURSE

  const courseCompleted =
    progress === 100


  // START QUIZ

  const handleQuiz = () => {

    navigate('/quizzes')

  }


  return (

    <div className="mx-auto max-w-4xl space-y-6">


      {/* =====================================================
          BACK
      ===================================================== */}

      <Link
        to="/learning"
        className="inline-flex items-center gap-2 text-sm text-navy-700 hover:text-navy-900"
      >

        <ArrowLeft className="h-4 w-4" />

        Back to Learning

      </Link>


      {/* =====================================================
          COURSE HEADER
      ===================================================== */}

      <Card>

        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">

          <div className="flex items-start gap-4">

            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-navy-50 text-navy-700">

              <BookOpen className="h-6 w-6" />

            </span>


            <div>

              <div className="flex flex-wrap items-center gap-2">

                <Badge
                  tone={
                    difficultyTone[
                      course.difficulty
                    ] || 'neutral'
                  }
                >

                  {course.difficulty}

                </Badge>


                {courseCompleted && (

                  <Badge tone="strong">

                    Completed

                  </Badge>

                )}

              </div>


              <h1 className="mt-2 font-display text-xl font-semibold text-ink-900 sm:text-2xl">

                {course.title}

              </h1>


              <p className="mt-2 text-sm leading-relaxed text-ink-700/70">

                {course.description}

              </p>


              {competency && (

                <p className="mt-2 text-xs text-navy-700">

                  Competency: {competency.name}

                </p>

              )}

            </div>

          </div>


          <div className="flex shrink-0 items-center gap-3 text-xs text-ink-700/60">

            <span className="flex items-center gap-1">

              <Clock className="h-4 w-4" />

              {course.durationMins} min

            </span>


            <span>

              {course.provider}

            </span>

          </div>

        </div>


        {/* COURSE PROGRESS */}

        <div className="mt-6">

          <ProgressBar
            value={progress}
            label={`${completedCount} of ${lessons.length} lessons completed`}
          />

        </div>

      </Card>


      {/* =====================================================
          COURSE CONTENT
      ===================================================== */}

      <Card>

        <CardHeader
          title="Course lessons"
          subtitle="Complete each lesson to track your learning progress."
          icon={BookOpen}
        />


        <div className="space-y-3">

          {lessons.map((lesson, index) => {

            const completed =
              completedLessons.includes(index)


            return (

              <div
                key={index}
                className={`flex items-center gap-3 rounded-lg border p-4 transition ${
                  completed
                    ? 'border-moss-200 bg-moss-50/50'
                    : 'border-navy-100 bg-white'
                }`}
              >

                {/* NUMBER */}

                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
                    completed
                      ? 'bg-moss-100 text-moss-700'
                      : 'bg-navy-50 text-navy-700'
                  }`}
                >

                  {completed ? (
                    <CheckCircle2 className="h-5 w-5" />
                  ) : (
                    index + 1
                  )}

                </span>


                {/* TITLE */}

                <div className="min-w-0 flex-1">

                  <p className="text-sm font-medium text-ink-900">

                    {lesson}

                  </p>


                  <p className="mt-0.5 text-xs text-ink-700/50">

                    Lesson {index + 1}

                  </p>

                </div>


                {/* BUTTON */}

                <Button
                  size="sm"
                  variant={
                    completed
                      ? 'secondary'
                      : 'primary'
                  }
                  onClick={() =>
                    toggleLesson(index)
                  }
                >

                  {completed
                    ? 'Completed'
                    : 'Mark complete'}

                </Button>

              </div>

            )

          })}

        </div>

      </Card>


      {/* =====================================================
          COURSE COMPLETION
      ===================================================== */}

      {courseCompleted && (

        <Card className="border-moss-200 bg-moss-50">

          <div className="flex items-start gap-4">

            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-moss-600">

              <Trophy className="h-5 w-5" />

            </span>


            <div className="flex-1">

              <h3 className="text-base font-semibold text-ink-900">

                Course completed!

              </h3>


              <p className="mt-1 text-sm text-ink-700/70">

                You completed all lessons in this learning module.
                You can now test your knowledge with a quiz.

              </p>


              <Button
                className="mt-4"
                icon={PlayCircle}
                onClick={handleQuiz}
              >

                Take a quiz

              </Button>

            </div>

          </div>

        </Card>

      )}


      {/* =====================================================
          NEXT STEP
      ===================================================== */}

      {!courseCompleted && (

        <Card className="border-navy-200 bg-navy-50/50">

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>

              <p className="text-xs font-medium uppercase tracking-wide text-navy-600">

                Keep learning

              </p>


              <h3 className="mt-1 text-base font-semibold text-ink-900">

                Complete the lessons to finish this module

              </h3>


              <p className="mt-1 text-sm text-ink-700/60">

                Your progress is tracked while you work through
                the course.

              </p>

            </div>


            <Button
              variant="secondary"
              icon={ArrowRight}
              iconPosition="right"
              onClick={() => {

                const nextLesson =
                  lessons.findIndex(
                    (_, index) =>
                      !completedLessons.includes(index)
                  )

                if (nextLesson !== -1) {

                  toggleLesson(nextLesson)

                }

              }}
            >

              Complete next lesson

            </Button>

          </div>

        </Card>

      )}

    </div>

  )

}