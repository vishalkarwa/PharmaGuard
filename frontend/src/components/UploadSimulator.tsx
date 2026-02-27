"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2, UploadCloud, DatabaseZap } from "lucide-react";

const steps = [
    "Parsing Variants...",
    "Mapping Star Alleles...",
    "Applying CPIC Guidelines...",
    "Generating Clinical Explanation...",
];

export default function UploadSimulator({ onComplete }: { onComplete: () => void }) {
    const [currentStep, setCurrentStep] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [progress, setProgress] = useState(0);

    const handleUpload = () => {
        setIsUploading(true);
        setProgress(0);
        setCurrentStep(0);
    };

    useEffect(() => {
        if (!isUploading) return;

        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(onComplete, 800);
                    return 100;
                }
                return prev + 1;
            });
        }, 40);

        return () => clearInterval(interval);
    }, [isUploading, onComplete]);

    // Sync step string with progress percentage safely
    useEffect(() => {
        const timer = setTimeout(() => {
            if (progress > 20 && currentStep === 0) setCurrentStep(1);
            if (progress > 50 && currentStep === 1) setCurrentStep(2);
            if (progress > 80 && currentStep === 2) setCurrentStep(3);
        }, 0);
        return () => clearTimeout(timer);
    }, [progress, currentStep]);

    return (
        <div className="w-full max-w-xl mx-auto p-8 rounded-3xl bg-black/40 backdrop-blur-xl border border-white/10 shadow-[0_0_50px_rgba(0,240,255,0.05)] relative overflow-hidden">

            {!isUploading ? (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 mb-6">
                        <UploadCloud className="w-10 h-10 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">VCF File Analysis</h3>
                    <p className="text-gray-400 mb-8 max-w-sm">
                        Drag and drop your patient&apos;s raw variant call format file, or click to browse.
                    </p>
                    <button
                        onClick={handleUpload}
                        className="btn-biotech gap-3 py-4 text-base group relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity mix-blend-overlay" />
                        <DatabaseZap className="w-5 h-5 pointer-events-none" />
                        Start AI Analysis
                    </button>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-8">

                    {/* Faux DNA animation using CSS */}
                    <div className="relative w-24 h-40 mb-8 flex justify-center items-center perspective-1000">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-16 h-1 flex justify-between items-center"
                                style={{ top: `${(i / 7) * 100}%` }}
                                animate={{ rotateY: [0, 360] }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "linear",
                                    delay: i * 0.15,
                                }}
                            >
                                <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_#00f0ff]" />
                                <div className="h-[1px] flex-1 bg-gradient-to-r from-primary to-secondary opacity-50" />
                                <div className="w-2 h-2 rounded-full bg-secondary shadow-[0_0_10px_#b535f6]" />
                            </motion.div>
                        ))}
                    </div>

                    <div className="w-full mb-6">
                        <div className="flex justify-between text-sm font-mono mb-2">
                            <span className="text-primary font-bold">SYS_PROCESS</span>
                            <span className="text-white">{progress}%</span>
                        </div>
                        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-gradient-to-r from-primary to-secondary"
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ ease: "linear" }}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 w-full">
                        {steps.map((step, idx) => {
                            const isActive = idx === currentStep;
                            const isDone = idx < currentStep;
                            return (
                                <div key={idx} className="flex items-center gap-3">
                                    {isDone ? (
                                        <CheckCircle2 className="w-4 h-4 text-primary" />
                                    ) : isActive ? (
                                        <Loader2 className="w-4 h-4 text-warning animate-spin" />
                                    ) : (
                                        <div className="w-4 h-4 rounded-full border border-white/20" />
                                    )}
                                    <span className={`text-sm tracking-wide ${isDone ? "text-gray-400" : isActive ? "text-white font-medium" : "text-gray-600"}`}>
                                        {step}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
