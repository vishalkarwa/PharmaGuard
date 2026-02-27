"use client";

import { motion } from "framer-motion";

const marqueeText = "PHARMAGUARD • DECODING DNA • DELIVERING SAFER PRESCRIPTIONS • ADVANCED PHARMACOGENOMICS • CPIC ALIGNED • CLINICAL GRADE AI • ";

export default function CompanyMarquee() {
    return (
        <div className="w-full bg-[#f5f5f7] border-y border-black/5 py-4 overflow-hidden relative z-20 flex items-center">
            {/* Gradient overlays for smooth fading edges */}
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10" />

            <motion.div
                className="whitespace-nowrap flex space-x-8 w-max"
                animate={{ x: [0, "-50%"] }}
                transition={{
                    ease: "linear",
                    duration: 25,
                    repeat: Infinity
                }}
            >
                <span className="text-xl md:text-2xl font-mono text-slate-800 tracking-widest uppercase mb-1">
                    {marqueeText}
                </span>
                <span className="text-xl md:text-2xl font-mono text-slate-800 tracking-widest uppercase mb-1">
                    {marqueeText}
                </span>
                <span className="text-xl md:text-2xl font-mono text-slate-800 tracking-widest uppercase mb-1">
                    {marqueeText}
                </span>
                <span className="text-xl md:text-2xl font-mono text-slate-800 tracking-widest uppercase mb-1">
                    {marqueeText}
                </span>
            </motion.div>
        </div>
    );
}
