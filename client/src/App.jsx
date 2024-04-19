import React, { useState, useEffect } from 'react';
import './App.css'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import LoginReg from './pages/LoginReg'
import Navigation from './components/Navigation'
import ResetPasswordEmail from './pages/ResetPasswordEmail'
import ResetPassword from './pages/ResetPassword'
import Dashboard from './pages/Dashboard'

function App() {

  const [isToken, setIsToken] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsToken(!!token);
  }, [location]);

  return (
    <>
      <Navigation isToken={isToken} />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/loginReg' element={<LoginReg />} />
        <Route path='/reset-password-email' element={<ResetPasswordEmail />} />
        <Route path='/api/user/reset/:id/:token' element={<ResetPassword />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>

    </>
  )
}

export default App
