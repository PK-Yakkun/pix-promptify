'use client'

import Sidebar from './Sidebar'
import MainContent from './MainContent'

export default function Layout() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <MainContent />
    </div>
  )
}

