import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

import { Outlet } from 'react-router-dom'

export const MainLayout = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
