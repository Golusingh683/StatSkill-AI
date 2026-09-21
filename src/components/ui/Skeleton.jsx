import React from 'react'

export function SkeletonLine({ className = '' }) {
  return <div className={`animate-pulse rounded bg-navy-100 ${className}`} />
}

export function SkeletonCard() {
  return (
    <div className="rounded-lg border border-navy-100 bg-white p-5 shadow-card">
      <SkeletonLine className="h-4 w-1/3" />
      <SkeletonLine className="mt-4 h-8 w-1/2" />
      <SkeletonLine className="mt-3 h-3 w-2/3" />
    </div>
  )
}
