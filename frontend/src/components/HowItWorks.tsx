"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Database, FileText, Activity, Layers, Stethoscope } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
    {
        title: "Upload VCF",
        description: "Securely upload your patient&apos;s un-annotated Variant Call Format (VCF) file.",
        icon: Database,
    },
    {
        title: "Star Allele Mapping",
        description: "Aligning variants to established pharmacogene star alleles (e.g. CYP2C19*2).",
        icon: Layers,
    },
    {
        title: "Phenotype Inference",
        description: "Translating diplotypes into actionable metabolic phenotypes based on standard algorithms.",
        icon: Activity,
    },
    {
        title: "CPIC Guideline Engine",
        description: "Cross-referencing phenotypes with the latest CPIC clinical metadata to identify gene-drug interactions.",
        icon: Stethoscope,
    },
    {
        title: "Clinical Report Generation",
        description: "Producing a finalized, provider-ready safety and dosage recommendation report.",
        icon: FileText,
    },
];

export default function HowItWorks() {
    const containerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        if (!containerRef.current) return;

        // Animate cards staggering in
        gsap.fromTo(
            cardsRef.current,
            { y: 100, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                stagger: 0.15,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 70%",
                    end: "bottom center",
                    toggleActions: "play none none reverse",
                },
            }
        );
    }, []);

    return (
        <section ref={containerRef} className="relative w-full py-32 bg-background z-10">
            <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col items-center">

                <div className="text-center mb-20 max-w-3xl">
                    <h2 className="text-sm font-mono text-glow-accent tracking-widest uppercase mb-4">The Pipeline</h2>
                    <h3 className="text-4xl md:text-5xl font-bold text-[#f8fafc] mb-6">
                        From Raw Data to Clinical Insight
                    </h3>
                    <p className="text-[#94a3b8] text-lg">
                        Our autonomous AI pipeline analyzes millions of genetic variants in seconds, delivering high-confidence metabolic inferences directly to your dashboard.
                    </p>
                </div>

                {/* Horizontal scroll container on mobile, flex row on desktop */}
                <div className="relative w-full">
                    {/* Connecting glowing line in background for desktop */}
                    <div className="hidden lg:block absolute top-1/2 left-10 right-10 h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent -translate-y-1/2 blur-[2px]" />
                    <div className="hidden lg:block absolute top-1/2 left-10 right-10 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent -translate-y-1/2" />

                    <div className="flex flex-col lg:flex-row gap-6 relative z-10 justify-between">
                        {steps.map((step, idx) => (
                            <div
                                key={step.title}
                                ref={(el) => {
                                    cardsRef.current[idx] = el;
                                }}
                                className="group relative flex-1 flex flex-col items-center p-6 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl hover:bg-black/60 hover:border-primary/50 transition-all duration-300 transform"
                            >
                                {/* Number indicator */}
                                <div className="absolute -top-4 w-8 h-8 rounded-full bg-background border border-primary/40 text-primary flex items-center justify-center font-mono text-sm shadow-[0_0_10px_rgba(0,240,255,0.3)] z-20 group-hover:scale-110 transition-transform">
                                    0{idx + 1}
                                </div>

                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-6 border border-white/5 group-hover:border-primary/30 transition-colors">
                                    <step.icon className="w-8 h-8 text-primary/80 group-hover:text-primary transition-colors" />
                                </div>

                                <h4 className="text-xl font-semibold mb-3 text-center text-white">{step.title}</h4>
                                <p className="text-sm text-gray-400 text-center leading-relaxed">
                                    {step.description}
                                </p>

                                {/* Hover Glow effect */}
                                <div className="absolute inset-0 bg-primary/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none blur-xl" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Hero CTA Button routing to the Analysis Flow */}
                <div className="mt-20 flex justify-center w-full relative z-20">
                    <Link href="/analyze" className="pointer-events-auto">
                        <button className="btn-biotech px-10 py-4 text-base md:text-lg font-semibold cursor-pointer hover:scale-105 transition-transform flex items-center gap-3 shadow-[0_0_30px_rgba(0,245,255,0.2)] hover:shadow-[0_0_40px_rgba(0,245,255,0.4)]">
                            Begin Analysis
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
