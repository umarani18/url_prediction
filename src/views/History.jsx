import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { History as HistoryIcon, RefreshCw, Filter, ShieldCheck, Skull, Globe, AlertTriangle } from 'lucide-react'
import api from '../services/api'

const History = () => {
    const [history, setHistory] = useState([])
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState('')

    const fetchHistory = async () => {
        setLoading(true)
        try {
            const res = await api.get(`/history?limit=100${filter ? `&label=${filter}` : ''}`)
            if (res.data.success) {
                setHistory(res.data.history)
            }
        } catch (err) {
            console.error('Failed to fetch history:', err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchHistory()
    }, [filter])

    const getLabelIcon = (label) => {
        switch (label) {
            case 'benign': return <ShieldCheck className="w-5 h-5 text-green-400" />
            case 'phishing': return <AlertTriangle className="w-5 h-5 text-amber-400" />
            case 'malware': return <Skull className="w-5 h-5 text-red-500" />
            case 'defacement': return <Globe className="w-5 h-5 text-orange-400" />
            default: return null
        }
    }

    const getLabelClasses = (label) => {
        switch (label) {
            case 'benign': return 'border-green-400/20 text-green-400 bg-green-400/5'
            case 'phishing': return 'border-amber-400/20 text-amber-400 bg-amber-400/5'
            case 'malware': return 'border-red-500/20 text-red-500 bg-red-500/5'
            case 'defacement': return 'border-orange-400/20 text-orange-400 bg-orange-400/5'
            default: return 'border-white/10 text-white bg-white/5'
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-12"
        >
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2">
                    <h2 className="text-4xl font-outfit font-extrabold tracking-tight text-theme">Detection <span className="text-cyan">History</span></h2>
                    <p className="text-theme-muted">Review your recent URL analysis records and security logs.</p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center glass px-3 py-1.5 rounded-xl border border-white/5 focus-within:border-cyan/50 transition-colors">
                        <Filter className="w-3.5 h-3.5 text-theme-muted mr-2" />
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="bg-transparent border-none text-xs font-bold uppercase tracking-widest focus:outline-none pr-2 text-theme cursor-pointer appearance-none"
                        >
                            <option value="" className="bg-slate-900 text-white">All Records</option>
                            <option value="benign" className="bg-slate-900 text-white">Benign Only</option>
                            <option value="phishing" className="bg-slate-900 text-white">Phishing Only</option>
                            <option value="malware" className="bg-slate-900 text-white">Malware Only</option>
                            <option value="defacement" className="bg-slate-900 text-white">Defacement Only</option>
                        </select>
                    </div>
                    <button
                        onClick={fetchHistory}
                        className="p-3 glass hover:bg-white/5 border border-white/5 rounded-xl transition-all"
                        title="Refresh History"
                    >
                        <RefreshCw className={`w-5 h-5 text-cyan ${loading ? 'animate-spin' : ''}`} />
                    </button>
                </div>
            </header>

            <div className="glass-card !p-0 overflow-hidden">
                {loading && history.length === 0 ? (
                    <div className="py-32 flex flex-col items-center space-y-4">
                        <div className="w-12 h-12 border-2 border-cyan/20 border-t-cyan rounded-full animate-spin" />
                        <span className="text-theme-muted">Retrieving session records...</span>
                    </div>
                ) : history.length === 0 ? (
                    <div className="py-40 flex flex-col items-center justify-center space-y-6 text-theme-muted opacity-40">
                        <HistoryIcon className="w-20 h-20" />
                        <p className="text-xl font-medium tracking-tight">No analysis logs found.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-white/[0.02] border-b border-white/5">
                                    <th className="text-left px-8 py-6 text-xs font-bold uppercase tracking-widest text-theme-muted">Analyzed URL</th>
                                    <th className="text-left px-8 py-6 text-xs font-bold uppercase tracking-widest text-theme-muted">Security Label</th>
                                    <th className="text-left px-8 py-6 text-xs font-bold uppercase tracking-widest text-theme-muted">Confidence</th>
                                    <th className="text-left px-8 py-6 text-xs font-bold uppercase tracking-widest text-theme-muted">Status</th>
                                    <th className="text-left px-8 py-6 text-xs font-bold uppercase tracking-widest text-theme-muted text-right">Analyzed At</th>
                                </tr>
                            </thead>
                            <tbody>
                                <AnimatePresence mode="popLayout">
                                    {history.map((record, i) => (
                                        <motion.tr
                                            key={record.timestamp + i}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.03 }}
                                            className="border-b border-white/5 hover:bg-white/[0.01] transition-colors group"
                                        >
                                            <td className="px-8 py-6 max-w-md">
                                                <div className="flex flex-col gap-1">
                                                    <span className="text-sm font-mono truncate text-theme" title={record.url}>
                                                        {record.url}
                                                    </span>
                                                    {record.whitelisted && (
                                                        <span className="text-[10px] font-bold text-cyan flex items-center gap-1">
                                                            <ShieldCheck className="w-3 h-3" /> CANONICAL VERIFIED
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className={`inline-flex items-center gap-2 border rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider ${getLabelClasses(record.label)}`}>
                                                    {getLabelIcon(record.label)}
                                                    {record.label}
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className="font-outfit font-bold text-lg text-theme">
                                                    {(record.confidence * 100).toFixed(1)}%
                                                </span>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className="text-xs font-medium text-theme-muted">
                                                    {record.whitelisted ? 'Whitelisted' : 'ML Model Prediction'}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <span className="text-xs font-mono text-theme-muted">
                                                    {new Date(record.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                                                </span>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </AnimatePresence>
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </motion.div>
    )
}

export default History
