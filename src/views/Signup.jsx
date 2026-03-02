import React, { useState } from 'react'
import api from '../services/api'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, UserPlus, User, ShieldCheck, AlertCircle } from 'lucide-react'

const Signup = ({ setUser }) => {
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        password: '',
        confirm_password: ''
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const onChange = (e) => setFormData({ ...formData, [e.target.id]: e.target.value })

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (formData.password !== formData.confirm_password) {
            return setError('Passwords do not match')
        }

        setLoading(true)
        setError(null)

        try {
            const res = await api.post('/api/auth/register', formData)
            if (res.data.success) {
                // Log them in automatically after registration
                const loginRes = await api.post('/api/auth/login', {
                    email: formData.email,
                    password: formData.password
                })

                if (loginRes.data.success) {
                    localStorage.setItem('pg_token', loginRes.data.access_token)
                    localStorage.setItem('pg_user', JSON.stringify(loginRes.data.user))
                    setUser(loginRes.data.user)
                    navigate('/detector')
                }
            }
        } catch (err) {
            setError(err.response?.data?.error || 'Registration failed')
        } finally {
            setLoading(false)
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md mx-auto py-8"
        >
            <div className="glass-card shadow-3xl relative overflow-hidden group">
                <header className="text-center mb-8 space-y-2 relative z-10">
                    <h2 className="text-3xl font-outfit font-black tracking-tight text-theme">Join <span className="text-cyan">PhishGuard</span></h2>
                    <p className="text-theme-muted text-sm font-medium">Protect your digital journey with advanced AI.</p>
                </header>

                <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
                    <div className="space-y-1">
                        <label className="text-xs font-bold uppercase tracking-widest text-theme-muted ml-1">Full Name</label>
                        <div className="relative group">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 group-focus-within:text-cyan transition-colors" />
                            <input
                                id="full_name"
                                type="text"
                                required
                                onChange={onChange}
                                placeholder="John Doe"
                                className="input-field pl-12 text-sm"
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-bold uppercase tracking-widest text-theme-muted ml-1">Email Address</label>
                        <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 group-focus-within:text-cyan transition-colors" />
                            <input
                                id="email"
                                type="email"
                                required
                                onChange={onChange}
                                placeholder="name@company.com"
                                className="input-field pl-12 text-sm"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-xs font-bold uppercase tracking-widest text-theme-muted ml-1">Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 group-focus-within:text-cyan transition-colors" />
                                <input
                                    id="password"
                                    type="password"
                                    required
                                    onChange={onChange}
                                    placeholder="••••••••"
                                    className="input-field pl-12 text-sm"
                                />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold uppercase tracking-widest text-theme-muted ml-1">Confirm</label>
                            <div className="relative group">
                                <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 group-focus-within:text-cyan transition-colors" />
                                <input
                                    id="confirm_password"
                                    type="password"
                                    required
                                    onChange={onChange}
                                    placeholder="••••••••"
                                    className="input-field pl-12 text-sm"
                                />
                            </div>
                        </div>
                    </div>

                    {error && (
                        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-500 text-xs font-bold animate-shake">
                            <AlertCircle className="w-5 h-5 shrink-0" />
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn btn-primary w-full justify-center py-4 text-sm font-bold tracking-widest uppercase disabled:opacity-50"
                    >
                        {loading ? 'Creating Account...' : <>Create Account <UserPlus className="ml-2 w-5 h-5" /></>}
                    </button>
                </form>

                <footer className="mt-8 pt-6 border-t border-white/5 text-center relative z-10">
                    <p className="text-sm text-theme-muted">
                        Already have an account? <Link to="/login" className="text-cyan font-bold hover:underline">Log in</Link>
                    </p>
                </footer>

                <div className="absolute top-0 left-0 w-32 h-32 bg-cyan/5 blur-[50px] -z-0" />
            </div>
        </motion.div>
    )
}

export default Signup
