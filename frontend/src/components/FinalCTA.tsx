"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function FinalCTA() {
    return (
        <section className="relative w-full py-48 bg-transparent z-10 flex flex-col items-center justify-center text-center px-6 border-t border-black/5 overflow-hidden">
            {/* Ambient Radial background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-4xl mx-auto relative z-10">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-16 leading-tight"
                >
                    Safer Prescriptions Start <br className="hidden md:block" /> With <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-secondary animate-gradient-x drop-shadow-sm">Genetic Insight.</span>
                </motion.h2>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative inline-block group"
                >
                    {/* Magnetic Glow Effect around Button */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-secondary rounded-full blur-md opacity-30 group-hover:opacity-75 transition duration-500 group-hover:duration-200" />
                    <Link href="/analyze" className="pointer-events-auto relative block">
                        <button className="btn-biotech relative bg-black hover:bg-zinc-900 border border-white/10 text-white shadow-xl shadow-black/20 group-hover:shadow-primary/20 hover:scale-105 transition-all duration-300">
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                Begin Analysis
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right group-hover:translate-x-1 transition-transform duration-300"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                            </span>
                        </button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
