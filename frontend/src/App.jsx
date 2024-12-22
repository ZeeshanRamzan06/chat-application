import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import { Routes ,Route, Navigate} from 'react-router-dom'
import HomePage from './pages/HomePage'
import SignUpPage from './pages/SignUpPage'
import SettingPage from './pages/SettingPage'
import ProfilePage from './pages/ProfilePage.jsx'
import { Loader } from 'lucide-react'
import {Toaster} from 'react-hot-toast'
import { useThemeStore } from './store/useThemeStore.js'
import useAuthStore from './store/useAuthStore.js';
import LogInPage from './pages/LogInPage.jsx'

const App = () => {
  const {authUser , checkAuth, isCheckingAuth} = useAuthStore();
  const { theme } = useThemeStore();
  useEffect(()=>{
    checkAuth();

  },[checkAuth])

  if(!isCheckingAuth && !checkAuth)
    return(
      <div className='flex items-center justify-center h-screen'>
        <Loader className='size-10 animate-spin'/>
      </div>
    );
  return (
    <div data-theme={theme} >
    <Navbar />

    <Routes>
      <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
      <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
      <Route path="/login" element={!authUser ? <LogInPage /> : <Navigate to="/" />} />
      <Route path="/settings" element={<SettingPage />} />
      <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
    </Routes>

    <Toaster />
  </div>
  )
}

export default App