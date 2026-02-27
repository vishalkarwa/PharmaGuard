"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import InteractiveDemo from "@/components/InteractiveDemo";
import { Home } from "lucide-react";

export default function AnalyzePage() {
    return (
        <main className="w-full min-h-screen bg-background relative overflow-hidden pt-24 pb-12">
            {/* Top Navigation Frame */}
            <div className="absolute top-0 left-0 w-full p-6 z-50 flex items-center justify-between">
                <Link href="/" className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors">
                    <Home className="w-4 h-4" />
                    <span className="text-sm font-medium">Home</span>
                </Link>
            </div>

            {/* Ambient Background glow */}
            <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-secondary/5 rounded-full blur-[150px] pointer-events-none" />

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full relative z-10"
            >
                <div className="-mt-32">
                    <InteractiveDemo />
                </div>
            </motion.div>
        </main>
    );
}
