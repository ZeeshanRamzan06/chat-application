import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import { Routes ,Route, Navigate} from 'react-router-dom'
import HomePage from './pages/HomePage'
import SignUpPage from './pages/SignUpPage'
import SignInPage from './pages/SignInPage'
import SittingPage from './pages/SittingPage'
import ProfilePic from './pages/ProfilePic'
import { UseAuthStore } from './store/UseAuthStore.js'
import { Loader } from 'lucide-react'

const App = () => {
  const {useAuth , checkAuth, isCheckingAuth} = UseAuthStore()

  useEffect(()=>{
    checkAuth();

  },[checkAuth])
  console.log(checkAuth)

  if(!isCheckingAuth && !checkAuth)
    return(
      <div className='flex items-center justify-center h-screen'>
        <Loader className='size-10 animate-spin'/>
      </div>
    );
  return (
    <div >

      <Navbar/>
      <Routes>
        <Route path='/' element={useAuth? <HomePage />: <Navigate to='/login'/>}/>
        <Route path='/signup' element={!useAuth?  <SignUpPage /> : <Navigate to='/'/>}/>
        <Route path='/login' element={!useAuth? <SignInPage /> : <Navigate to='/'/>}/>
        <Route path='/sittings' element={<SittingPage />}/>
        <Route path='/profile' element={useAuth? <ProfilePic /> : <Navigate to='/login'/> }/>
      </Routes>
   
    </div>
  )
}

export default App