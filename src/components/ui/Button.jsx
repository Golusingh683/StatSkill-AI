import React from 'react'

const variants = {
  primary:
    'bg-green-700 text-white hover:bg-green-800 disabled:bg-green-300',

  secondary:
    'bg-white text-green-700 border border-green-200 hover:bg-green-50 disabled:text-green-300',

  ghost:
    'bg-transparent text-green-700 hover:bg-green-50 disabled:text-green-300',

  danger:
    'bg-green-700 text-white hover:bg-green-800 disabled:bg-green-300',

  sand:
    'bg-green-600 text-white hover:bg-green-700 disabled:bg-green-200',
}

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-5 py-2.5 text-base',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  loading = false,
  className = '',
  disabled,
  ...props
}) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : (
        Icon &&
        iconPosition === 'left' && (
          <Icon className="h-4 w-4" />
        )
      )}

      {children}

      {!loading &&
        Icon &&
        iconPosition === 'right' && (
          <Icon className="h-4 w-4" />
        )}
    </button>
  )
}