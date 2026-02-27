"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2, Dna, Activity, FileSearch, FlaskConical, Brain } from "lucide-react";

const STEPS = [
    { text: "Establishing Secure Connection...", icon: Activity },
    { text: "Parsing Variant Call Format (VCF)...", icon: FileSearch },
    { text: "Mapping Star Alleles & Haplotypes...", icon: Dna },
    { text: "Querying Pharmacogenomic Engine...", icon: FlaskConical },
    { text: "Applying CPIC Clinical Guidelines...", icon: Brain },
    { text: "Generating AI Insights...", icon: Brain },
];

export default function AnalysisLoader() {
    const [currentStep, setCurrentStep] = useState(0);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 95) return 95;
                return prev + (Math.random() * 2);
            });
        }, 80);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (progress > 10 && currentStep === 0) setCurrentStep(1);
        if (progress > 25 && currentStep === 1) setCurrentStep(2);
        if (progress > 45 && currentStep === 2) setCurrentStep(3);
        if (progress > 65 && currentStep === 3) setCurrentStep(4);
        if (progress > 85 && currentStep === 4) setCurrentStep(5);
    }, [progress, currentStep]);

    return (
        <div className="w-full max-w-2xl mx-auto p-10 rounded-3xl bg-white backdrop-blur-xl border border-black/5 shadow-2xl relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-secondary">
                <motion.div 
                    className="h-full bg-white/50"
                    animate={{ width: `${progress}%` }}
                    transition={{ ease: "linear", duration: 0.1 }}
                />
            </div>

            {/* DNA Helix Animation */}
            <div className="relative w-32 h-40 mx-auto mb-8 mt-4">
                <div className="absolute inset-0 flex justify-center">
                    {[0, 1, 2, 3, 4, 5].map((i) => (
                        <motion.div
                            key={i}
                            className="absolute w-full flex justify-between items-center"
                            style={{ top: `${i * 20}%` }}
                            animate={{ 
                                rotateY: [0, 180, 360],
                                opacity: [0.3, 1, 0.3]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "linear",
                                delay: i * 0.2,
                            }}
                        >
                            <div className="w-3 h-3 rounded-full bg-primary shadow-lg shadow-primary/50" />
                            <div className="flex-1 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent mx-2" />
                            <div className="w-3 h-3 rounded-full bg-secondary shadow-lg shadow-secondary/50" />
                        </motion.div>
                    ))}
                </div>
                {/* Center glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-xl" />
            </div>

            {/* Progress Info */}
            <div className="text-center mb-8">
                <motion.p 
                    key={currentStep}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-2xl font-bold text-slate-900 mb-2"
                >
                    {STEPS[currentStep]?.text}
                </motion.p>
                <div className="flex justify-center items-center gap-2 text-sm text-slate-500">
                    <span className="font-mono">PHARMAGuard</span>
                    <span>•</span>
                    <span className="font-bold text-primary">{Math.floor(progress)}%</span>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden mb-8">
                <motion.div
                    className="h-full bg-gradient-to-r from-primary via-accent to-secondary rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ ease: "linear", duration: 0.1 }}
                />
            </div>

            {/* Steps Timeline */}
            <div className="flex flex-col gap-3">
                {STEPS.map((step, idx) => {
                    const isActive = idx === currentStep;
                    const isDone = idx < currentStep;
                    const StepIcon = step.icon;
                    
                    return (
                        <motion.div 
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className={`flex items-center gap-4 p-3 rounded-xl transition-all duration-300 ${
                                isActive ? "bg-primary/5 border border-primary/20" : ""
                            }`}
                        >
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                                isDone ? "bg-primary/10" : isActive ? "bg-primary text-white" : "bg-slate-100"
                            }`}>
                                {isDone ? (
                                    <CheckCircle2 className="w-5 h-5 text-primary" />
                                ) : isActive ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <StepIcon className="w-5 h-5 text-slate-400" />
                                )}
                            </div>
                            <span className={`text-sm tracking-wide font-medium ${
                                isDone ? "text-slate-400" : isActive ? "text-slate-900 font-bold" : "text-slate-300"
                            }`}>
                                {step.text}
                            </span>
                            {isDone && (
                                <motion.div 
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="ml-auto text-xs text-primary font-mono"
                                >
                                    ✓
                                </motion.div>
                            )}
                        </motion.div>
                    );
                })}
            </div>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-black/5 text-center">
                <p className="text-xs text-slate-400 font-mono">
                    Analyzing {6} pharmacogenes • {12} drug-gene interactions • CPIC v2024.01
                </p>
            </div>
        </div>
    );
}
