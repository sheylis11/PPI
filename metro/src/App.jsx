import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Header from './components/Header'
import Footer from './components/Footer'
import LoginModal from './components/LoginModal'

export default function App() {
  const [showLogin, setShowLogin] = useState(false)
  const [role, setRole] = useState('')

  const openLogin = (r) => {
    setRole(r)
    setShowLogin(true)
  }

  return (
    <div className="app-root">
      <Header onHelpClick={() => openLogin('usuario')} onRequestLogin={openLogin} />
      <Routes>
        <Route path="/" element={<Home onRequestLogin={openLogin} />} />
      </Routes>
      <Footer />
      <LoginModal show={showLogin} onHide={() => setShowLogin(false)} role={role} />
    </div>
  )
}
