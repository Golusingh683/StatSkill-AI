import React from 'react'

export default function Card({
  children,
  className = '',
  padded = true,
  as: As = 'div',
  ...props
}) {
  return (
    <As
      className={`rounded-lg border border-green-100 bg-white shadow-card ${
        padded ? 'p-5 sm:p-6' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </As>
  )
}

export function CardHeader({
  title,
  subtitle,
  action,
  icon: Icon,
}) {
  return (
    <div className="mb-4 flex items-start justify-between gap-3">

      <div className="flex items-start gap-3">

        {Icon && (
          <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-green-50 text-green-700">
            <Icon className="h-4.5 w-4.5" />
          </span>
        )}

        <div>

          <h3 className="text-base font-semibold leading-tight text-green-950">
            {title}
          </h3>

          {subtitle && (
            <p className="mt-0.5 text-sm text-green-900/70">
              {subtitle}
            </p>
          )}

        </div>

      </div>

      {action}

    </div>
  )
}