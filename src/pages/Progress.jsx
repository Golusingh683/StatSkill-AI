import React from 'react'
import { Link } from 'react-router-dom'
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend, PieChart, Pie, Cell } from 'recharts'
import { TrendingUp, BookOpen, Clock, Award, ClipboardList } from 'lucide-react'
import Card, { CardHeader } from '../components/ui/Card'
import ChartCard from '../components/ui/ChartCard'
import StatCard from '../components/ui/StatCard'
import ProgressBar from '../components/ui/ProgressBar'
import EmptyState from '../components/ui/EmptyState'
import Button from '../components/ui/Button'
import { competencyHistory, skillProgressHistory, learningCompletion } from '../data/progress'
import { useAppData } from '../hooks/useAppData.jsx'

const skillColors = {
  Sampling: '#A8402F',
  'Data Visualization': '#A97D1C',
  'Data Analysis': '#347355',
  'Data Quality': '#396A8C',
  'Statistical Methods': '#B0752F',
}

const completionData = [
  { name: 'Completed', value: learningCompletion.completedModules, color: '#347355' },
  { name: 'In progress', value: learningCompletion.inProgressModules, color: '#A97D1C' },
  { name: 'Not started', value: learningCompletion.notStartedModules, color: '#D6E2EC' },
]

export default function ProgressAnalytics() {
  const { assessment, quizHistory } = useAppData()

  if (!assessment.completed) {
    return (
      <EmptyState
        icon={ClipboardList}
        title="No progress data yet"
        description="Complete the competency assessment to start tracking your progress over time."
        action={
          <Link to="/assessment">
            <Button size="sm">Start assessment</Button>
          </Link>
        }
      />
    )
  }

  const avgQuizPct = quizHistory.length
    ? Math.round((quizHistory.reduce((sum, q) => sum + q.score / q.total, 0) / quizHistory.length) * 100)
    : 0

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-xl font-semibold text-ink-900 sm:text-2xl">Progress Analytics</h2>
        <p className="text-sm text-ink-700/70">Your competency development and learning activity over time.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={TrendingUp} label="Overall competency" value={`${assessment.analysis.overallScore}%`} trend="+18 pts since Apr" trendTone="positive" accent="navy" />
        <StatCard icon={Award} label="Avg. quiz score" value={`${avgQuizPct}%`} trend={`${quizHistory.length} attempts`} trendTone="neutral" accent="moss" />
        <StatCard icon={BookOpen} label="Modules completed" value={learningCompletion.completedModules} trend="of 7 total" trendTone="neutral" accent="sand" />
        <StatCard icon={Clock} label="Hours invested" value={`${learningCompletion.totalHoursSpent}h`} trend="This cycle" trendTone="neutral" accent="rust" />
      </div>

      <ChartCard title="Overall competency over time" subtitle="Monthly snapshot">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={competencyHistory}>
            <CartesianGrid strokeDasharray="3 3" stroke="#EEF3F7" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
            <Tooltip formatter={(v) => [`${v}%`, 'Overall']} />
            <Line type="monotone" dataKey="overall" stroke="#173347" strokeWidth={2.5} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      <div className="grid gap-5 lg:grid-cols-3">
        <ChartCard title="Skill-wise progress" className="lg:col-span-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={skillProgressHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="#EEF3F7" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              {Object.keys(skillColors).map((key) => (
                <Line key={key} type="monotone" dataKey={key} stroke={skillColors[key]} strokeWidth={2} dot={false} />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Learning completion">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={completionData} dataKey="value" nameKey="name" innerRadius={55} outerRadius={80} paddingAngle={2}>
                {completionData.map((d) => <Cell key={d.name} fill={d.color} />)}
              </Pie>
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: 11 }} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <Card>
        <CardHeader title="Current skill standing" />
        <div className="space-y-4">
          {assessment.analysis.skillScores.map((s) => (
            <ProgressBar key={s.id} label={s.name} value={s.score} tone={s.tone} />
          ))}
        </div>
      </Card>
    </div>
  )
}
