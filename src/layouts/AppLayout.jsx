import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/ui/Sidebar'
import Header from '../components/ui/Header'
import BottomNav from '../components/ui/BottomNav'

export default function AppLayout({ title, subtitle }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="min-h-screen bg-canvas lg:flex">
      <Sidebar
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      <div className="flex min-h-screen flex-1 flex-col">
        <Header
          title={title}
          subtitle={subtitle}
          onMenuClick={() => setMobileOpen(true)}
        />

        <main className="flex-1 px-4 pb-20 pt-5 sm:px-6 lg:pb-8">
          <Outlet />
        </main>
      </div>

      <BottomNav />
    </div>
  )
}