import React from 'react'
import {
  BarChart3,
  Sparkles,
  Target,
  TrendingUp,
  CheckCircle2,
} from 'lucide-react'

export default function AuthLayout({ children }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Left — Product introduction */}
      <div className="relative hidden overflow-hidden bg-ink-900 p-10 text-white lg:flex lg:flex-col lg:justify-between">
        {/* Decorative background */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-sand-400/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-navy-500/20 blur-3xl" />

        {/* Logo */}
        <div className="relative flex items-center gap-2.5">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sand-400 text-ink-900 shadow-lg">
            <BarChart3 className="h-5 w-5" />
          </span>

          <div>
            <span className="block font-display text-lg font-bold">
              StatSkill AI
            </span>

            <span className="text-xs text-white/50">
              Learn smarter. Grow stronger.
            </span>
          </div>
        </div>

        {/* Main Hero */}
        <div className="relative max-w-lg">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-sand-300">
            <Sparkles className="h-3.5 w-3.5" />
            AI-powered learning platform
          </div>

          <h2 className="font-display text-4xl font-semibold leading-tight">
            Turn your skills into
            <br />
            <span className="text-sand-300">Real Progress.</span>
          </h2>

          <p className="mt-5 max-w-md text-sm leading-7 text-white/65">
            Discover your strengths, identify areas to improve, and follow a
            personalized learning journey designed around your goals.
          </p>

          {/* Feature cards */}
          <div className="mt-8 grid gap-3">
            <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-sand-400/15 text-sand-300">
                <Target className="h-5 w-5" />
              </div>

              <div>
                <p className="text-sm font-medium text-white">
                  Identify skill gaps
                </p>

                <p className="mt-0.5 text-xs text-white/45">
                  Understand where you can improve
                </p>
              </div>

              <CheckCircle2 className="ml-auto h-4 w-4 text-sand-300" />
            </div>

            <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-sand-400/15 text-sand-300">
                <Sparkles className="h-5 w-5" />
              </div>

              <div>
                <p className="text-sm font-medium text-white">
                  Personalized learning
                </p>

                <p className="mt-0.5 text-xs text-white/45">
                  Get recommendations based on your skills
                </p>
              </div>

              <CheckCircle2 className="ml-auto h-4 w-4 text-sand-300" />
            </div>

            <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-sand-400/15 text-sand-300">
                <TrendingUp className="h-5 w-5" />
              </div>

              <div>
                <p className="text-sm font-medium text-white">
                  Track your growth
                </p>

                <p className="mt-0.5 text-xs text-white/45">
                  See your progress over time
                </p>
              </div>

              <CheckCircle2 className="ml-auto h-4 w-4 text-sand-300" />
            </div>
          </div>
        </div>

        {/* Bottom stats */}
        <div className="relative flex items-center gap-8 border-t border-white/10 pt-6">
          <div>
            <p className="font-display text-xl font-semibold text-white">
              AI
            </p>

            <p className="mt-0.5 text-xs text-white/45">
              Powered insights
            </p>
          </div>

          <div className="h-8 w-px bg-white/10" />

          <div>
            <p className="font-display text-xl font-semibold text-white">
              24/7
            </p>

            <p className="mt-0.5 text-xs text-white/45">
              Learn at your pace
            </p>
          </div>

          <div className="h-8 w-px bg-white/10" />

          <div>
            <p className="font-display text-xl font-semibold text-white">
              100%
            </p>

            <p className="mt-0.5 text-xs text-white/45">
              Personalized journey
            </p>
          </div>
        </div>
      </div>

      {/* Right — Login */}
      <div className="flex min-h-screen items-center justify-center bg-canvas p-6 sm:p-10">
        <div className="w-full max-w-sm">
          {children}
        </div>
      </div>
    </div>
  )
}