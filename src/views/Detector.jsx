import React, { useState } from 'react'
import api from '../services/api'
import { motion, AnimatePresence } from 'framer-motion'
import { ShieldAlert, Zap, Lock, Info, Skull, Globe, AlertTriangle, ShieldCheck } from 'lucide-react'

const Detector = () => {
    const [url, setUrl] = useState('')
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState(null)
    const [error, setError] = useState(null)

    const handleAnalyze = async (e) => {
        e.preventDefault()
        if (!url.trim()) return

        setLoading(true)
        setError(null)
        setResult(null)

        try {
            const res = await api.post('/predict', { url })
            if (res.data.success) {
                setResult(res.data.result)
            } else {
                setError(res.data.error || 'Prediction failed')
            }
        } catch (err) {
            setError(err.response?.data?.error || 'Connection failed to AI engine')
        } finally {
            setLoading(false)
        }
    }

    const getRiskInfo = (label) => {
        switch (label) {
            case 'benign': return { icon: <ShieldCheck className="text-green-400" />, color: 'text-green-400', riskColor: '#45EBA5', status: 'Safe Domain Verified' }
            case 'phishing': return { icon: <AlertTriangle className="text-amber-400" />, color: 'text-amber-400', riskColor: '#f59e0b', status: 'Potentially Untrusted' }
            case 'malware': return { icon: <Skull className="text-red-500" />, color: 'text-red-500', riskColor: '#ff4b2b', status: 'Harmful Content Detected' }
            case 'defacement': return { icon: <Globe className="text-orange-400" />, color: 'text-orange-400', riskColor: '#f97316', status: 'Warning: Defaced' }
            default: return { icon: <Info className="text-cyan" />, color: 'text-cyan', riskColor: '#4facfe', status: 'Analysis Complete' }
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-4xl mx-auto space-y-12 pt-8"
        >
            <div className="space-y-4 text-center">
                <h2 className="text-4xl font-outfit font-extrabold tracking-tight text-theme">URL Security <span className="text-cyan">Analyzer</span></h2>
                <p className="text-theme-muted max-w-lg mx-auto leading-relaxed">
                    Paste any suspicious URL below to run our full structural and AI-based contextual analysis.
                </p>
            </div>

            <div className="p-2 glass rounded-2xl flex flex-col md:flex-row gap-4">
                <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://suspicious-login.paypal.com.verify-access.ru/..."
                    className="flex-1 bg-transparent border-none px-6 py-4 text-lg focus:outline-none text-theme placeholder:text-theme-muted/50"
                />
                <button
                    onClick={handleAnalyze}
                    disabled={loading || !url.trim()}
                    className="btn btn-primary px-10 py-4 justify-center disabled:opacity-50"
                >
                    {loading ? 'Analyzing...' : <>Analyze URL <Zap className="ml-1 w-5 h-5 fill-current" /></>}
                </button>
            </div>

            <AnimatePresence>
                {loading && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="flex flex-col items-center py-20 space-y-6"
                    >
                        <div className="w-16 h-16 border-4 border-cyan/20 border-t-cyan rounded-full animate-spin" />
                        <p className="text-theme-muted font-medium">Neural Networks analyzing context and structure...</p>
                    </motion.div>
                )}

                {error && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                        className="p-6 glass-card border-red-500/20 text-red-400 flex items-center gap-4"
                    >
                        <ShieldAlert className="w-6 h-6 shrink-0" />
                        <span className="font-semibold">{error}</span>
                    </motion.div>
                )}

                {result && (
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="grid lg:grid-cols-5 gap-8"
                    >
                        {/* Main Result */}
                        <div className="lg:col-span-3 glass-card space-y-8 relative overflow-hidden group">
                            <div className="flex justify-between items-center relative z-10">
                                <span
                                    className={`px-4 py-2 border rounded-lg text-xs font-bold tracking-widest uppercase ${getRiskInfo(result.label).color} border-white/5 bg-white/5`}
                                >
                                    {result.whitelisted ? 'WHITELISTED' : result.risk_label}
                                </span>
                                <span className="text-xs text-theme-muted font-mono tracking-tighter">
                                    {result.inference_ms}ms processing
                                </span>
                            </div>

                            <div className="relative z-10 space-y-4">
                                <h3 className={`text-5xl font-outfit font-black ${getRiskInfo(result.label).color}`}>
                                    {result.label.toUpperCase()}
                                </h3>
                                <p className="text-sm font-mono text-slate-500 break-all bg-white/5 p-4 rounded-xl border border-white/5">
                                    {result.url}
                                </p>
                            </div>

                            <div className="space-y-4 relative z-10">
                                <div className="flex justify-between items-end">
                                    <span className="text-sm font-semibold tracking-wide uppercase text-slate-400">Risk Confidence</span>
                                    <span className={`text-2xl font-bold font-outfit ${getRiskInfo(result.label).color}`}>
                                        {(result.confidence * 100).toFixed(1)}%
                                    </span>
                                </div>
                                <div className="h-4 bg-white/5 rounded-full p-1 overflow-hidden relative">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${result.confidence * 100}%` }}
                                        transition={{ duration: 1.2, ease: "easeOut" }}
                                        className="h-full rounded-full"
                                        style={{ backgroundColor: getRiskInfo(result.label).riskColor }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse" />
                                </div>
                            </div>

                            <div className="pt-4 border-t border-white/5 flex items-center gap-3 relative z-10 text-theme-muted">
                                {getRiskInfo(result.label).icon}
                                <span className="text-sm font-medium">{getRiskInfo(result.label).status}</span>
                            </div>

                            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan/5 blur-[100px] -z-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>

                        {/* Probability Details */}
                        <div className="lg:col-span-2 glass-card space-y-8 flex flex-col justify-center">
                            <h4 className="text-lg font-bold font-outfit flex items-center gap-2">
                                <Zap className="w-5 h-5 text-cyan" /> Confidence Details
                            </h4>
                            <div className="space-y-6">
                                {Object.entries(result.proba).sort((a, b) => b[1] - a[1]).map(([cls, prob], i) => (
                                    <div key={cls} className="space-y-2">
                                        <div className="flex justify-between text-sm font-semibold">
                                            <span className="capitalize text-theme-muted">{cls}</span>
                                            <span className="text-cyan">{(prob * 100).toFixed(1)}%</span>
                                        </div>
                                        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${prob * 100}%` }}
                                                transition={{ delay: 0.2 + (i * 0.1), duration: 0.8 }}
                                                className="h-full bg-cyan/40"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

export default Detector
