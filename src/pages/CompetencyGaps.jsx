import React from 'react'
import { Link } from 'react-router-dom'

import {
  Sparkles,
  TrendingUp,
  TrendingDown,
  ClipboardList,
  ArrowRight,
  Briefcase,
  Target,
  BookOpen,
} from 'lucide-react'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
} from 'recharts'

import Card, { CardHeader } from '../components/ui/Card'
import ChartCard from '../components/ui/ChartCard'
import Badge from '../components/ui/Badge'
import ProgressBar from '../components/ui/ProgressBar'
import Button from '../components/ui/Button'
import EmptyState from '../components/ui/EmptyState'
import GapGauge from '../components/ui/GapGauge'

import { useAppData } from '../hooks/useAppData.jsx'


// JOB ROLES

const jobRoles = {
  'web-developer': {
    title: 'Web Developer',
    description:
      'Web development, frontend technologies, React, APIs and databases',
  },

  'data-analyst': {
    title: 'Data Analyst',
    description:
      'Python, SQL, statistics, data analysis and visualization',
  },

  'software-developer': {
    title: 'Software Developer',
    description:
      'Programming, algorithms, data structures and software development',
  },

  'ai-ml-engineer': {
    title: 'AI / ML Engineer',
    description:
      'Artificial intelligence, machine learning, Python and statistics',
  },

  'database-developer': {
    title: 'Database Developer',
    description:
      'SQL, database design, optimization and database management',
  },
}


// ROLE → RELEVANT COMPETENCIES

const roleCompetencies = {
  'web-developer': [
    'programming',
    'web-development',
    'database',
  ],

  'data-analyst': [
    'programming',
    'database',
    'data-analysis',
    'statistics',
    'data-visualization',
  ],

  'software-developer': [
    'programming',
    'database',
    'web-development',
  ],

  'ai-ml-engineer': [
    'programming',
    'data-analysis',
    'statistics',
    'artificial-intelligence',
  ],

  'database-developer': [
    'programming',
    'database',
  ],
}


// SCORE COLORS

const toneHex = {
  strong: '#347355',
  moderate: '#A97D1C',
  weak: '#A8402F',
}


// MAIN COMPONENT

export default function CompetencyGaps() {

  const { assessment } = useAppData()


  // NO ASSESSMENT

  if (!assessment?.completed) {

    return (

      <EmptyState
        icon={ClipboardList}
        title="No assessment results yet"
        description="Complete the competency assessment first, and your personalized career analysis will appear here."
        action={
          <Link to="/assessment">

            <Button size="sm">
              Start assessment
            </Button>

          </Link>
        }
      />

    )
  }


  // ANALYSIS DATA

  const analysis = assessment.analysis || {}

  const {
    overallScore = 0,
    skillScores = [],
    strengths = [],
    gaps = [],
    narrative = '',
  } = analysis


  // SELECTED ROLE

  const selectedRole =
    assessment.role ||
    analysis.role ||
    ''


  const roleInfo =
    jobRoles[selectedRole] || {

      title: 'Selected Career Role',

      description:
        'Personalized competency assessment',

    }


  // GAP MESSAGE

  const getGapMessage = (score) => {

    if (score < 50) {

      return 'High priority improvement area'

    }

    if (score < 75) {

      return 'Good foundation, but needs improvement'

    }

    return 'Strong competency'

  }


  // READINESS MESSAGE

  const getReadinessMessage = (score) => {

    if (score < 50) {

      return (
        'You have several important areas to strengthen before you are fully ready for this role.'
      )

    }

    if (score < 75) {

      return (
        'You have a good foundation. Focused learning can significantly improve your readiness for this role.'
      )

    }

    return (
      'You have a strong competency foundation for this role. Continue improving advanced skills and practical experience.'
    )

  }


  // AI NARRATIVE

  const aiNarrative =
    narrative ||
    getReadinessMessage(overallScore)


  // RETURN

  return (

    <div className="space-y-6">


      {/* =====================================================
          HEADER
      ===================================================== */}

      <div>

        <div className="flex items-center gap-2">

          <Target className="h-5 w-5 text-navy-600" />

          <h2 className="font-display text-xl font-semibold text-ink-900 sm:text-2xl">

            Career Readiness & Gap Analysis

          </h2>

        </div>


        <p className="mt-1 text-sm text-ink-700/70">

          Your assessment results have been analyzed according
          to your selected career goal.

        </p>

      </div>


      {/* =====================================================
          CAREER ROLE
      ===================================================== */}

      <Card className="border-navy-200 bg-navy-50/60">

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-start gap-3">

            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white text-navy-700">

              <Briefcase className="h-5 w-5" />

            </span>


            <div>

              <p className="text-xs font-medium uppercase tracking-wide text-navy-600">

                Your career goal

              </p>


              <h3 className="mt-1 text-lg font-semibold text-ink-900">

                {roleInfo.title}

              </h3>


              <p className="mt-1 max-w-2xl text-xs leading-relaxed text-ink-700/60">

                {roleInfo.description}

              </p>

            </div>

          </div>


          <Badge tone="moderate">

            Personalized assessment

          </Badge>

        </div>

      </Card>


      {/* =====================================================
          TOP SUMMARY
      ===================================================== */}

      <div className="grid gap-5 lg:grid-cols-3">


        {/* ===================================================
            OVERALL SCORE
        =================================================== */}

        <Card className="lg:col-span-1">

          <CardHeader
            title="Overall readiness"
            subtitle={`Readiness for ${roleInfo.title}`}
          />

          <GapGauge value={overallScore} />

        </Card>


        {/* ===================================================
            AI ANALYSIS
        =================================================== */}

        <Card
          className="lg:col-span-2"
          style={{
            backgroundColor: '#F8F3E8',
            borderColor: '#E8D8B5',
          }}
        >

          <div className="flex items-start gap-4">


            {/* AI ICON */}

            <span
              className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-lg"
              style={{
                backgroundColor: '#D89A27',
                color: '#172B3D',
              }}
            >

              <Sparkles className="h-5 w-5" />

            </span>


            {/* AI CONTENT */}

            <div className="min-w-0 flex-1">


              <p
                className="text-xs font-semibold uppercase tracking-wide"
                style={{
                  color: '#A66B00',
                }}
              >

                AI Career Analysis

              </p>


              <h3
                className="mt-2 text-base font-semibold leading-relaxed sm:text-lg"
                style={{
                  color: '#0B1F33',
                }}
              >

                {overallScore >= 75
                  ? 'You have a strong competency foundation for your selected career role.'
                  : overallScore >= 50
                  ? 'You have a good foundation with some areas that need improvement.'
                  : 'You have some important competency gaps to work on.'}

              </h3>


              <p
                className="mt-2 text-sm leading-relaxed sm:text-[15px]"
                style={{
                  color: '#425B73',
                }}
              >

                {aiNarrative}

              </p>


              {/* AI STATUS */}

              <div className="mt-4 flex flex-wrap gap-2">

                <span
                  className="rounded-full px-3 py-1 text-xs font-medium"
                  style={{
                    backgroundColor: '#FFFFFF',
                    color: '#6A4A00',
                    border: '1px solid #E8D8B5',
                  }}
                >

                  AI-generated insight

                </span>


                <span
                  className="rounded-full px-3 py-1 text-xs font-medium"
                  style={{
                    backgroundColor: '#FFFFFF',
                    color: '#425B73',
                    border: '1px solid #D6E2EC',
                  }}
                >

                  Based on assessment results

                </span>

              </div>

            </div>

          </div>

        </Card>

      </div>


      {/* =====================================================
          READINESS EXPLANATION
      ===================================================== */}

      <Card>

        <div className="flex items-start gap-3">

          <Target className="mt-0.5 h-5 w-5 shrink-0 text-navy-600" />

          <div>

            <h3 className="text-sm font-semibold text-ink-900">

              What your score means

            </h3>


            <p className="mt-1 text-sm leading-relaxed text-ink-700/70">

              {getReadinessMessage(overallScore)}

            </p>

          </div>

        </div>

      </Card>


      {/* =====================================================
          COMPETENCY CHART
      ===================================================== */}

      {skillScores.length > 0 && (

        <ChartCard
          title="Your competency profile"
          subtitle="Higher scores indicate stronger competency"
        >

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <BarChart
              data={skillScores}
              layout="vertical"
              margin={{
                left: 8,
                right: 24,
              }}
            >

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#EEF3F7"
                horizontal={false}
              />


              <XAxis
                type="number"
                domain={[0, 100]}
                tick={{
                  fontSize: 12,
                  fill: '#1B3B5C99',
                }}
              />


              <YAxis
                type="category"
                dataKey="name"
                width={150}
                tick={{
                  fontSize: 12,
                  fill: '#0B1F33',
                }}
              />


              <Tooltip
                formatter={(value) => [
                  `${value}%`,
                  'Score',
                ]}
                contentStyle={{
                  borderRadius: 8,
                  borderColor: '#D6E2EC',
                  fontSize: 13,
                }}
              />


              <Bar
                dataKey="score"
                radius={[
                  0,
                  6,
                  6,
                  0,
                ]}
                barSize={18}
              >

                {skillScores.map(
                  (entry) => (

                    <Cell
                      key={entry.id}
                      fill={
                        toneHex[
                          entry.tone
                        ] || toneHex.moderate
                      }
                    />

                  )
                )}

              </Bar>

            </BarChart>

          </ResponsiveContainer>

        </ChartCard>

      )}


      {/* =====================================================
          STRENGTHS + GAPS
      ===================================================== */}

      <div className="grid gap-5 lg:grid-cols-2">


        {/* ===================================================
            STRENGTHS
        =================================================== */}

        <Card>

          <CardHeader
            title="Your strengths"
            icon={TrendingUp}
          />


          {strengths.length ? (

            <div className="space-y-4">

              {strengths.map(
                (skill) => (

                  <div
                    key={skill.id}
                    className="space-y-1"
                  >

                    <ProgressBar
                      label={skill.name}
                      value={skill.score}
                      tone={skill.tone}
                    />

                  </div>

                )
              )}

            </div>

          ) : (

            <div className="rounded-lg bg-navy-50 p-4">

              <p className="text-sm text-ink-700/70">

                You do not have a strong competency above 75% yet.

              </p>


              <p className="mt-1 text-xs text-ink-700/50">

                Don't worry. Your learning roadmap will focus on
                building these skills.

              </p>

            </div>

          )}

        </Card>


        {/* GAPS */}

        <Card>

          <CardHeader
            title="Priority areas to improve"
            icon={TrendingDown}
          />


          {gaps.length ? (

            <div className="space-y-4">

              {gaps.map(
                (gap) => (

                  <div
                    key={gap.id}
                    className="rounded-lg border border-navy-100 p-3"
                  >

                    <ProgressBar
                      label={gap.name}
                      value={gap.score}
                      tone={gap.tone}
                    />


                    <p className="mt-1 text-xs text-ink-700/50">

                      {getGapMessage(gap.score)}

                    </p>

                  </div>

                )
              )}

            </div>

          ) : (

            <div className="rounded-lg bg-moss-50 p-4">

              <p className="text-sm font-medium text-ink-900">

                No major competency gaps detected.

              </p>


              <p className="mt-1 text-xs text-ink-700/60">

                You have a strong foundation for your selected
                career role.

              </p>

            </div>

          )}

        </Card>

      </div>


      {/* =====================================================
          LEARNING PRIORITY
      ===================================================== */}

      {gaps.length > 0 && (

        <Card className="border-rust-200 bg-rust-50/40">

          <div className="flex items-start gap-3">

            <BookOpen className="mt-0.5 h-5 w-5 shrink-0 text-rust-600" />

            <div>

              <h3 className="text-sm font-semibold text-ink-900">

                Your learning priority

              </h3>


              <p className="mt-1 text-sm leading-relaxed text-ink-700/70">

                Start with your lowest-scoring competencies first.
                Improving these areas will have the biggest impact
                on your readiness for the{' '}

                <span className="font-medium text-ink-900">

                  {roleInfo.title}

                </span>{' '}

                role.

              </p>

            </div>

          </div>

        </Card>

      )}


      {/* =====================================================
          ALL COMPETENCIES
      ===================================================== */}

      <Card>

        <CardHeader
          title="Complete competency breakdown"
          subtitle="Detailed results from your assessment"
        />


        {skillScores.length > 0 ? (

          <div className="divide-y divide-navy-100">

            {skillScores.map(
              (skill) => (

                <div
                  key={skill.id}
                  className="flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:justify-between"
                >

                  <div>

                    <p className="text-sm font-medium text-ink-900">

                      {skill.name}

                    </p>


                    <p className="text-xs text-ink-700/60">

                      {skill.description}

                    </p>

                  </div>


                  <div className="flex items-center gap-3 sm:w-64">

                    <ProgressBar
                      value={skill.score}
                      tone={skill.tone}
                      showValue={false}
                      className="flex-1"
                    />


                    <Badge tone={skill.tone}>

                      {skill.label}

                    </Badge>

                  </div>

                </div>

              )
            )}

          </div>

        ) : (

          <p className="py-4 text-sm text-ink-700/60">

            No competency data available.

          </p>

        )}

      </Card>


      {/* =====================================================
          NEXT STEP
      ===================================================== */}

      <Card className="border-navy-200 bg-navy-50/50">

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>

            <p className="text-xs font-medium uppercase tracking-wide text-navy-600">

              Next step

            </p>


            <h3 className="mt-1 text-base font-semibold text-ink-900">

              Build your personalized learning roadmap

            </h3>


            <p className="mt-1 text-sm text-ink-700/60">

              AI will recommend courses and reading materials
              based on your weakest areas.

            </p>

          </div>


          <Link to="/learning">

            <Button
              icon={ArrowRight}
              iconPosition="right"
            >

              View learning roadmap

            </Button>

          </Link>

        </div>

      </Card>

    </div>
  )
}