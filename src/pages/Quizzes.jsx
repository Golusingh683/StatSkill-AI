import React from 'react'
import { useNavigate } from 'react-router-dom'
import { BookOpenCheck, Sparkles, PlayCircle } from 'lucide-react'
import Card, { CardHeader } from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import { quizBank, quizTopics } from '../data/quizBank'
import { resolveCompetencyId } from '../data/topicCompetencyMap'
import { useAppData } from '../hooks/useAppData.jsx'
import { slugify } from '../utils/format'

export default function Quizzes() {
  const { setActiveQuiz, quizHistory } = useAppData()
  const navigate = useNavigate()

  const handleStart = (topic) => {
    const questions = quizBank[topic].map((q, i) => ({ id: `${slugify(topic)}-${i}`, ...q }))
    setActiveQuiz({ title: `${topic} Quiz`, topic, questions, competencyId: resolveCompetencyId(topic) })
    navigate(`/quiz/${slugify(topic)}`)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-xl font-semibold text-ink-900 sm:text-2xl">Quizzes</h2>
        <p className="text-sm text-ink-700/70">Topic-wise practice quizzes drawn from the core competency framework.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {quizTopics.map((topic) => (
          <Card key={topic} className="flex flex-col">
            <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-md bg-navy-50 text-navy-700">
              <BookOpenCheck className="h-4.5 w-4.5" />
            </div>
            <h3 className="text-sm font-semibold text-ink-900">{topic}</h3>
            <p className="mt-1 flex-1 text-xs text-ink-700/60">{quizBank[topic].length} questions &middot; Mixed difficulty</p>
            <Button size="sm" icon={PlayCircle} className="mt-3 w-full" onClick={() => handleStart(topic)}>
              Start quiz
            </Button>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader
          title="Or generate a custom quiz with AI"
          subtitle="Upload your own training material and get tailored MCQs"
          icon={Sparkles}
          action={
            <Button size="sm" variant="secondary" onClick={() => navigate('/quiz-generator')}>
              Go to AI Quiz Generator
            </Button>
          }
        />
      </Card>

      {quizHistory.length > 0 && (
        <Card>
          <CardHeader title="Your quiz history" />
          <ul className="divide-y divide-navy-100">
            {quizHistory.map((q) => (
              <li key={q.id} className="flex items-center justify-between py-2.5 text-sm">
                <div>
                  <p className="font-medium text-ink-900">{q.title}</p>
                  <p className="text-xs text-ink-700/50">{new Date(q.date).toLocaleDateString('en-IN')}</p>
                </div>
                <Badge tone={q.score / q.total >= 0.7 ? 'strong' : q.score / q.total >= 0.5 ? 'moderate' : 'weak'}>
                  {q.score}/{q.total}
                </Badge>
              </li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  )
}
