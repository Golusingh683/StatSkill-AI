import React from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'

import ProtectedRoute from './components/ProtectedRoute'
import AppLayout from './layouts/AppLayout'
import LearningModule from './pages/LearningModule'

import Chatbot from './components/chatbot/Chatbot'

import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Assessment from './pages/Assessment'
import CompetencyGaps from './pages/CompetencyGaps'
import Learning from './pages/Learning'
import CourseDetail from './pages/CourseDetail'
import Materials from './pages/Materials'
import QuizGenerator from './pages/QuizGenerator'
import Quizzes from './pages/Quizzes'
import Quiz from './pages/Quiz'
import QuizResults from './pages/QuizResults'
import ProgressAnalytics from './pages/Progress'
import Profile from './pages/Profile'
import Admin from './pages/Admin'


const pageMeta = {

  dashboard: {
    title: 'Dashboard',
    subtitle: 'Your competency development at a glance',
  },

  assessment: {
    title: 'Competency Assessment',
    subtitle: 'Assess your statistical skills',
  },

  'competency-gaps': {
    title: 'Competency Gap Analysis',
    subtitle: 'AI-generated breakdown of your skills',
  },

  learning: {
    title: 'Personalized Learning',
    subtitle: 'Recommended modules based on your profile',
  },

  materials: {
    title: 'Learning Materials',
    subtitle: 'Browse reference documents and guides',
  },

  'quiz-generator': {
    title: 'AI Quiz Generator',
    subtitle: 'Generate MCQs from your training material',
  },

  quizzes: {
    title: 'Quizzes',
    subtitle: 'Practice quizzes by competency',
  },

  quiz: {
    title: 'Quiz',
    subtitle: 'Answer each question, then submit',
  },

  'quiz-results': {
    title: 'Quiz Results',
    subtitle: 'Your score and topic-wise performance',
  },

  progress: {
    title: 'Progress Analytics',
    subtitle: 'Track your growth over time',
  },

  profile: {
    title: 'Profile',
    subtitle: 'Your information and learning statistics',
  },

  admin: {
    title: 'Admin Dashboard',
    subtitle: 'Organization-wide training insights',
  },

}


export default function App() {

  return (

    <>

      {/* =====================================================
          APPLICATION ROUTES
      ===================================================== */}

      <Routes>

        {/* =====================================================
            LOGIN
        ===================================================== */}

        <Route
          path="/login"
          element={<Login />}
        />


        {/* =====================================================
            DEFAULT ROUTE
        ===================================================== */}

        <Route
          path="/"
          element={
            <Navigate
              to="/dashboard"
              replace
            />
          }
        />


        {/* =====================================================
            PROTECTED APPLICATION
        ===================================================== */}

        <Route
          element={
            <ProtectedRoute>

              <AppLayoutWithMeta />

            </ProtectedRoute>
          }
        >

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/assessment"
            element={<Assessment />}
          />

          <Route
            path="/competency-gaps"
            element={<CompetencyGaps />}
          />


          {/* ===================================================
              LEARNING
          =================================================== */}

          <Route
            path="/learning"
            element={<Learning />}
          />

          <Route
            path="/learning/:courseId"
            element={<LearningModule />}
          />

          <Route
            path="/learning/:id"
            element={<CourseDetail />}
          />


          {/* ===================================================
              MATERIALS
          =================================================== */}

          <Route
            path="/materials"
            element={<Materials />}
          />


          {/* ===================================================
              QUIZ GENERATOR
          =================================================== */}

          <Route
            path="/quiz-generator"
            element={<QuizGenerator />}
          />

          <Route
            path="/quizzes"
            element={<Quizzes />}
          />

          <Route
            path="/quiz/:id"
            element={<Quiz />}
          />

          <Route
            path="/quiz-results"
            element={<QuizResults />}
          />


          {/* ===================================================
              PROGRESS
          =================================================== */}

          <Route
            path="/progress"
            element={<ProgressAnalytics />}
          />


          {/* ===================================================
              PROFILE
          =================================================== */}

          <Route
            path="/profile"
            element={<Profile />}
          />


          {/* ===================================================
              ADMIN
          =================================================== */}

          <Route
            path="/admin"
            element={<Admin />}
          />

        </Route>


        {/* =====================================================
            UNKNOWN ROUTE
        ===================================================== */}

        <Route
          path="*"
          element={
            <Navigate
              to="/dashboard"
              replace
            />
          }
        />

      </Routes>


      
    </>

  )

}


/*
=============================================================
APP LAYOUT + PAGE META
=============================================================
*/

function AppLayoutWithMeta() {

  const location = useLocation()

  const path =
    location.pathname.split('/')[1] ||
    'dashboard'

  const meta =
    pageMeta[path] || {
      title: 'StatSkill AI',
      subtitle: '',
    }

  return (
    <>
      <AppLayout
        title={meta.title}
        subtitle={meta.subtitle}
      />

      <Chatbot />
    </>
  )
}