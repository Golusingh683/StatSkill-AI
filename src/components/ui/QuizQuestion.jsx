import React from 'react'
import { Check, X as XIcon } from 'lucide-react'

// Renders a single MCQ. Works both in "answering" mode (quiz in
// progress) and "review" mode (results page, with correctness shown).

export default function QuizQuestion({
  question,
  index,
  total,
  selectedIndex,
  onSelect,
  reviewMode = false,
}) {
  return (
    <div>
      <p className="mb-1 text-xs font-medium uppercase tracking-wide text-navy-500">
        Question {index + 1} of {total} &middot; {question.topic}
      </p>
      <h3 className="mb-5 text-lg font-medium leading-snug text-ink-900">{question.question}</h3>
      <div className="space-y-2.5">
        {question.options.map((opt, i) => {
          const isSelected = selectedIndex === i
          const isCorrect = i === question.correctIndex
          let stateClasses = 'border-navy-200 hover:border-navy-400 hover:bg-navy-50'

          if (reviewMode) {
            if (isCorrect) stateClasses = 'border-moss-400 bg-moss-50'
            else if (isSelected && !isCorrect) stateClasses = 'border-rust-400 bg-rust-50'
            else stateClasses = 'border-navy-100 opacity-70'
          } else if (isSelected) {
            stateClasses = 'border-navy-600 bg-navy-50 ring-1 ring-navy-500'
          }

          return (
            <button
              key={i}
              type="button"
              disabled={reviewMode}
              onClick={() => onSelect?.(i)}
              className={`flex w-full items-center justify-between rounded-md border px-4 py-3 text-left text-sm transition-colors ${stateClasses} ${reviewMode ? 'cursor-default' : ''}`}
            >
              <span className="text-ink-900">{opt}</span>
              {reviewMode && isCorrect && <Check className="h-4 w-4 shrink-0 text-moss-600" />}
              {reviewMode && isSelected && !isCorrect && <XIcon className="h-4 w-4 shrink-0 text-rust-500" />}
            </button>
          )
        })}
      </div>
      {reviewMode && question.explanation && (
        <div className="mt-4 rounded-md bg-navy-50 px-4 py-3 text-sm text-ink-800">
          <span className="font-medium">Why: </span>
          {question.explanation}
        </div>
      )}
    </div>
  )
}
