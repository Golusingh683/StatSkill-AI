import React, {
  useEffect,
  useState,
} from 'react'

import {
  Mail,
  Building2,
  MapPin,
  CalendarDays,
  Award,
  ClipboardList,
  Pencil,
  Save,
  X,
  ShieldCheck,
} from 'lucide-react'

import {
  Link,
} from 'react-router-dom'

import Card, {
  CardHeader,
} from '../components/ui/Card'

import Badge from '../components/ui/Badge'

import ProgressBar from '../components/ui/ProgressBar'

import Button from '../components/ui/Button'

import {
  useAuth,
} from '../hooks/useAuth.jsx'

import {
  useAppData,
} from '../hooks/useAppData.jsx'

import {
  learningModules,
} from '../data/learningModules'

import {
  learningCompletion,
} from '../data/progress'

import {
  initialsOf,
} from '../utils/format'


export default function Profile() {

  const {
    user,
    updateProfile,
  } = useAuth()

  const {
    assessment,
    quizHistory,
  } = useAppData()


  const completedModules =
    learningModules.filter(
      (m) =>
        m.progress === 100
    )


  // =======================================================
  // EDIT STATE
  // =======================================================

  const [editing, setEditing] =
    useState(false)

  const [saving, setSaving] =
    useState(false)

  const [error, setError] =
    useState('')


  const [form, setForm] =
    useState({
      name: '',
      role: '',
      department: '',
      location: '',
    })


  // =======================================================
  // LOAD USER DATA
  // =======================================================

  useEffect(() => {

    if (!user) return

    setForm({

      name:
        user.name || '',

      role:
        user.role || '',

      department:
        user.department || '',

      location:
        user.location || '',

    })

  }, [user])


  // =======================================================
  // START EDIT
  // =======================================================

  const handleEdit =
    () => {

      setError('')

      setForm({

        name:
          user?.name || '',

        role:
          user?.role || '',

        department:
          user?.department || '',

        location:
          user?.location || '',

      })

      setEditing(true)

    }


  // =======================================================
  // CANCEL
  // =======================================================

  const handleCancel =
    () => {

      setError('')

      setEditing(false)

      setForm({

        name:
          user?.name || '',

        role:
          user?.role || '',

        department:
          user?.department || '',

        location:
          user?.location || '',

      })

    }


  // =======================================================
  // CHANGE
  // =======================================================

  const handleChange =
    (field, value) => {

      setForm(
        (prev) => ({
          ...prev,
          [field]: value,
        })
      )

    }


  // =======================================================
  // SAVE
  // =======================================================

  const handleSave =
    async (e) => {

      e.preventDefault()

      setError('')


      if (!form.name.trim()) {

        setError(
          'Name cannot be empty.'
        )

        return
      }


      setSaving(true)


      try {

        await updateProfile({

          name:
            form.name,

          role:
            form.role,

          department:
            form.department,

          location:
            form.location,

        })


        setEditing(false)

      } catch (err) {

        setError(
          err.message
        )

      } finally {

        setSaving(false)

      }

    }


  if (!user) {
    return null
  }


  return (

    <div className="space-y-6">


      {/* =================================================
          PROFILE HEADER
      ================================================= */}

      <Card>

        <div className="flex flex-col gap-5 lg:flex-row lg:items-center">

          {/* AVATAR */}

          <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full bg-navy-700 text-2xl font-semibold text-white">

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

          </div>


          {/* USER INFO */}

          <div className="min-w-0 flex-1">

            <div className="flex flex-wrap items-center gap-2">

              <h2 className="font-display text-2xl font-semibold text-ink-900">

                {user.name}

              </h2>


              {user.authProvider === 'google' && (

                <Badge tone="strong">

                  Google account

                </Badge>

              )}

            </div>


            <p className="mt-1 text-sm text-ink-700/70">

              {user.role ||
                'Learner'}

            </p>


            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-ink-700/60">

              <span className="flex items-center gap-1.5">

                <Mail className="h-3.5 w-3.5" />

                {user.email}

              </span>


              {user.department && (

                <span className="flex items-center gap-1.5">

                  <Building2 className="h-3.5 w-3.5" />

                  {user.department}

                </span>

              )}


              {user.location && (

                <span className="flex items-center gap-1.5">

                  <MapPin className="h-3.5 w-3.5" />

                  {user.location}

                </span>

              )}


              <span className="flex items-center gap-1.5">

                <CalendarDays className="h-3.5 w-3.5" />

                Joined {user.joinedYear}

              </span>

            </div>

          </div>


          {/* EDIT BUTTON */}

          {!editing && (

            <Button
              variant="secondary"
              icon={Pencil}
              onClick={handleEdit}
            >

              Edit profile

            </Button>

          )}

        </div>

      </Card>


      {/* =================================================
          EDIT FORM
      ================================================= */}

      {editing && (

        <Card>

          <div className="flex items-center gap-2">

            <Pencil className="h-5 w-5 text-navy-600" />

            <div>

              <h3 className="text-base font-semibold text-ink-900">

                Edit profile

              </h3>

              <p className="text-xs text-ink-700/60">

                Update your profile information.

              </p>

            </div>

          </div>


          <form
            onSubmit={handleSave}
            className="mt-5 space-y-4"
          >

            {/* NAME */}

            <div>

              <label className="mb-1.5 block text-sm font-medium text-ink-900">

                Full name

              </label>

              <input
                value={form.name}
                onChange={(e) =>
                  handleChange(
                    'name',
                    e.target.value
                  )
                }
                className="w-full rounded-md border border-navy-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-navy-500 focus:ring-1 focus:ring-navy-500"
              />

            </div>


            {/* EMAIL */}

            <div>

              <label className="mb-1.5 block text-sm font-medium text-ink-900">

                Email address

              </label>

              <input
                value={user.email}
                disabled
                className="w-full cursor-not-allowed rounded-md border border-navy-100 bg-navy-50 px-3 py-2.5 text-sm text-ink-700/60"
              />

              <p className="mt-1 text-xs text-ink-700/50">

                Email cannot be changed here.

              </p>

            </div>


            {/* ROLE */}

            <div>

              <label className="mb-1.5 block text-sm font-medium text-ink-900">

                Role

              </label>

              <input
                value={form.role}
                onChange={(e) =>
                  handleChange(
                    'role',
                    e.target.value
                  )
                }
                placeholder="e.g. Statistical Officer"
                className="w-full rounded-md border border-navy-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-navy-500 focus:ring-1 focus:ring-navy-500"
              />

            </div>


            {/* DEPARTMENT */}

            <div>

              <label className="mb-1.5 block text-sm font-medium text-ink-900">

                Department

              </label>

              <input
                value={form.department}
                onChange={(e) =>
                  handleChange(
                    'department',
                    e.target.value
                  )
                }
                placeholder="e.g. National Sample Survey Office"
                className="w-full rounded-md border border-navy-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-navy-500 focus:ring-1 focus:ring-navy-500"
              />

            </div>


            {/* LOCATION */}

            <div>

              <label className="mb-1.5 block text-sm font-medium text-ink-900">

                Location

              </label>

              <input
                value={form.location}
                onChange={(e) =>
                  handleChange(
                    'location',
                    e.target.value
                  )
                }
                placeholder="e.g. Pune"
                className="w-full rounded-md border border-navy-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-navy-500 focus:ring-1 focus:ring-navy-500"
              />

            </div>


            {/* ERROR */}

            {error && (

              <div className="rounded-md border border-rust-200 bg-rust-50 px-3 py-2 text-sm text-rust-700">

                {error}

              </div>

            )}


            {/* ACTIONS */}

            <div className="flex justify-end gap-2 pt-2">

              <Button
                type="button"
                variant="secondary"
                icon={X}
                onClick={handleCancel}
              >

                Cancel

              </Button>


              <Button
                type="submit"
                icon={Save}
                loading={saving}
              >

                Save changes

              </Button>

            </div>

          </form>

        </Card>

      )}


      {/* =================================================
          COMPETENCY + STATS
      ================================================= */}

      <div className="grid gap-5 lg:grid-cols-2">


        {/* COMPETENCY */}

        <Card>

          <CardHeader
            title="Competency snapshot"
            icon={ClipboardList}
          />


          {assessment?.completed ? (

            <div className="space-y-4">

              {(
                assessment.analysis
                  ?.skillScores || []
              ).map(
                (skill) => (

                  <ProgressBar
                    key={skill.id}
                    label={skill.name}
                    value={skill.score}
                    tone={skill.tone}
                  />

                )
              )}

            </div>

          ) : (

            <div className="text-sm text-ink-700/60">

              No assessment completed yet.

              <Link
                to="/assessment"
                className="ml-1 font-medium text-navy-600 hover:underline"
              >

                Take it now

              </Link>

            </div>

          )}

        </Card>


        {/* LEARNING STATS */}

        <Card>

          <CardHeader
            title="Learning statistics"
            icon={Award}
          />


          <div className="grid grid-cols-2 gap-4 text-center">

            <div className="rounded-md bg-navy-50 py-4">

              <p className="font-display text-2xl font-semibold text-ink-900">

                {
                  learningCompletion
                    .completedModules
                }

              </p>

              <p className="text-xs text-ink-700/60">

                Modules completed

              </p>

            </div>


            <div className="rounded-md bg-navy-50 py-4">

              <p className="font-display text-2xl font-semibold text-ink-900">

                {
                  learningCompletion
                    .totalHoursSpent
                }h

              </p>

              <p className="text-xs text-ink-700/60">

                Hours invested

              </p>

            </div>


            <div className="rounded-md bg-navy-50 py-4">

              <p className="font-display text-2xl font-semibold text-ink-900">

                {quizHistory.length}

              </p>

              <p className="text-xs text-ink-700/60">

                Quizzes attempted

              </p>

            </div>


            <div className="rounded-md bg-navy-50 py-4">

              <p className="font-display text-2xl font-semibold text-ink-900">

                {
                  assessment?.completed
                    ? `${assessment.analysis?.overallScore || 0}%`
                    : '—'
                }

              </p>

              <p className="text-xs text-ink-700/60">

                Overall competency

              </p>

            </div>

          </div>

        </Card>

      </div>


      {/* =================================================
          COMPLETED MODULES
      ================================================= */}

      <Card>

        <CardHeader
          title="Completed modules"
        />


        {completedModules.length ? (

          <ul className="divide-y divide-navy-100">

            {completedModules.map(
              (module) => (

                <li
                  key={module.id}
                  className="flex items-center justify-between py-2.5 text-sm"
                >

                  <span className="text-ink-900">

                    {module.title}

                  </span>


                  <Badge tone="strong">

                    Completed

                  </Badge>

                </li>

              )
            )}

          </ul>

        ) : (

          <p className="text-sm text-ink-700/60">

            No modules completed yet.

          </p>

        )}

      </Card>


      {/* =================================================
          ACCOUNT INFO
      ================================================= */}

      <Card className="bg-navy-50/50">

        <div className="flex items-start gap-3">

          <ShieldCheck className="mt-0.5 h-5 w-5 text-navy-600" />

          <div>

            <h3 className="text-sm font-semibold text-ink-900">

              Account information

            </h3>

            <p className="mt-1 text-xs leading-relaxed text-ink-700/60">

              Your profile information is saved locally
              in this frontend version of StatSkill AI.

            </p>

          </div>

        </div>

      </Card>

    </div>

  )
}