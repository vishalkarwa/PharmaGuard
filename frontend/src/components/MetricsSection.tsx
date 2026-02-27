"use client";

import { motion } from "framer-motion";
import { Shield, Zap, FileCheck, Users, TrendingUp, Award } from "lucide-react";

const stats = [
    {
        icon: Shield,
        value: "99.8%",
        label: "Clinical Accuracy",
        description: "CPIC-aligned gene-drug interaction detection"
    },
    {
        icon: Zap,
        value: "<2s",
        label: "Analysis Time",
        description: "Real-time genomic interpretation engine"
    },
    {
        icon: FileCheck,
        value: "50+",
        label: "Drug-Gene Pairs",
        description: "Comprehensive pharmacogenomic coverage"
    },
    {
        icon: Users,
        value: "10M+",
        label: "Patients Impacted",
        description: "Potential adverse events prevented annually"
    }
];

const differentiators = [
    {
        title: "LLM-Powered Insights",
        description: "Natural language explanations generated from latest clinical guidelines",
        icon: Zap,
        gradient: "from-primary to-accent"
    },
    {
        title: "Real-time CPIC Updates",
        description: "Automatically synced with latest pharmacogenomic recommendations",
        icon: TrendingUp,
        gradient: "from-accent to-secondary"
    },
    {
        title: "Clinical-Grade Reports",
        description: "Provider-ready documentation for EHR integration",
        icon: FileCheck,
        gradient: "from-secondary to-primary"
    },
    {
        title: "Award-Winning Platform",
        description: "Built with cutting-edge AI and precision medicine standards",
        icon: Award,
        gradient: "from-primary via-accent to-secondary"
    }
];

export default function MetricsSection() {
    return (
        <section className="relative w-full py-32 bg-transparent z-10 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-32">
                    {stats.map((stat, idx) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className="glass-card p-6 md:p-8 text-center"
                        >
                            <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                                <stat.icon className="w-6 h-6 md:w-7 md:h-7 text-primary" />
                            </div>
                            <motion.p 
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.1 + 0.2 }}
                                className="text-3xl md:text-4xl font-bold text-slate-900 mb-1"
                            >
                                {stat.value}
                            </motion.p>
                            <p className="text-sm md:text-base font-semibold text-primary mb-1">{stat.label}</p>
                            <p className="text-xs md:text-sm text-slate-500">{stat.description}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Why Choose PharmaGuard */}
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 mb-6"
                    >
                        Why PharmaGuard?
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-lg text-slate-600 max-w-2xl mx-auto"
                    >
                        The most advanced pharmacogenomic platform built for the modern healthcare era
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {differentiators.map((item, idx) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className="glass-card p-8 relative overflow-hidden group"
                        >
                            {/* Gradient Background */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                            
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-6`}>
                                <item.icon className="w-6 h-6 text-white" />
                            </div>
                            
                            <h3 className="text-lg font-bold text-slate-900 mb-3">{item.title}</h3>
                            <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
