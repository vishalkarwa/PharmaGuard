"use client";

import { useEffect } from "react";
import Lenis from "lenis";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScroller({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        // Exact Darkroom Engineering configuration
        const lenis = new Lenis({
            lerp: 0.08,             // The magic physics-based drift fraction
            wheelMultiplier: 1,     // Keep 1:1 wheel ratio
            smoothWheel: true,
            touchMultiplier: 2,
        });

        // Sync GSAP ScrollTrigger with Lenis
        lenis.on('scroll', ScrollTrigger.update);

        // Hook Lenis into GSAP's ticker for perfectly synchronized frames without micro-stutters
        const raf = (time: number) => {
            lenis.raf(time * 1000); // GSAP time is in seconds, Lenis needs milliseconds
        };

        gsap.ticker.add(raf);

        // Prevent GSAP from trying to catch up on missed frames, which causes lag spikes during scroll
        gsap.ticker.lagSmoothing(0);

        // Tell Lenis to recalculate page height when GSAP pins/unpins
        const onRefresh = () => {
            lenis.resize();
        };
        ScrollTrigger.addEventListener("refresh", onRefresh);

        return () => {
            ScrollTrigger.removeEventListener("refresh", onRefresh);
            gsap.ticker.remove(raf);
            lenis.destroy();
        };
    }, []);

    return <>{children}</>;
}
