"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Helper to generate random numbers
const randomBetween = (min: number, max: number) => Math.random() * (max - min) + min;

export default function Background() {
    const [isClient, setIsClient] = useState(false);
    const particlesCount = 40;

    // Need to fix hydration mismatch due to random on server vs client
    const [particles, setParticles] = useState<{ id: number; size: number; left: string; top: string; duration: number; delay: number; opacity: number; }[]>([]);

    useEffect(() => {
        const generated = Array.from({ length: particlesCount }).map((_, i) => ({
            id: i,
            size: randomBetween(2, 6),
            left: `${randomBetween(0, 100)}vw`,
            top: `${randomBetween(0, 100)}vh`,
            duration: randomBetween(15, 30),
            delay: randomBetween(0, 10),
            opacity: randomBetween(0.1, 0.5),
        }));

        // Use timeout to push setState out of synchronous render path
        const timer = setTimeout(() => {
            setParticles(generated);
            setIsClient(true);
        }, 0);

        return () => clearTimeout(timer);
    }, []);

    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 3000], [0, 300]);
    const y2 = useTransform(scrollY, [0, 3000], [0, -200]);

    if (!isClient) return <div className="fixed inset-0 z-[-1] bg-white"></div>;

    return (
        <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-white">
            {/* Subtle radial cyan glow strictly targeted behind the hero section */}
            <motion.div
                style={{ y: y1 }}
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[80vh] bg-blue-500/10 blur-[180px] rounded-full mix-blend-multiply block"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                transition={{ duration: 2, ease: "easeInOut" }}
            />

            {/* Very soft moving background particles */}
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute rounded-full bg-slate-300"
                    style={{
                        width: p.size,
                        height: p.size,
                        left: p.left,
                        top: p.top,
                        opacity: p.opacity * 0.5,
                        willChange: "transform, opacity",
                    }}
                    initial={{ y: 0 }}
                    animate={{ y: [0, -150, 0] }}
                    transition={{
                        duration: p.duration * 1.5,
                        repeat: Infinity,
                        ease: "linear",
                        delay: p.delay,
                    }}
                />
            ))}
        </div>
    );
}
