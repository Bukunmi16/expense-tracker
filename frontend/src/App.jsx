import React from 'react'
import { Route, Routes } from 'react-router'
import { Toaster } from 'sonner'
import Dashboard from './pages/Dashboard'
import AuthPage from './pages/AuthPage'
import ProtectedRoute from './components/ProtectedRoute'
import GuestRoute from './components/GuestRoute'

const App = () => {
  return (
    <div>
      <Toaster position='top-center'/>
      <Routes>
        <Route element={<GuestRoute/>}>
              <Route path='/signin' element={<AuthPage/>} />
        </Route>
        <Route element={<ProtectedRoute/>}>
              <Route path='/dashboard' element={<Dashboard/>} />
        </Route>
      </Routes>
    </div>
  )
}

export default App