import React from 'react'
import { Navigate, Outlet } from 'react-router'
import { useAuth } from '@/context/AuthContext'

const ProtectedRoute = () => {
    
    const { user, loading } = useAuth()

    if (loading) {
        return <div className="flex min-h-screen items-center justify-center ">
            <p className="font-bold text-3xl text-center text-white">₦</p></div>
    }
    
    if(!user) {
        return <Navigate to="/signin" replace />
    }

    return <Outlet/>
}

export default ProtectedRoute