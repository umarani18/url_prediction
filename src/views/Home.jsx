import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Brain, Zap, UserCheck, ShieldCheck, Activity } from 'lucide-react'
import { motion } from 'framer-motion'

const Home = () => {
    const features = [
        {
            icon: <Brain className="w-10 h-10" />,
            title: "Deep BERT Analysis",
            desc: "Uses state-of-the-art transformer models to understand URL context beyond just keywords."
        },
        {
            icon: <Zap className="w-10 h-10" />,
            title: "Instant Feedback",
            desc: "Full structural and contextual analysis in less than 20 milliseconds per URL."
        },
        {
            icon: <UserCheck className="w-10 h-10" />,
            title: "Trusted Protection",
            desc: "Advanced whitelist and uncertainty monitoring ensure zero false positives for canonical sites."
        }
    ]

    const stats = [
        { value: "99.8%", label: "Accuracy" },
        { value: "<20ms", label: "Response" },
        { value: "AI/ML", label: "Driven" }
    ]

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-32"
        >
            {/* Hero Section */}
            <section className="grid lg:grid-cols-2 gap-20 items-center">
                <div className="space-y-8">
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-6xl md:text-7xl font-outfit font-extrabold leading-tight tracking-tight text-theme"
                    >
                        Secure Your Digital <span className="gradient-text">Frontiers</span>
                    </motion.h1>
                    <p className="text-xl text-theme-muted font-inter leading-relaxed max-w-lg">
                        Real-time malicious URL detection powered by Deep Learning. Neutralize phishing, malware, and defacement attacks before they strike.
                    </p>
                    <div className="flex flex-wrap gap-4 pt-4">
                        <Link to="/register" className="btn btn-primary px-8 py-4">
                            Get Started Free <ArrowRight className="ml-2 w-5 h-5" />
                        </Link>
                        <button className="btn btn-outline px-8 py-4">
                            Learn More
                        </button>
                    </div>

                    <div className="flex gap-12 pt-10">
                        {stats.map((s, i) => (
                            <div key={i} className="flex flex-col gap-1">
                                <span className="text-2xl font-bold font-outfit text-cyan">{s.value}</span>
                                <span className="text-xs text-theme-muted uppercase tracking-widest">{s.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="relative group p-4 glass-card border-white/10">
                    <img
                        src="/assets/security_hero.png"
                        alt="Advanced Security Concept"
                        className="w-full rounded-2xl group-hover:scale-[1.02] transition-transform duration-500"
                    />
                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="absolute bottom-10 -left-10 glass px-6 py-4 rounded-xl flex items-center gap-3 shadow-2xl z-10"
                    >
                        <ShieldCheck className="w-6 h-6 text-green-400" />
                        <span className="text-sm font-semibold text-theme">Phishing Blocked</span>
                    </motion.div>
                    <motion.div
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="absolute top-10 -right-10 glass px-6 py-4 rounded-xl flex items-center gap-3 shadow-2xl z-10"
                    >
                        <Activity className="w-6 h-6 text-cyan" />
                        <span className="text-sm font-semibold text-theme">24/7 Monitoring</span>
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section className="grid md:grid-cols-3 gap-8 pb-10">
                {features.map((f, i) => (
                    <motion.div
                        key={i}
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="glass-card hover:bg-white/8 transition-colors group"
                    >
                        <div className="mb-6 inline-block p-4 rounded-2xl bg-white/5 group-hover:bg-cyan/10 transition-colors">
                            <span className="text-cyan group-hover:scale-110 block transition-transform">{f.icon}</span>
                        </div>
                        <h3 className="text-xl font-bold mb-3 font-outfit text-theme">{f.title}</h3>
                        <p className="text-theme-muted leading-relaxed font-inter">{f.desc}</p>
                    </motion.div>
                ))}
            </section>
        </motion.div>
    )
}

export default Home
