import React, { useMemo, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Clock,
  GraduationCap,
  PlayCircle,
  CheckCircle2,
  BookOpen,
  FileText,
  Lock,
} from 'lucide-react'

import Card, { CardHeader } from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import ProgressBar from '../components/ui/ProgressBar'
import Button from '../components/ui/Button'

import { learningModules } from '../data/learningModules'
import { materials } from '../data/materials'
import { competencyList } from '../data/competencies'
import { formatMinutes } from '../utils/format'

const difficultyTone = {
  Beginner: 'strong',
  Intermediate: 'moderate',
  Advanced: 'weak',
}

export default function CourseDetail() {
  const { id } = useParams()
  const navigate = useNavigate()

  const course = learningModules.find(
    (module) => module.id === id
  )

  const [completedLessons, setCompletedLessons] = useState([])
  const [selectedLesson, setSelectedLesson] = useState(0)

  if (!course) {
    return (
      <div className="space-y-5">
        <Button
          variant="secondary"
          icon={ArrowLeft}
          onClick={() => navigate('/learning')}
        >
          Back to courses
        </Button>

        <Card>
          <div className="py-10 text-center">
            <GraduationCap className="mx-auto h-10 w-10 text-ink-700/40" />

            <h2 className="mt-3 font-display text-xl font-semibold text-ink-900">
              Course not found
            </h2>

            <p className="mt-2 text-sm text-ink-700/60">
              The course you are looking for is not available.
            </p>
          </div>
        </Card>
      </div>
    )
  }

  const competency = competencyList.find(
    (item) => item.id === course.competencyId
  )

  const relatedMaterials = materials
  .filter((material) =>
    material.courseIds?.includes(course.id)
  )
  .sort((a, b) => {
    // Materials having an actual PDF come first
    if (a.file && !b.file) return -1
    if (!a.file && b.file) return 1
    return 0
  })
  /*
   * If lessons already exist in learningModules.js,
   * use them. Otherwise use these demo lessons.
   */
  const lessons = course.lessons?.length
    ? course.lessons
    : [
        {
          id: 'lesson-1',
          title: 'Introduction and Fundamentals',
          description:
            'Understand the basic concepts and terminology of this subject.',
          duration: 15,
          content: `
Start by understanding the fundamentals of this course.

This lesson introduces the important concepts that you need before moving to the practical sections.

Learning objectives:
• Understand the basic terminology
• Understand why this topic is important
• Identify the main concepts
• Build a strong foundation for advanced topics

Take your time to understand each concept before moving to the next lesson.
          `,
        },
        {
          id: 'lesson-2',
          title: 'Core Concepts',
          description:
            'Learn the important concepts required to build a strong foundation.',
          duration: 20,
          content: `
In this lesson, we explore the core concepts of the subject.

Focus on understanding how the different concepts are connected.

Key points:
• Learn the main principles
• Understand the relationship between concepts
• Study important examples
• Identify common mistakes

After completing this lesson, you should be comfortable explaining the core concepts in your own words.
          `,
        },
        {
          id: 'lesson-3',
          title: 'Practical Applications',
          description:
            'Apply the concepts through practical examples and exercises.',
          duration: 25,
          content: `
Now it is time to apply what you have learned.

Practical learning helps you understand how theoretical concepts are used in real situations.

Practice:
• Work through examples
• Analyse sample problems
• Apply the concepts step by step
• Check your results

Try solving the examples yourself before looking at the solution.
          `,
        },
        {
          id: 'lesson-4',
          title: 'Assessment and Review',
          description:
            'Review your learning and test your understanding.',
          duration: 15,
          content: `
This is the final lesson of the course.

Review everything you have learned and identify the areas where you need additional practice.

Before finishing:
• Review the key concepts
• Revisit difficult topics
• Complete the practice questions
• Take the final assessment

Completing this section means you have finished the learning path.
          `,
        },
      ]

  const progress = Math.round(
    (completedLessons.length / lessons.length) * 100
  )

  const currentLesson = lessons[selectedLesson]

  const isCurrentCompleted = completedLessons.includes(
    currentLesson.id
  )

  const handleCompleteLesson = () => {
    if (!completedLessons.includes(currentLesson.id)) {
      setCompletedLessons((prev) => [
        ...prev,
        currentLesson.id,
      ])
    }

    if (selectedLesson < lessons.length - 1) {
      setTimeout(() => {
        setSelectedLesson((prev) => prev + 1)
      }, 300)
    }
  }

  return (
    <div className="space-y-6">

      {/* =====================================================
          BACK
      ===================================================== */}

      <Button
        variant="secondary"
        icon={ArrowLeft}
        onClick={() => navigate('/learning')}
      >
        Back to courses
      </Button>


      {/* =====================================================
          COURSE HERO
      ===================================================== */}

      <Card className="overflow-hidden">

        <div className="grid gap-6 lg:grid-cols-[1fr_300px]">

          <div>

            <div className="flex flex-wrap items-center gap-2">

              <Badge
                tone={
                  difficultyTone[course.difficulty] ||
                  'neutral'
                }
              >
                {course.difficulty}
              </Badge>

              <Badge tone="neutral">
                {course.format || 'Online Course'}
              </Badge>

            </div>

            <h1 className="mt-4 font-display text-2xl font-semibold leading-tight text-ink-900 sm:text-3xl">
              {course.title}
            </h1>

            <p className="mt-2 text-sm text-navy-600">
              {competency?.name || 'General Learning'}
            </p>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-ink-700/70">
              {course.description}
            </p>

            <div className="mt-5 flex flex-wrap gap-4 text-sm text-ink-700/60">

              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {formatMinutes(course.durationMins)}
              </span>

              <span className="flex items-center gap-1.5">
                <GraduationCap className="h-4 w-4" />
                {course.provider}
              </span>

              <span className="flex items-center gap-1.5">
                <BookOpen className="h-4 w-4" />
                Self-paced
              </span>

            </div>

          </div>


          {/* PROGRESS */}

          <div className="rounded-xl bg-navy-50 p-5">

            <div className="flex items-center justify-between">

              <span className="text-sm font-medium text-ink-900">
                Your progress
              </span>

              <span className="font-display text-lg font-semibold text-navy-700">
                {progress}%
              </span>

            </div>

            <ProgressBar
              value={progress}
              size="md"
              className="mt-3"
            />

            <p className="mt-3 text-xs leading-relaxed text-ink-700/60">
              Complete each lesson to finish this course.
            </p>

            {progress === 100 && (
              <div className="mt-4 flex items-center gap-2 rounded-lg bg-white p-3 text-sm font-medium text-moss-700">
                <CheckCircle2 className="h-4 w-4" />
                Course completed!
              </div>
            )}

          </div>

        </div>

      </Card>


      {/* =====================================================
          LESSON + CONTENT
      ===================================================== */}

      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">


        {/* ===================================================
            LESSON LIST
        =================================================== */}

        <Card>

          <CardHeader
            title="Course content"
            subtitle={`${lessons.length} lessons`}
            icon={BookOpen}
          />

          <div className="mt-4 space-y-2">

            {lessons.map((lesson, index) => {

              const completed =
                completedLessons.includes(lesson.id)

              const active =
                index === selectedLesson

              /*
               * Lesson is available if:
               * - first lesson
               * - previous lesson completed
               */
              const unlocked =
                index === 0 ||
                completedLessons.includes(
                  lessons[index - 1].id
                )

              return (
                <button
                  key={lesson.id}
                  type="button"
                  disabled={!unlocked}
                  onClick={() =>
                    unlocked &&
                    setSelectedLesson(index)
                  }
                  className={`w-full rounded-lg border p-3 text-left transition ${
                    active
                      ? 'border-navy-400 bg-navy-50'
                      : 'border-ink-200 bg-white hover:bg-ink-50'
                  } ${
                    !unlocked
                      ? 'cursor-not-allowed opacity-50'
                      : ''
                  }`}
                >

                  <div className="flex gap-3">

                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                        completed
                          ? 'bg-moss-50 text-moss-600'
                          : 'bg-navy-50 text-navy-700'
                      }`}
                    >

                      {completed ? (
                        <CheckCircle2 className="h-4 w-4" />
                      ) : !unlocked ? (
                        <Lock className="h-4 w-4" />
                      ) : (
                        <span className="text-xs font-semibold">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      )}

                    </div>


                    <div className="min-w-0 flex-1">

                      <p className="text-xs font-semibold text-ink-900">
                        {lesson.title}
                      </p>

                      <p className="mt-1 text-[11px] text-ink-700/60">
                        {lesson.duration
                          ? `${lesson.duration} min`
                          : 'Lesson'}
                      </p>

                    </div>

                  </div>

                </button>
              )
            })}

          </div>

        </Card>


        {/* ===================================================
            LESSON CONTENT
        =================================================== */}

        <Card>

          <div className="flex flex-wrap items-start justify-between gap-3">

            <div>

              <Badge tone="neutral">
                Lesson {selectedLesson + 1} of {lessons.length}
              </Badge>

              <h2 className="mt-3 font-display text-xl font-semibold text-ink-900">
                {currentLesson.title}
              </h2>

              <p className="mt-2 text-sm text-ink-700/60">
                {currentLesson.description}
              </p>

            </div>

            <div className="flex items-center gap-1 text-xs text-ink-700/60">
              <Clock className="h-3.5 w-3.5" />
              {currentLesson.duration || 15} min
            </div>

          </div>


          {/* CONTENT */}

          <div className="mt-6 rounded-xl bg-ink-50 p-5">

            <div className="whitespace-pre-line text-sm leading-7 text-ink-700">
              {currentLesson.content}
            </div>

          </div>


          {/* ACTION */}

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">

            <Button
              variant="secondary"
              disabled={selectedLesson === 0}
              onClick={() =>
                setSelectedLesson(
                  (prev) => Math.max(0, prev - 1)
                )
              }
            >
              Previous lesson
            </Button>


            <Button
              icon={
                isCurrentCompleted
                  ? CheckCircle2
                  : PlayCircle
              }
              onClick={handleCompleteLesson}
            >

              {isCurrentCompleted
                ? selectedLesson === lessons.length - 1
                  ? 'Course completed'
                  : 'Next lesson'
                : 'Mark as complete'}

            </Button>

          </div>

        </Card>

      </div>


      {/* =====================================================
          LEARNING MATERIALS
      ===================================================== */}

      <Card>

        <CardHeader
          title="Learning materials"
          subtitle="Reference material related to this course."
          icon={FileText}
        />

        {relatedMaterials.length === 0 ? (

          <div className="mt-5 rounded-lg bg-ink-50 p-5 text-center">

            <FileText className="mx-auto h-7 w-7 text-ink-700/40" />

            <p className="mt-2 text-sm text-ink-700/60">
              No additional materials are available for this
              course yet.
            </p>

          </div>

        ) : (

          <div className="mt-4 grid gap-3 md:grid-cols-2">

            {relatedMaterials.map((material) => (

              <div
                key={material.id}
                className="rounded-lg border border-ink-200 p-4"
              >

                <div className="flex items-start gap-3">

                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-navy-50 text-navy-700">
                    <FileText className="h-4 w-4" />
                  </span>

                  <div className="min-w-0">

                    <h3 className="text-sm font-medium text-ink-900">
                      {material.title}
                    </h3>

                    <p className="mt-1 text-xs text-ink-700/60">
                      {material.type} · {material.pages} pages
                    </p>

                  </div>

                </div>

                <p className="mt-2 text-xs leading-relaxed text-ink-700/60">
                  {material.description}
                </p>
                {material.file ? (
  <div className="mt-4 flex gap-2">

    <a
  href={material.file}
  target="_blank"
  rel="noopener noreferrer"
  className="flex-1 rounded-lg border border-ink-200 px-3 py-2 text-center text-sm font-medium text-navy-700 transition hover:bg-ink-50"
>
  View PDF
</a>

    <a
  href={material.file}
  download={material.file.split('/').pop()}
  className="flex-1 rounded-lg bg-navy-700 px-3 py-2 text-center text-sm font-medium text-white transition hover:bg-navy-800"
>
  Download PDF
</a>

  </div>
) : (
  <div className="mt-4 rounded-lg bg-ink-50 px-3 py-2 text-center text-xs text-ink-700/60">
    PDF not available yet
  </div>
)}

              </div>

            ))}

          </div>

        )}

      </Card>


      {/* =====================================================
          COMPETENCY
      ===================================================== */}

      {competency && (

        <Card>

          <CardHeader
            title="What you will develop"
            subtitle="Skills covered by this learning module."
            icon={GraduationCap}
          />

          <div className="mt-4 rounded-lg bg-navy-50 p-4">

            <h3 className="text-sm font-semibold text-ink-900">
              {competency.name}
            </h3>

            <p className="mt-1 text-sm leading-relaxed text-ink-700/70">
              {competency.description}
            </p>

          </div>

        </Card>

      )}

    </div>
  )
}