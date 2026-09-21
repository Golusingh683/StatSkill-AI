import React from 'react'
import { Link } from 'react-router-dom'
import {
  ClipboardList,
  Target,
  Sparkles,
  BookOpenCheck,
  TrendingUp,
  Award,
  Clock,
} from 'lucide-react'

import Card, { CardHeader } from '../components/ui/Card'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import ProgressBar from '../components/ui/ProgressBar'
import StatCard from '../components/ui/StatCard'
import GapGauge from '../components/ui/GapGauge'
import EmptyState from '../components/ui/EmptyState'

import { useAuth } from '../hooks/useAuth.jsx'
import { useAppData } from '../hooks/useAppData.jsx'
import { learningModules } from '../data/learningModules'
import { learningCompletion } from '../data/progress'
import { formatDate } from '../utils/format'


export default function Dashboard() {

  const { user } = useAuth()
  const { assessment, quizHistory } = useAppData()

  const firstName =
    user?.name?.split(' ')[0]

  const hasAssessment =
    assessment.completed

  const analysis =
    assessment.analysis


  const weakest =
    hasAssessment
      ? [...analysis.skillScores]
          .sort((a, b) => a.score - b.score)
          .slice(0, 3)
      : []


  const inProgressModules =
    learningModules
      .filter(
        (m) =>
          m.progress > 0 &&
          m.progress < 100
      )
      .slice(0, 3)


  return (

    <div className="space-y-6">

      {/* =====================================================
          WELCOME
      ===================================================== */}

      <div className="flex flex-col gap-1">

        <h2 className="font-display text-xl font-semibold text-green-950 sm:text-2xl">
          Welcome back, {firstName}
        </h2>

        <p className="text-sm text-green-900/70">
          Here's where your competency development stands today,{' '}
          {formatDate(new Date().toISOString())}.
        </p>

      </div>


      {/* =====================================================
          QUICK ACTIONS
      ===================================================== */}

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">

        <Link to="/assessment">
          <Button
            variant="secondary"
            icon={ClipboardList}
            className="w-full justify-start"
          >
            Take Assessment
          </Button>
        </Link>


        <Link to="/competency-gaps">
          <Button
            variant="secondary"
            icon={Target}
            className="w-full justify-start"
          >
            View Gaps
          </Button>
        </Link>


        <Link to="/quiz-generator">
          <Button
            variant="secondary"
            icon={Sparkles}
            className="w-full justify-start"
          >
            AI Quiz Generator
          </Button>
        </Link>


        <Link to="/quizzes">
          <Button
            variant="secondary"
            icon={BookOpenCheck}
            className="w-full justify-start"
          >
            Take a Quiz
          </Button>
        </Link>

      </div>


      {/* =====================================================
          OVERALL COMPETENCY + STATS
      ===================================================== */}

      <div className="grid gap-5 lg:grid-cols-3">


        {/* Overall competency gauge */}

        <Card className="lg:col-span-1">

          <CardHeader
            title="Overall competency"
            subtitle={
              hasAssessment
                ? 'Based on your latest assessment'
                : 'Complete an assessment to see this'
            }
          />


          {hasAssessment ? (

            <>

              <GapGauge
                value={analysis.overallScore}
              />

              <Link to="/competency-gaps">

                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-2 w-full"
                >
                  View full breakdown
                </Button>

              </Link>

            </>

          ) : (

            <EmptyState
              icon={ClipboardList}
              title="No assessment yet"
              description="Take the competency assessment to generate your AI-powered gap analysis."
              action={
                <Link to="/assessment">

                  <Button size="sm">
                    Start assessment
                  </Button>

                </Link>
              }
            />

          )}

        </Card>


        {/* =================================================
            STAT CARDS
        ================================================= */}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-2">

          <StatCard
            icon={Award}
            label="Modules completed"
            value={learningCompletion.completedModules}
            trend="+1 this month"
            trendTone="positive"
            accent="green"
          />


          <StatCard
            icon={Clock}
            label="Learning hours logged"
            value={`${learningCompletion.totalHoursSpent}h`}
            trend="On track"
            trendTone="neutral"
            accent="green"
          />


          <StatCard
            icon={TrendingUp}
            label="Quizzes attempted"
            value={quizHistory.length}
            trend={
              quizHistory.length
                ? `Last: ${quizHistory[0].score}/${quizHistory[0].total}`
                : 'None yet'
            }
            trendTone="neutral"
            accent="green"
          />


          <StatCard
            icon={Target}
            label="Competencies needing focus"
            value={
              hasAssessment
                ? analysis.gaps.length
                : '—'
            }
            trend={
              hasAssessment
                ? 'From latest assessment'
                : 'Take assessment'
            }
            trendTone={
              hasAssessment &&
              analysis.gaps.length
                ? 'negative'
                : 'neutral'
            }
            accent="green"
          />

        </div>

      </div>


      {/* =====================================================
          COMPETENCY + QUIZ SCORES
      ===================================================== */}

      <div className="grid gap-5 lg:grid-cols-2">


        {/* Competencies needing improvement */}

        <Card>

          <CardHeader
            title="Competencies needing improvement"
            icon={Target}
          />


          {hasAssessment ? (

            <div className="space-y-4">

              {weakest.map((skill) => (

                <ProgressBar
                  key={skill.id}
                  label={skill.name}
                  value={skill.score}
                  tone={skill.tone}
                />

              ))}

            </div>

          ) : (

            <p className="text-sm text-green-900/60">
              Complete the competency assessment to see personalized results here.
            </p>

          )}

        </Card>


        {/* Recent quiz scores */}

        <Card>

          <CardHeader
            title="Recent quiz scores"
            icon={BookOpenCheck}
            action={
              <Link
                to="/quizzes"
                className="text-sm font-medium text-green-700 hover:underline"
              >
                View all
              </Link>
            }
          />


          <ul className="divide-y divide-green-100">

            {quizHistory
              .slice(0, 4)
              .map((q) => (

                <li
                  key={q.id}
                  className="flex items-center justify-between py-2.5 text-sm"
                >

                  <div>

                    <p className="font-medium text-green-950">
                      {q.title}
                    </p>

                    <p className="text-xs text-green-900/50">
                      {formatDate(q.date)}
                    </p>

                  </div>


                  <Badge
                    tone={
                      q.score / q.total >= 0.7
                        ? 'strong'
                        : q.score / q.total >= 0.5
                          ? 'moderate'
                          : 'weak'
                    }
                  >
                    {q.score}/{q.total}
                  </Badge>

                </li>

              ))}

          </ul>

        </Card>

      </div>


      {/* =====================================================
          RECOMMENDED MODULES
      ===================================================== */}

      <Card>

        <CardHeader
          title="Recommended learning modules"
          icon={Sparkles}
          subtitle="Personalized based on your competency profile"
          action={
            <Link
              to="/learning"
              className="text-sm font-medium text-green-700 hover:underline"
            >
              View all
            </Link>
          }
        />


        <div className="grid gap-4 sm:grid-cols-3">

          {inProgressModules.map((m) => (

            <div
              key={m.id}
              className="rounded-md border border-green-100 p-4"
            >

              <p className="text-sm font-medium text-green-950">
                {m.title}
              </p>

              <p className="mt-0.5 text-xs text-green-900/60">
                {m.difficulty} &middot; {m.durationMins} min
              </p>


              <ProgressBar
                value={m.progress}
                size="sm"
                className="mt-3"
              />


              <Link to="/learning">

                <Button
                  size="sm"
                  variant="ghost"
                  className="mt-3 w-full"
                >
                  Continue
                </Button>

              </Link>

            </div>

          ))}

        </div>

      </Card>

    </div>

  )
}