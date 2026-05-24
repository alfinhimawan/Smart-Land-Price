import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import DashboardPage from '@/pages/DashboardPage'
import LandingPage from '@/pages/LandingPage'
import AboutPage from '@/pages/AboutPage'
import ValidationPage from '@/pages/ValidationPage'

const router = createBrowserRouter([
  { path: '/', element: <LandingPage /> },
  { path: '/dashboard', element: <DashboardPage /> },
  { path: '/about', element: <AboutPage /> },
  { path: '/validation', element: <ValidationPage /> },
])

export default function App() {
  return <RouterProvider router={router} />
}
