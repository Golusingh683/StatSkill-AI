import React from 'react'

const tones = {
  strong: 'bg-green-50 text-green-700 border-green-100',

  moderate: 'bg-green-100 text-green-700 border-green-200',

  weak: 'bg-green-50 text-green-800 border-green-200',

  neutral: 'bg-green-50 text-green-700 border-green-100',

  sand: 'bg-green-100 text-green-700 border-green-200',
}

export default function Badge({
  children,
  tone = 'neutral',
  className = '',
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  )
}