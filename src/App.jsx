import React, { useState, useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import axios from 'axios'
import Sidebar from './components/Sidebar'
import Dashboard from './views/Dashboard'
import Home from './views/Home'
import Login from './views/Login'
import Signup from './views/Signup'
import Navbar from './components/Navbar'
import Detector from './views/Detector'
import History from './views/History'

import api from './services/api'

function App() {
    const [user, setUser] = useState(null)
    const [theme, setTheme] = useState(localStorage.getItem('pg_theme') || 'dark')
    const location = useLocation()

    useEffect(() => {
        const saved = localStorage.getItem('pg_user')
        if (saved) setUser(JSON.parse(saved))
    }, [])

    useEffect(() => {
        document.documentElement.className = theme
        localStorage.setItem('pg_theme', theme)
    }, [theme])

    const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark')

    const logout = () => {
        localStorage.removeItem('pg_token')
        localStorage.removeItem('pg_user')
        setUser(null)
    }

    return (
        <div className={`relative min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-[#0a0b10]' : 'bg-slate-50'}`}>
            <div className={`bg-blur blur-1 ${theme === 'light' ? 'opacity-5' : ''}`} />
            <div className={`bg-blur blur-2 ${theme === 'light' ? 'opacity-5' : ''}`} />
            <div className="bg-grid" />

            {!user ? (
                <Navbar user={user} logout={logout} />
            ) : (
                <Sidebar user={user} logout={logout} theme={theme} toggleTheme={toggleTheme} />
            )}

            <main
                className={`transition-all duration-300 ${user
                    ? 'md:ml-64 p-8 md:p-12 min-h-screen'
                    : 'max-w-7xl mx-auto px-6 pt-32 pb-20'
                    }`}
            >
                <AnimatePresence mode="wait">
                    <Routes location={location} key={location.pathname}>
                        <Route path="/" element={user ? <Navigate to="/detector" /> : <Home />} />
                        <Route
                            path="/login"
                            element={user ? <Navigate to="/detector" /> : <Login setUser={setUser} />}
                        />
                        <Route
                            path="/register"
                            element={user ? <Navigate to="/detector" /> : <Signup setUser={setUser} />}
                        />

                        {/* Authenticated Routes */}
                        <Route
                            path="/detector"
                            element={user ? <Dashboard /> : <Navigate to="/login" />}
                        />
                        <Route
                            path="/detector/analyze"
                            element={user ? <Detector /> : <Navigate to="/login" />}
                        />
                        <Route
                            path="/history"
                            element={user ? <History /> : <Navigate to="/login" />}
                        />
                    </Routes>
                </AnimatePresence>
            </main>
        </div>
    )
}

export default App
