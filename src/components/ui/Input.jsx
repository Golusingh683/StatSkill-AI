import React from 'react'

export default function Input({ label, error, icon: Icon, className = '', id, ...props }) {
  const inputId = id || props.name

  return (
    <div className={className}>
      {label && (
        <label htmlFor={inputId} className="mb-1.5 block text-sm font-medium text-ink-800">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-ink-700/40">
            <Icon className="h-4 w-4" />
          </span>
        )}
        <input
          id={inputId}
          className={`w-full rounded-md border ${error ? 'border-rust-400' : 'border-navy-200'} bg-white py-2 ${Icon ? 'pl-9' : 'pl-3'} pr-3 text-sm text-ink-900 placeholder:text-ink-700/40 focus:border-navy-500 focus:outline-none focus:ring-2 focus:ring-navy-100`}
          {...props}
        />
      </div>
      {error && <p className="mt-1 text-xs text-rust-500">{error}</p>}
    </div>
  )
}
