import React from 'react'
import { Users, Target, Award, Activity, ShieldCheck } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, AreaChart, Area } from 'recharts'
import Card, { CardHeader } from '../components/ui/Card'
import ChartCard from '../components/ui/ChartCard'
import StatCard from '../components/ui/StatCard'
import ProgressBar from '../components/ui/ProgressBar'
import Badge from '../components/ui/Badge'
import {
  orgStats,
  commonGaps,
  regionActivity,
  monthlyActiveUsers,
  learningCompletionOrg,
} from '../data/adminMock'

export default function Admin() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <ShieldCheck className="h-5 w-5 text-navy-700" />
        <div>
          <h2 className="font-display text-xl font-semibold text-ink-900 sm:text-2xl">Admin Dashboard</h2>
          <p className="text-sm text-ink-700/70">Organization-wide view for training administrators.</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Users} label="Total learners" value={orgStats.totalLearners.toLocaleString('en-IN')} trend={`${orgStats.activeThisMonth} active this month`} trendTone="positive" accent="navy" />
        <StatCard icon={Target} label="Average competency" value={`${orgStats.averageCompetency}%`} trend="Org-wide" trendTone="neutral" accent="sand" />
        <StatCard icon={Award} label="Average quiz score" value={`${orgStats.avgQuizScore}%`} trend="Last 30 days" trendTone="neutral" accent="moss" />
        <StatCard icon={Activity} label="Monthly active learners" value={monthlyActiveUsers.at(-1).active} trend="+37 vs last month" trendTone="positive" accent="rust" />
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <ChartCard title="Most common competency gaps" subtitle="% of learners scoring below 60% in each skill">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={commonGaps} layout="vertical" margin={{ left: 8, right: 24 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#EEF3F7" horizontal={false} />
              <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 12 }} />
              <YAxis type="category" dataKey="skill" width={140} tick={{ fontSize: 12 }} />
              <Tooltip formatter={(v) => [`${v}%`, 'Learners affected']} />
              <Bar dataKey="percentOfLearners" fill="#A8402F" radius={[0, 6, 6, 0]} barSize={18} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="User activity" subtitle="Monthly active learners">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyActiveUsers}>
              <defs>
                <linearGradient id="activeGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#396A8C" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#396A8C" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#EEF3F7" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Area type="monotone" dataKey="active" stroke="#173347" strokeWidth={2} fill="url(#activeGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <Card>
        <CardHeader title="Regional breakdown" subtitle="Learner count and average competency by region" />
        <div className="overflow-x-auto">
          <table className="w-full min-w-[480px] text-left text-sm">
            <thead>
              <tr className="border-b border-navy-100 text-xs uppercase tracking-wide text-ink-700/50">
                <th className="py-2 pr-4 font-medium">Region</th>
                <th className="py-2 pr-4 font-medium">Learners</th>
                <th className="py-2 pr-4 font-medium">Avg. competency</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-100">
              {regionActivity.map((r) => (
                <tr key={r.region}>
                  <td className="py-3 pr-4 font-medium text-ink-900">{r.region}</td>
                  <td className="py-3 pr-4 text-ink-700/80">{r.learners}</td>
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-3">
                      <ProgressBar value={r.avgCompetency} showValue={false} size="sm" className="w-32" />
                      <Badge tone={r.avgCompetency >= 65 ? 'strong' : r.avgCompetency >= 55 ? 'moderate' : 'weak'}>
                        {r.avgCompetency}%
                      </Badge>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card>
        <CardHeader title="Learning completion across the organization" />
        <div className="grid gap-4 sm:grid-cols-3">
          <ProgressBar label="Completed" value={learningCompletionOrg.completedPercent} tone="strong" />
          <ProgressBar label="In progress" value={learningCompletionOrg.inProgressPercent} tone="moderate" />
          <ProgressBar label="Not started" value={learningCompletionOrg.notStartedPercent} tone="weak" />
        </div>
      </Card>
    </div>
  )
}
