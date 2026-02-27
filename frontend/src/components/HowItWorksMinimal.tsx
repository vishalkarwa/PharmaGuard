"use client";

import { motion } from "framer-motion";

const steps = [
    "Upload.",
    "Decode.",
    "Interpret.",
    "Apply.",
    "Deliver."
];

export default function HowItWorksMinimal() {
    return (
        <section className="relative w-full py-48 bg-transparent z-10 px-6">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start justify-between">

                <div className="md:w-1/2 mb-16 md:mb-0">
                    <motion.h2
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 sticky top-32"
                    >
                        From Genome<br className="hidden md:block" /> to Guidance.
                    </motion.h2>
                </div>

                <div className="md:w-1/2 flex flex-col gap-12 md:gap-24 md:pl-20 border-l border-black/5">
                    {steps.map((step, idx) => (
                        <motion.div
                            key={step}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            className="relative"
                        >
                            {/* Dot indicator */}
                            <div className="absolute -left-[5px] top-1/2 -translate-y-1/2 md:-left-[85px] w-2 h-2 rounded-full bg-slate-400" />
                            <h3 className="text-3xl md:text-5xl font-light text-slate-700 tracking-wide ml-6 md:ml-0">
                                {step}
                            </h3>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
