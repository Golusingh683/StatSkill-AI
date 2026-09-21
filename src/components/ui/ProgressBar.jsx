import React from 'react'

const toneColors = {
  strong: 'bg-green-600',
  moderate: 'bg-green-500',
  weak: 'bg-green-400',
  neutral: 'bg-green-700',
}

export default function ProgressBar({
  value,
  tone = 'neutral',
  label,
  showValue = true,
  size = 'md',
  className = '',
}) {
  const clamped = Math.max(0, Math.min(100, value))
  const height = size === 'sm' ? 'h-1.5' : 'h-2.5'

  return (
    <div className={className}>

      {(label || showValue) && (
        <div className="mb-1.5 flex items-center justify-between text-xs text-green-900/80">
          {label && <span>{label}</span>}

          {showValue && (
            <span className="font-medium text-green-950">
              {clamped}%
            </span>
          )}
        </div>
      )}

      <div
        className={`w-full overflow-hidden rounded-full bg-green-50 ${height}`}
      >

        <div
          className={`${height} rounded-full ${toneColors[tone]} transition-[width] duration-500 ease-out`}
          style={{ width: `${clamped}%` }}
          role="progressbar"
          aria-valuenow={clamped}
          aria-valuemin={0}
          aria-valuemax={100}
        />

      </div>

    </div>
  )
}