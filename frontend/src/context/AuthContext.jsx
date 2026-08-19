import  React, { useEffect, createContext, useContext, useState } from 'react'
import { api } from '@/lib/utils'

const AuthContext = createContext()

export const AuthProvider  = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const logout = async () => {
          try {
            await api.post("/auth/logout");
            setUser(null);
            console.log(user);
            
        } catch (error) {
            console.error(error);
        }finally {setUser(null)}
        };

    useEffect(() => {
  const handleAuthLogout = () => {
    setUser(null);
  };

  window.addEventListener("auth:logout", handleAuthLogout);

  return () => {
    window.removeEventListener("auth:logout", handleAuthLogout);
  };
}, []);

    useEffect(() => {
    const getUser = async () => {
        try {
            const response = await api.get('/auth/me')
            setUser(response.data.user)
        } catch (error) {
            setUser(null)
        } finally{
            setLoading(false)
        }
    }
    getUser()
    } , [])

    return (
        <AuthContext.Provider value={{user, loading, setUser, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const  useAuth = () => {
    return useContext(AuthContext)
}