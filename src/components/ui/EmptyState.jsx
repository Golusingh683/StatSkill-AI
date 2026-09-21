import React from 'react'

export default function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-green-200 bg-green-50/40 px-6 py-12 text-center">

      {Icon && (
        <span className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white text-green-600 shadow-card">
          <Icon className="h-5 w-5" />
        </span>
      )}

      <h4 className="text-base font-semibold text-green-950">
        {title}
      </h4>

      {description && (
        <p className="mt-1 max-w-sm text-sm text-green-900/70">
          {description}
        </p>
      )}

      {action && (
        <div className="mt-4">
          {action}
        </div>
      )}

    </div>
  )
}