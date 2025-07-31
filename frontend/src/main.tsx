import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import '@fontsource/cairo/400.css'
import '@fontsource/roboto/400.css'
import '@fontsource/aref-ruqaa/400.css'
import '@fontsource/dancing-script/400.css'

import { Toaster } from 'sonner'
import i18n from './i18n'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import AppLayout from './AppLayout'
import AuthLayout from './app/auth/layout/AuthLayout'
import GuestLayout from './app/guest/layout/GuestLayout'


import { AuthProvider } from './AuthContext'

import LandingPage from './app/common/LandingPage'
import Home from './app/auth/Home'
import Login from './app/guest/Login' 
import Register from './app/guest/Register'
import ProfilePage from './app/auth/ProfilePage'
import ErrorPage from './components/ErrorPage'

import NewJournal from './app/auth/journal/NewJournal'
import JournalPage from './app/auth/journal/JournalPage'
import JournalEdit from './app/auth/journal/JournalEdit'

import SettingsLayout from './app/auth/layout/SettingsLayout'
import ActionsPage from './app/auth/ActionsPage'
import SettingsPage from './app/auth/SettingsPage'
import DeleteAccountRequest from './app/guest/DeleteAccountRequest'
const router = createBrowserRouter([
  {
  
    element :<AppLayout/>,
    path: "/",
    children: [
      {
        path:"*",
        element:<ErrorPage/> ,

      },
      { path: '/', element: <LandingPage /> },
      {

        element:<GuestLayout />,
        children: [
          { path: '/login', element: <Login /> },
          { path: '/register', element: <Register /> },
          { path: '/delete_account', element: <DeleteAccountRequest /> },
          
        ]
      },
      {
        element:<AuthLayout/>,
        children: [
          { path: '/home', element: <Home /> },  
          { path: '/new', element: <NewJournal /> },
          { path: '/journal/:id/', element: <JournalPage /> },
          { path: '/journal/edit', element: <JournalEdit /> },
        ]
      },
      {
        element:<SettingsLayout/>,
        children: [
          { path: "/profile", element: <ProfilePage /> },
          { path: "/actions", element: <ActionsPage /> },
          { path: "/settings", element: <SettingsPage /> },
          
        ]
      }
        
              ]
  }
])

function Root() {
  useEffect(() => {
    document.body.dir = i18n.language === 'ar' ? 'rtl' : 'ltr'
  }, [])



  return (
    <>
      <RouterProvider router={router} />
      <Toaster richColors
        dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
        position={i18n.language==='ar'?'top-left':'top-right'}
        theme='system'
        closeButton
      />
      
    </>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>

    <Root />
    </AuthProvider>
  </StrictMode>
)
