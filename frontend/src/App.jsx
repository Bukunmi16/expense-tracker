import React from 'react'
import Dashboard from './pages/Dashboard'
import { Route, Routes } from 'react-router'
import { Toaster } from 'sonner'

const App = () => {
  return (
    <div>
      <Toaster/>
      <Routes>
              <Route path='/' element={<Dashboard/>} />
      </Routes>
    </div>
  )
}

export default App