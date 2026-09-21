import React from 'react'

export default function StatCard({
  icon: Icon,
  label,
  value,
  trend,
  trendTone = 'neutral',
  accent = 'green',
}) {

  const accentBg = {
    green: 'bg-green-50 text-green-700',
  }[accent] || 'bg-green-50 text-green-700'


  const trendColor = {
    positive: 'text-green-700',
    negative: 'text-green-800',
    neutral: 'text-green-900/60',
  }[trendTone]


  return (
    <div className="rounded-lg border border-green-100 bg-white p-5 shadow-card">

      <div className="flex items-center justify-between">

        <span
          className={`flex h-9 w-9 items-center justify-center rounded-md ${accentBg}`}
        >
          <Icon className="h-4.5 w-4.5" />
        </span>


        {trend && (
          <span
            className={`text-xs font-medium ${trendColor}`}
          >
            {trend}
          </span>
        )}

      </div>


      <p className="mt-4 text-2xl font-display font-semibold text-green-950">
        {value}
      </p>


      <p className="mt-1 text-sm text-green-900/70">
        {label}
      </p>

    </div>
  )
}