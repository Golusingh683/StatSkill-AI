import React from 'react'
import { ChevronDown } from 'lucide-react'

export default function Select({ label, options, className = '', id, ...props }) {
  const selectId = id || props.name
  return (
    <div className={className}>
      {label && (
        <label htmlFor={selectId} className="mb-1.5 block text-sm font-medium text-ink-800">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={selectId}
          className="w-full appearance-none rounded-md border border-navy-200 bg-white py-2 pl-3 pr-9 text-sm text-ink-900 focus:border-navy-500 focus:outline-none focus:ring-2 focus:ring-navy-100"
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute inset-y-0 right-3 my-auto h-4 w-4 text-ink-700/50" />
      </div>
    </div>
  )
}
