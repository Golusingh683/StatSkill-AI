import React from 'react'
import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  ClipboardList,
  Target,
  GraduationCap,
  Sparkles,
  BookOpenCheck,
  LineChart,
  UserCircle,
  ShieldCheck,
  X,
  LogOut,
  BarChart3,
} from 'lucide-react'
import { useAuth } from '../../hooks/useAuth.jsx'
import { initialsOf } from '../../utils/format'

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/assessment', label: 'Assessment', icon: ClipboardList },
  { to: '/competency-gaps', label: 'Competency Gaps', icon: Target },
  { to: '/learning', label: 'Learning', icon: GraduationCap },
  { to: '/quiz-generator', label: 'AI Quiz Generator', icon: Sparkles },
  { to: '/quizzes', label: 'Quizzes', icon: BookOpenCheck },
  { to: '/progress', label: 'Progress', icon: LineChart },
  { to: '/profile', label: 'Profile', icon: UserCircle },
  { to: '/admin', label: 'Admin', icon: ShieldCheck },
]

export default function Sidebar({ mobileOpen, onClose }) {
  const { user, logout } = useAuth()

  const content = (
    <div className="flex h-full flex-col bg-green-900 text-white">

      {/* Logo / Website Name */}
      <div className="flex items-center gap-2.5 px-5 py-5">

        <span className="flex h-9 w-9 items-center justify-center rounded-md bg-green-100 text-green-800">
          <BarChart3 className="h-5 w-5" />
        </span>

        <div className="leading-tight">
          <p className="font-display text-[15px] font-bold tracking-tight text-white">
            StatSkill AI
          </p>

          <p className="text-[11px] text-white/60">
            MoSPI Capacity Building
          </p>
        </div>

        <button
          onClick={onClose}
          className="ml-auto rounded p-1 text-white/60 hover:bg-white/10 lg:hidden"
          aria-label="Close menu"
        >
          <X className="h-5 w-5" />
        </button>

      </div>


      {/* Navigation */}
      <nav className="scrollbar-thin flex-1 overflow-y-auto px-3 py-2">

        <ul className="space-y-0.5">

          {navItems.map(({ to, label, icon: Icon }) => (

            <li key={to}>

              <NavLink
                to={to}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors ${
                    isActive
                      ? 'bg-white/15 font-medium text-white'
                      : 'text-white/75 hover:bg-white/10 hover:text-white'
                  }`
                }
              >

                <Icon className="h-4 w-4 shrink-0" />

                {label}

              </NavLink>

            </li>

          ))}

        </ul>

      </nav>


      {/* User Section */}
      <div className="border-t border-white/10 p-3">

        <div className="flex items-center gap-3 rounded-md px-2 py-2">

          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-100 text-sm font-semibold text-green-800">
            {initialsOf(user?.name)}
          </span>

          <div className="min-w-0 flex-1">

            <p className="truncate text-sm font-medium text-white">
              {user?.name}
            </p>

            <p className="truncate text-xs text-white/60">
              {user?.role}
            </p>

          </div>

          <button
            onClick={logout}
            className="rounded p-1.5 text-white/60 hover:bg-white/10"
            aria-label="Log out"
          >
            <LogOut className="h-4 w-4" />
          </button>

        </div>

      </div>

    </div>
  )


  return (
    <>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:w-64 lg:shrink-0">

        <div className="fixed inset-y-0 left-0 w-64">
          {content}
        </div>

      </aside>


      {/* Mobile slide-over */}
      {mobileOpen && (

        <div className="fixed inset-0 z-40 lg:hidden">

          <div
            className="absolute inset-0 bg-green-950/50"
            onClick={onClose}
            aria-hidden="true"
          />

          <div className="absolute inset-y-0 left-0 w-72 shadow-raised">
            {content}
          </div>

        </div>

      )}

    </>
  )
}