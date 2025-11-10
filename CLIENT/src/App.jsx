import React from 'react'
import Home from './Pages/Home';
import "./App.css"
import { Routes, Route } from "react-router-dom";
import ResetPassWord from './Pages/ResetPassWord';
import VerifyEmail from './Pages/VerifyEmail';
import Login from './Pages/Login';
import { ToastContainer } from 'react-toastify';
function App() {
  return (
     <div>
         <ToastContainer/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/reset-password' element={<ResetPassWord/>}/>
        <Route path='/verify-email' element={<VerifyEmail/>}/>
      </Routes>
     </div>
      
    
  )
}

export default App