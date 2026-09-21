import React, {
  useEffect,
  useRef,
  useState,
} from 'react'

import {
  Mail,
  Lock,
  LogIn,
  UserPlus,
  User,
  PlayCircle,
} from 'lucide-react'

import {
  useNavigate,
  useLocation,
} from 'react-router-dom'

import AuthLayout from '../layouts/AuthLayout'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'

import {
  useAuth,
} from '../hooks/useAuth.jsx'

import {
  useToast,
} from '../hooks/useToast.jsx'


export default function Login() {

  // =======================================================
  // MODE
  // =======================================================

  const [mode, setMode] =
    useState('signin')


  // =======================================================
  // FORM
  // =======================================================

  const [name, setName] =
    useState('')

  const [email, setEmail] =
    useState('')

  const [password, setPassword] =
    useState('')

  const [confirmPassword, setConfirmPassword] =
    useState('')


  // =======================================================
  // STATE
  // =======================================================

  const [error, setError] =
    useState('')

  const [loading, setLoading] =
    useState(false)

  const [demoLoading, setDemoLoading] =
    useState(false)

  const [googleLoading, setGoogleLoading] =
    useState(false)


  const googleButtonRef =
    useRef(null)


  // =======================================================
  // AUTH
  // =======================================================

  const {
    login,
    register,
    loginWithGoogle,
    loginAsDemo,
  } = useAuth()


  const {
    notify,
  } = useToast()


  const navigate =
    useNavigate()

  const location =
    useLocation()


  const redirectTo =
    location.state?.from ||
    '/dashboard'


  // =======================================================
  // GOOGLE IDENTITY SERVICES
  // =======================================================

  useEffect(() => {

    const clientId =
      import.meta.env
        .VITE_GOOGLE_CLIENT_ID

    if (!clientId) {
      return
    }


    const initializeGoogle =
      () => {

        if (
          !window.google ||
          !googleButtonRef.current
        ) {
          return
        }


        window.google.accounts.id.initialize({

          client_id: clientId,

          callback:
            async (response) => {

              try {

                setError('')
                setGoogleLoading(true)


                // Decode Google credential
                // JWT payload
                const payload =
                  JSON.parse(
                    atob(
                      response.credential
                        .split('.')[1]
                        .replace(
                          /-/g,
                          '+'
                        )
                        .replace(
                          /_/g,
                          '/'
                        )
                    )
                  )


                await loginWithGoogle({

                  name:
                    payload.name,

                  email:
                    payload.email,

                  picture:
                    payload.picture,

                })


                notify(
                  'Signed in with Google!',
                  {
                    type: 'success',
                  }
                )


                navigate(
                  redirectTo,
                  {
                    replace: true,
                  }
                )

              } catch (err) {

                setError(
                  err.message
                )

              } finally {

                setGoogleLoading(false)

              }

            },

        })


        googleButtonRef.current.innerHTML =
          ''

        window.google.accounts.id.renderButton(

          googleButtonRef.current,

          {
            theme: 'outline',

            size: 'large',

            width: 400,

            text: 'continue_with',

            shape: 'rectangular',
          }

        )
      }


    if (
      document.getElementById(
        'google-gsi-script'
      )
    ) {

      initializeGoogle()

      return
    }


    const script =
      document.createElement('script')

    script.id =
      'google-gsi-script'

    script.src =
      'https://accounts.google.com/gsi/client'

    script.async = true

    script.defer = true

    script.onload =
      initializeGoogle

    document.body.appendChild(
      script
    )


    return () => {
      // Do not remove the global script.
    }

  }, [
    loginWithGoogle,
    navigate,
    notify,
    redirectTo,
  ])


  // =======================================================
  // SWITCH MODE
  // =======================================================

  const switchMode =
    (nextMode) => {

      setMode(nextMode)

      setError('')

      setPassword('')

      setConfirmPassword('')
    }


  // =======================================================
  // FORM SUBMIT
  // =======================================================

  const handleSubmit =
    async (e) => {

      e.preventDefault()

      setError('')
      setLoading(true)


      try {

        // -------------------------------------------------
        // CREATE ACCOUNT
        // -------------------------------------------------

        if (
          mode === 'signup'
        ) {

          if (
            password !==
            confirmPassword
          ) {

            throw new Error(
              'Passwords do not match.'
            )

          }


          await register({

            name,

            email,

            password,

          })


          notify(
            'Account created successfully!',
            {
              type: 'success',
            }
          )


          navigate(
            redirectTo,
            {
              replace: true,
            }
          )

          return
        }


        // -------------------------------------------------
        // SIGN IN
        // -------------------------------------------------

        await login({

          email,

          password,

        })


        notify(
          'Welcome back!',
          {
            type: 'success',
          }
        )


        navigate(
          redirectTo,
          {
            replace: true,
          }
        )

      } catch (err) {

        setError(
          err.message
        )

      } finally {

        setLoading(false)

      }

    }


  // =======================================================
  // DEMO
  // =======================================================

  const handleDemo =
    async () => {

      setError('')
      setDemoLoading(true)


      try {

        await loginAsDemo()


        notify(
          'Signed in with demo account!',
          {
            type: 'success',
          }
        )


        navigate(
          '/dashboard',
          {
            replace: true,
          }
        )

      } catch (err) {

        setError(
          err.message
        )

      } finally {

        setDemoLoading(false)

      }

    }


  // =======================================================
  // UI
  // =======================================================

  return (

    <AuthLayout>

      {/* =================================================
          MOBILE LOGO
      ================================================= */}

      <div className="mb-8 lg:hidden">

        <div className="flex items-center gap-2.5">

          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-sand-400 text-ink-900">

            <LogIn className="h-5 w-5" />

          </span>

          <span className="font-display text-lg font-bold text-ink-900">

            StatSkill AI

          </span>

        </div>

      </div>


      {/* =================================================
          HEADING
      ================================================= */}

      <div>

        <h1 className="font-display text-3xl font-semibold text-ink-900">

          {mode === 'signin'
            ? 'Welcome back'
            : 'Create your account'}

        </h1>


        <p className="mt-2 text-sm leading-6 text-ink-700/70">

          {mode === 'signin'
            ? 'Sign in to continue your personalized learning journey.'
            : 'Create your StatSkill AI account to start your personalized learning journey.'}

        </p>

      </div>


      {/* =================================================
          MODE SWITCH
      ================================================= */}

      <div className="mt-6 grid grid-cols-2 rounded-lg bg-navy-50 p-1">

        <button
          type="button"
          onClick={() =>
            switchMode('signin')
          }
          className={`rounded-md px-3 py-2 text-sm font-medium transition ${
            mode === 'signin'
              ? 'bg-white text-navy-800 shadow-sm'
              : 'text-ink-700/60 hover:text-ink-900'
          }`}
        >

          Sign in

        </button>


        <button
          type="button"
          onClick={() =>
            switchMode('signup')
          }
          className={`rounded-md px-3 py-2 text-sm font-medium transition ${
            mode === 'signup'
              ? 'bg-white text-navy-800 shadow-sm'
              : 'text-ink-700/60 hover:text-ink-900'
          }`}
        >

          Create account

        </button>

      </div>


      {/* =================================================
          FORM
      ================================================= */}

      <form
        onSubmit={handleSubmit}
        className="mt-6 space-y-4"
        noValidate
      >

        {/* NAME */}

        {mode === 'signup' && (

          <Input

            label="Full name"

            type="text"

            name="name"

            icon={User}

            placeholder="Enter your full name"

            value={name}

            onChange={(e) =>
              setName(e.target.value)
            }

            autoComplete="name"

          />

        )}


        {/* EMAIL */}

        <Input

          label="Email address"

          type="email"

          name="email"

          icon={Mail}

          placeholder="Enter your email"

          value={email}

          onChange={(e) =>
            setEmail(e.target.value)
          }

          autoComplete="email"

        />


        {/* PASSWORD */}

        <Input

          label="Password"

          type="password"

          name="password"

          icon={Lock}

          placeholder={
            mode === 'signup'
              ? 'Create a password'
              : 'Enter your password'
          }

          value={password}

          onChange={(e) =>
            setPassword(e.target.value)
          }

          autoComplete={
            mode === 'signup'
              ? 'new-password'
              : 'current-password'
          }

          error={error}

        />


        {/* CONFIRM PASSWORD */}

        {mode === 'signup' && (

          <Input

            label="Confirm password"

            type="password"

            name="confirmPassword"

            icon={Lock}

            placeholder="Confirm your password"

            value={confirmPassword}

            onChange={(e) =>
              setConfirmPassword(
                e.target.value
              )
            }

            autoComplete="new-password"

          />

        )}


        {/* SUBMIT */}

        <Button

          type="submit"

          icon={
            mode === 'signin'
              ? LogIn
              : UserPlus
          }

          loading={loading}

          className="w-full"

        >

          {mode === 'signin'
            ? 'Sign in'
            : 'Create account'}

        </Button>

      </form>


      {/* =================================================
          GOOGLE
      ================================================= */}

      <div className="my-5 flex items-center gap-3 text-xs text-ink-700/40">

        <div className="h-px flex-1 bg-navy-100" />

        <span>or</span>

        <div className="h-px flex-1 bg-navy-100" />

      </div>


      <div className="relative">

        <div
          ref={googleButtonRef}
          className="flex min-h-10 justify-center"
        />

        {!import.meta.env.VITE_GOOGLE_CLIENT_ID && (

          <p className="text-center text-xs text-ink-700/50">

            Google sign-in needs a Google Client ID
            to be configured.

          </p>

        )}

      </div>


      {/* =================================================
          DEMO
      ================================================= */}

      <Button

        type="button"

        variant="secondary"

        icon={PlayCircle}

        loading={demoLoading}

        onClick={handleDemo}

        className="mt-4 w-full"

      >

        Continue with Demo

      </Button>


      {/* =================================================
          FOOTER
      ================================================= */}

      <p className="mt-6 text-center text-xs text-ink-700/50">

        {mode === 'signin'
          ? "Don't have an account? "
          : 'Already have an account? '}

        <button
          type="button"
          onClick={() =>
            switchMode(
              mode === 'signin'
                ? 'signup'
                : 'signin'
            )
          }
          className="font-medium text-navy-700 hover:underline"
        >

          {mode === 'signin'
            ? 'Create one'
            : 'Sign in'}

        </button>

      </p>

    </AuthLayout>

  )
}