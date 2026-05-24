import { createBrowserRouter } from 'react-router-dom'
import LandingPage from '@/pages/LandingPage'
import DashboardPage from '@/pages/DashboardPage'
import AboutPage from '@/pages/AboutPage'
import ValidationPage from '@/pages/ValidationPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/dashboard',
    element: <DashboardPage />,
  },
  {
    path: '/about',
    element: <AboutPage />,
  },
  {
    path: '/validation',
    element: <ValidationPage />,
  },
])
