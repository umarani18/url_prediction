import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShieldAlert, Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <nav className="fixed top-0 inset-x-0 h-20 glass border-b border-white/10 z-[1000] flex items-center">
            <div className="max-w-7xl mx-auto w-full px-6 flex justify-between items-center">
                <Link to="/" className="flex items-center gap-2 group">
                    <ShieldAlert className="w-8 h-8 text-cyan group-hover:scale-110 transition-transform" />
                    <span className="text-xl font-outfit font-bold tracking-tight text-theme">
                        Phish<span className="text-cyan">Guard</span> AI
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-6">
                    <Link to="/login" className="text-sm font-semibold text-theme hover:text-cyan transition-all px-4">
                        Login
                    </Link>
                    <Link to="/register" className="btn btn-primary px-8 py-2.5 text-sm">
                        Get Started
                    </Link>
                </div>

                {/* Mobile menu button */}
                <button
                    className="md:hidden p-2 text-theme"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Drawer */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-20 inset-x-0 glass border-b border-white/10 p-6 flex flex-col gap-4 md:hidden"
                    >
                        <Link to="/login" onClick={() => setIsOpen(false)} className="text-lg font-medium text-theme text-center py-2 border-b border-white/5">
                            Login
                        </Link>
                        <Link
                            to="/register"
                            onClick={() => setIsOpen(false)}
                            className="btn btn-primary justify-center w-full"
                        >
                            Sign Up
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    )
}

export default Navbar
