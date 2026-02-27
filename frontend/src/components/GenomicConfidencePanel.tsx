"use client";

import { motion } from "framer-motion";
import { Lock, FileX, UserCheck, Shield, Server, Database } from "lucide-react";

const features = [
    {
        icon: Lock,
        title: "End-to-End Encryption",
        description: "All variant data is encrypted during transit and analysis using AES-256 encryption. Your patient data never leaves the secure environment."
    },
    {
        icon: FileX,
        title: "Zero Raw Data Retention",
        description: "VCF files are processed in memory and wiped immediately post-inference. We only store clinical recommendations, never raw genomic data."
    },
    {
        icon: UserCheck,
        title: "Clinician-First Design",
        description: "Reports are generated specifically for healthcare providers, ensuring clinical oversight and proper interpretation of results."
    },
    {
        icon: Shield,
        title: "HIPAA Compliant",
        description: "Built with healthcare compliance at the core. Full audit logging and access controls for complete regulatory adherence."
    },
    {
        icon: Server,
        title: "SOC 2 Type II",
        description: "Infrastructure meets the highest standards for security, availability, and confidentiality in healthcare technology."
    },
    {
        icon: Database,
        title: "GDPR Ready",
        description: "Full data portability and deletion capabilities. Patient rights are fully respected and implemented."
    }
];

export default function GenomicConfidencePanel() {
    return (
        <section className="relative w-full py-32 bg-transparent z-10 px-6 border-t border-black/5 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="inline-block mb-4 px-4 py-1.5 rounded-full border border-safe/30 bg-safe/10 text-safe text-sm font-semibold tracking-wider backdrop-blur-md"
                    >
                        SECURITY & COMPLIANCE
                    </motion.div>
                    
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 mb-6"
                    >
                        Secure by <span className="text-gradient">Design</span>.
                    </motion.h2>
                    
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-lg text-slate-600 max-w-2xl mx-auto"
                    >
                        Enterprise-grade security meets healthcare compliance. Built for the most sensitive clinical environments.
                    </motion.p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, idx) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className="glass-card p-8 group hover:border-primary/20"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <feature.icon className="w-7 h-7 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                            <p className="text-sm text-slate-600 leading-relaxed">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Compliance Badges */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="mt-16 pt-12 border-t border-black/5"
                >
                    <p className="text-center text-sm text-slate-400 mb-8">Trusted by leading healthcare institutions</p>
                    <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-50">
                        {["HIPAA", "SOC 2", "GDPR", "HITRUST", "ISO 27001"].map((cert) => (
                            <span key={cert} className="text-lg md:text-xl font-bold text-slate-400 tracking-widest">
                                {cert}
                            </span>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
