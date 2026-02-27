"use client";

import { motion } from "framer-motion";

export default function ProblemSection() {
    return (
        <section className="relative w-full py-48 bg-transparent z-10 flex flex-col items-center justify-center text-center px-6">
            <div className="max-w-4xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-8"
                >
                    One Prescription Doesn’t Fit All.
                </motion.h2>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="space-y-4 max-w-2xl mx-auto"
                >
                    <p className="text-xl md:text-2xl text-slate-600 font-light leading-relaxed">
                        Drug response varies by genetics.
                    </p>
                    <p className="text-xl md:text-2xl text-slate-600 font-light leading-relaxed">
                        Standard dosing ignores critical genomic variation.
                    </p>
                    <p className="text-xl md:text-2xl text-slate-600 font-light leading-relaxed">
                        Adverse reactions and therapeutic failure remain preventable.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
