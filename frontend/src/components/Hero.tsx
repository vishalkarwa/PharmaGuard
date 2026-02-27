"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Upload, ArrowRight, Shield, Zap, FileCheck } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Capsule3D from "./Capsule3D";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

// DNA Helix component for background effect
function DNAHelix({ side }: { side: "left" | "right" }) {
    const helixRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!helixRef.current) return;

        gsap.to(helixRef.current, {
            y: -200,
            scrollTrigger: {
                trigger: "#hero",
                start: "top top",
                end: "bottom top",
                scrub: 1,
            }
        });
    }, []);

    return (
        <div 
            ref={helixRef}
            className={`absolute top-0 ${side === "left" ? "left-0" : "right-0"} w-32 h-[150vh] opacity-20 pointer-events-none`}
            style={{ 
                background: `linear-gradient(to ${side === "left" ? "right" : "left"}, transparent, rgba(0,113,227,0.1), transparent)` 
            }}
        >
            {/* DNA strand dots */}
            {Array.from({ length: 20 }).map((_, i) => (
                <div
                    key={i}
                    className="absolute w-2 h-2 rounded-full bg-primary"
                    style={{
                        left: side === "left" ? `${Math.sin(i * 0.5) * 30 + 20}%` : `${Math.cos(i * 0.5) * 30 + 20}%`,
                        top: `${i * 5}%`,
                        opacity: 0.3 + Math.sin(i * 0.3) * 0.2
                    }}
                />
            ))}
        </div>
    );
}

export default function Hero() {
    const heroRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!heroRef.current || !textRef.current) return;

        gsap.to(textRef.current, {
            opacity: 0,
            y: -50,
            scrollTrigger: {
                trigger: heroRef.current,
                start: "top top",
                end: "bottom center",
                scrub: 1,
            }
        });
    }, []);

    return (
        <section
            id="hero"
            ref={heroRef}
            className="hero-section relative w-full h-screen flex flex-col items-center justify-center overflow-hidden"
        >
            {/* DNA Helix effects on both sides */}
            <DNAHelix side="left" />
            <DNAHelix side="right" />

            {/* Enhanced Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50 to-white" />
            
            {/* Animated gradient orbs */}
            <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/15 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "1s" }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[150px]" />

            {/* 3D Capsule Background */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="opacity-40 scale-75 md:scale-100">
                    <Capsule3D />
                </div>
            </div>

            <div
                ref={textRef}
                className="z-10 flex flex-col items-center justify-end text-center max-w-4xl px-6 pb-[15vh] h-full"
            >
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                >
                    <div className="inline-flex items-center gap-2 mb-6 px-5 py-2.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-semibold tracking-wider backdrop-blur-md">
                        <Shield className="w-4 h-4" />
                        CPIC-Aligned Analysis
                    </div>
                </motion.div>

                {/* Main Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-slate-900 mb-6"
                >
                    Precision<br />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-secondary">Personalized</span>
                    <br />Medicine
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    className="text-lg md:text-xl text-slate-500 mb-10 max-w-2xl font-light leading-relaxed"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    Upload your genomic data. Get clinically actionable drug insights powered by AI and the latest CPIC guidelines. A new era of precision care awaits.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex flex-col sm:flex-row gap-4"
                >
                    <Link href="/analyze">
                        <motion.button
                            className="group relative flex items-center gap-3 px-10 py-5 text-white text-lg font-semibold rounded-full overflow-hidden shadow-xl shadow-primary/25"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-primary to-[#0a84ff] opacity-90 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute inset-0 bg-transparent border-2 border-white/20 rounded-full group-hover:border-white/40 transition-all" />
                            <Zap className="w-5 h-5 relative z-10" />
                            <span className="relative z-10 flex items-center gap-2">
                                Start Analysis
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </motion.button>
                    </Link>
                </motion.div>

                {/* Stats / Trust Indicators */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="mt-16 flex flex-wrap items-center justify-center gap-8"
                >
                    {[
                        { icon: FileCheck, value: "99.8%", label: "Accuracy" },
                        { icon: Zap, value: "<2s", label: "Analysis" },
                        { icon: Shield, value: "50+", label: "Drug-Gene Pairs" }
                    ].map((stat, i) => (
                        <div key={i} className="flex items-center gap-3 text-left">
                            <div className="w-10 h-10 rounded-xl bg-white/60 backdrop-blur-sm border border-black/5 flex items-center justify-center shadow-sm">
                                <stat.icon className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <p className="text-lg font-bold text-slate-900">{stat.value}</p>
                                <p className="text-xs text-slate-500">{stat.label}</p>
                            </div>
                        </div>
                    ))}
                </motion.div>

                {/* Trust Badges */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                    className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400"
                >
                    <span className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-safe animate-pulse" />
                        CPIC Guidelines 2024
                    </span>
                    <span className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        HIPAA Compliant
                    </span>
                    <span className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                        Real-time Analysis
                    </span>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 0.6, y: 0 }}
                transition={{ duration: 1, delay: 1.5 }}
            >
                <span className="text-xs uppercase tracking-widest font-mono text-primary">Discover</span>
                <div className="w-[1px] h-10 bg-gradient-to-b from-primary to-transparent" />
            </motion.div>
        </section>
    );
}
