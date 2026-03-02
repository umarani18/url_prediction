import React, { useState } from 'react'
import api from '../services/api'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, LogIn, ShieldAlert } from 'lucide-react'

const Login = ({ setUser }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            const res = await api.post('/api/auth/login', { email, password })
            if (res.data.success) {
                localStorage.setItem('pg_token', res.data.access_token)
                localStorage.setItem('pg_user', JSON.stringify(res.data.user))
                setUser(res.data.user)
                navigate('/detector')
            }
        } catch (err) {
            setError(err.response?.data?.error || 'Invalid email or password')
        } finally {
            setLoading(false)
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md mx-auto py-12"
        >
            <div className="glass-card shadow-2xl relative overflow-hidden group">
                <header className="text-center mb-10 space-y-3 relative z-10">
                    <h2 className="text-3xl font-outfit font-black tracking-tight text-theme">Welcome <span className="text-cyan">Back</span></h2>
                    <p className="text-theme-muted text-sm font-medium">Monitor and secure your digital experience.</p>
                </header>

                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-theme-muted pl-1">Email Address</label>
                        <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600 group-focus-within:text-cyan transition-colors" />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@company.com"
                                className="input-field pl-12"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-theme-muted pl-1">Password</label>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600 group-focus-within:text-cyan transition-colors" />
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="input-field pl-12"
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-500 text-sm font-semibold animate-shake">
                            <ShieldAlert className="w-5 h-5 shrink-0" />
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn btn-primary w-full justify-center py-4 text-base font-bold tracking-wide disabled:opacity-50"
                    >
                        {loading ? 'Authenticating...' : <>Login to Portal <LogIn className="ml-2 w-5 h-5" /></>}
                    </button>
                </form>

                <footer className="mt-8 pt-8 border-t border-white/5 text-center relative z-10">
                    <p className="text-sm text-theme-muted">
                        Don't have an account? <Link to="/register" className="text-cyan font-bold hover:underline">Sign up now</Link>
                    </p>
                </footer>

                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan/5 blur-[60px] -z-0 group-hover:bg-cyan/10 transition-colors" />
            </div>
        </motion.div>
    )
}

export default Login
