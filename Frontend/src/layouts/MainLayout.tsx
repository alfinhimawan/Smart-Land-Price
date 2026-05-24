export { Navbar } from './Navbar'
export { Footer } from './Footer'
export { PageContainer } from './PageContainer'

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
