import React from 'react'
import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Target,
  Sparkles,
  LineChart,
  UserCircle,
} from 'lucide-react'

const items = [
  { to: '/dashboard', label: 'Home', icon: LayoutDashboard },
  { to: '/competency-gaps', label: 'Gaps', icon: Target },
  { to: '/quiz-generator', label: 'AI Quiz', icon: Sparkles },
  { to: '/progress', label: 'Progress', icon: LineChart },
  { to: '/profile', label: 'Profile', icon: UserCircle },
]

export default function BottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 flex border-t border-green-100 bg-white lg:hidden">
      {items.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `flex flex-1 flex-col items-center gap-0.5 py-2 text-[11px] ${
              isActive
                ? 'text-green-700'
                : 'text-green-900/50'
            }`
          }
        >
          <Icon className="h-5 w-5" />
          {label}
        </NavLink>
      ))}
    </nav>
  )
}