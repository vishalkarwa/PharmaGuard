"use client";

import { motion } from "framer-motion";
import { Layers, Activity, FileText, CheckCircle } from "lucide-react";

const features = [
    {
        title: "Star Allele Mapping",
        icon: Layers
    },
    {
        title: "Phenotype Inference",
        icon: Activity
    },
    {
        title: "CPIC Integration",
        icon: CheckCircle
    },
    {
        title: "Clinical Report Generation",
        icon: FileText
    }
];

export default function SolutionSection() {
    return (
        <section className="relative w-full py-32 bg-transparent z-10 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-24 max-w-3xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 mb-8"
                    >
                        Pharmacogenomics. Simplified.
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-xl text-slate-600 font-light leading-relaxed max-w-2xl mx-auto"
                    >
                        PharmaGuard analyzes genetic variants, infers metabolic phenotypes, and applies clinical guidelines to generate provider-ready safety recommendations.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, idx) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className="glass-card p-10 flex flex-col items-center justify-center text-center transition-colors duration-500"
                        >
                            <feature.icon className="w-10 h-10 text-primary mb-6 opacity-90" />
                            <h3 className="text-lg font-medium text-slate-900 tracking-wide">{feature.title}</h3>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
