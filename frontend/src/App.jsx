import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import ForgotPassword from './pages/forgotPassword'
import useGetCurrentUser from './hooks/useGetCurrentUser'
import { useSelector } from 'react-redux'
import Home from './pages/Home'
import useGetCity from './hooks/useGetCity'
export  const serverUrl = "http://localhost:8000"
const App = () => {

  useGetCurrentUser();
   useGetCity();
  const {userdata} = useSelector((state) => state.userinfo);

 
  return (
   <Routes>
    <Route path="/signup" element={!userdata?<SignUp />:<Navigate to = {"/"}/>} />
    <Route path="/signin" element={!userdata?<SignIn />:<Navigate to = {"/"}/>} />
    <Route path="/forgot-password" element={!userdata?<ForgotPassword />:<Navigate to = {"/"}/>} />
     <Route path="/" element={userdata? <Home />: <Navigate to = {"/signin"}/>} />
   </Routes>
  )
}

export default App