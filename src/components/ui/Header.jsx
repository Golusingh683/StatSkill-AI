import React, {
  useEffect,
  useRef,
  useState,
} from 'react'

import {
  Bell,
  ChevronDown,
  LogOut,
  Menu,
  UserCircle,
} from 'lucide-react'

import {
  Link,
  useNavigate,
} from 'react-router-dom'

import {
  useAuth,
} from '../../hooks/useAuth.jsx'

import {
  initialsOf,
} from '../../utils/format'


export default function Header({
  title,
  subtitle,
  onMenuClick,
}) {

  const {
    user,
    logout,
  } = useAuth()

  const navigate =
    useNavigate()

  const [open, setOpen] =
    useState(false)

  const menuRef =
    useRef(null)


  // =======================================================
  // CLOSE DROPDOWN OUTSIDE
  // =======================================================

  useEffect(() => {

    const handleClick =
      (event) => {

        if (
          menuRef.current &&
          !menuRef.current.contains(
            event.target
          )
        ) {

          setOpen(false)

        }

      }


    document.addEventListener(
      'mousedown',
      handleClick
    )


    return () => {

      document.removeEventListener(
        'mousedown',
        handleClick
      )

    }

  }, [])


  // =======================================================
  // LOGOUT
  // =======================================================

  const handleLogout =
    () => {

      setOpen(false)

      logout()

      navigate(
        '/login',
        {
          replace: true,
        }
      )

    }


  if (!user) {
    return null
  }


  return (

    <header className="sticky top-0 z-30 border-b border-green-100 bg-white">

      <div className="flex h-20 items-center justify-between px-4 sm:px-6">

        {/* =================================================
            LEFT
        ================================================= */}

        <div className="flex min-w-0 items-center gap-3">

          {/* MOBILE MENU */}

          <button
            type="button"
            onClick={onMenuClick}
            className="rounded-md p-2 text-green-800 hover:bg-green-50 lg:hidden"
            aria-label="Open navigation"
          >

            <Menu className="h-5 w-5" />

          </button>


          {/* TITLE */}

          <div className="min-w-0">

            <h1 className="truncate font-display text-xl font-semibold text-green-950">

              {title}

            </h1>

            {subtitle && (

              <p className="hidden truncate text-sm text-green-900/60 sm:block">

                {subtitle}

              </p>

            )}

          </div>

        </div>


        {/* =================================================
            RIGHT
        ================================================= */}

        <div className="flex items-center gap-3">

          {/* NOTIFICATION */}

          <button
            type="button"
            className="relative rounded-full p-2.5 text-green-800 transition hover:bg-green-50"
            aria-label="Notifications"
          >

            <Bell className="h-5 w-5" />

            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-green-600" />

          </button>


          {/* =================================================
              PROFILE DROPDOWN
          ================================================= */}

          <div
            className="relative"
            ref={menuRef}
          >

            <button
              type="button"
              onClick={() =>
                setOpen(
                  (previous) =>
                    !previous
                )
              }
              className="flex items-center gap-2 rounded-full p-1 transition hover:bg-green-50"
              aria-label="Open profile menu"
              aria-expanded={open}
            >

              {/* AVATAR */}

              <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-green-100 text-sm font-semibold text-green-800">

                {user.picture ? (

                  <img
                    src={user.picture}
                    alt={user.name}
                    className="h-full w-full object-cover"
                  />

                ) : (

                  initialsOf(
                    user.name
                  )

                )}

              </span>


              <ChevronDown
                className={`hidden h-4 w-4 text-green-900/60 transition sm:block ${
                  open
                    ? 'rotate-180'
                    : ''
                }`}
              />

            </button>


            {/* =================================================
                MENU
            ================================================= */}

            {open && (

              <div className="absolute right-0 top-12 w-64 overflow-hidden rounded-lg border border-green-100 bg-white shadow-lg">

                {/* USER */}

                <div className="border-b border-green-100 px-4 py-3">

                  <p className="truncate text-sm font-semibold text-green-950">

                    {user.name}

                  </p>

                  <p className="truncate text-xs text-green-900/60">

                    {user.email}

                  </p>

                </div>


                {/* PROFILE */}

                <Link
                  to="/profile"
                  onClick={() =>
                    setOpen(false)
                  }
                  className="flex items-center gap-3 px-4 py-3 text-sm text-green-950 hover:bg-green-50"
                >

                  <UserCircle className="h-4 w-4 text-green-700" />

                  <span>
                    View profile
                  </span>

                </Link>


                {/* EDIT */}

                <Link
                  to="/profile"
                  onClick={() =>
                    setOpen(false)
                  }
                  className="flex items-center gap-3 px-4 py-3 text-sm text-green-950 hover:bg-green-50"
                >

                  <UserCircle className="h-4 w-4 text-green-700" />

                  <span>
                    Edit profile
                  </span>

                </Link>


                {/* LOGOUT */}

                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 border-t border-green-100 px-4 py-3 text-left text-sm text-green-700 hover:bg-green-50"
                >

                  <LogOut className="h-4 w-4" />

                  <span>
                    Sign out
                  </span>

                </button>

              </div>

            )}

          </div>

        </div>

      </div>

    </header>

  )
}