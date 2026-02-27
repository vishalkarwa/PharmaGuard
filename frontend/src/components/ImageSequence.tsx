"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ImageSequence() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const companyNameRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current || !canvasRef.current || !companyNameRef.current) return;

        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        if (!context) return;

        // Set canvas dimensions explicitly for high-res drawing
        canvas.width = 1920;
        canvas.height = 1080;

        const maxFrames = 40;

        // Helper to format frame numbers like ezgif-frame-001.jpg
        const currentFrame = (index: number) =>
            `/sequence/ezgif-frame-${(index + 1).toString().padStart(3, '0')}.jpg`;

        const images: HTMLImageElement[] = [];
        const sequenceState = {
            frame: 0
        };

        // Preload images into memory
        let loadedImages = 0;
        for (let i = 0; i < maxFrames; i++) {
            const img = new window.Image();
            img.src = currentFrame(i);
            img.onload = () => {
                loadedImages++;
                if (loadedImages === 1) render(); // Draw first frame immediately
            };
            images.push(img);
        }

        let lastRenderedFrame = -1;

        function render() {
            const currentIdx = Math.round(sequenceState.frame);

            // CRITICAL PERFORMANCE FIX: Don't redraw the canvas if the frame is identical
            if (currentIdx === lastRenderedFrame) return;

            if (images[currentIdx] && images[currentIdx].complete) {
                lastRenderedFrame = currentIdx; // Update tracked frame

                context?.clearRect(0, 0, canvas.width, canvas.height);

                const hRatio = canvas.width / images[currentIdx].width;
                const vRatio = canvas.height / images[currentIdx].height;
                const ratio = Math.max(hRatio, vRatio);
                const centerShift_x = (canvas.width - images[currentIdx].width * ratio) / 2;
                const centerShift_y = (canvas.height - images[currentIdx].height * ratio) / 2;

                context?.drawImage(
                    images[currentIdx],
                    0, 0, images[currentIdx].width, images[currentIdx].height,
                    centerShift_x, centerShift_y, images[currentIdx].width * ratio, images[currentIdx].height * ratio
                );
            }
        }

        // Setup Timeline
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "+=400%", // Pin for 4 viewports for a long, luxurious scrub
                scrub: 1.5, // 1.5s smoothing on scrub creates a beautiful cinematic lag
                pin: true,
                anticipatePin: 1,
            },
        });

        // Frame rendering animates over the whole timeline (0 to 1 relative duration)
        tl.to(sequenceState, {
            frame: maxFrames - 1,
            snap: "frame",
            ease: "none",
            duration: 1,
            onUpdate: render
        }, 0);

        // Name scales up and shines as capsule opens
        // Starts later and animates much faster so it doesn't spend a long time translucent
        tl.fromTo(companyNameRef.current,
            { scale: 0.7, opacity: 0, y: 40, filter: "blur(10px)" },
            { scale: 1.1, opacity: 1, y: 0, filter: "blur(0px)", duration: 0.2, ease: "power3.out" },
            0.6 // Starts exactly when the capsule is wide open
        );

        // Soft Blur Background when capsule opens (Provides depth of field)
        tl.fromTo(canvasRef.current,
            { filter: "blur(0px)" },
            { filter: "blur(16px)", duration: 0.4, ease: "power2.inOut" },
            0.6
        );

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };

    }, []);

    return (
        <section ref={containerRef} className="relative w-full h-screen bg-white overflow-hidden z-10">
            {/* Background canvas that animates sequence on scroll */}
            <canvas
                ref={canvasRef}
                className="absolute top-0 left-0 w-full h-full object-cover opacity-100 transition-opacity"
                style={{ willChange: "opacity, filter" }}
            />

            {/* Premium Vignette gradient to blend the dark/gray canvas smoothly into the clean white page below */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/30 to-white pointer-events-none z-10 block" />

            {/* Emerging Company Name (Starts hidden, scales up) */}
            <div
                ref={companyNameRef}
                className="absolute inset-0 z-30 flex flex-col items-center justify-center pointer-events-none px-4"
                style={{ opacity: 0, transform: 'scale(0.5)', willChange: "transform, opacity, filter" }}
            >
                <h2 className="text-5xl md:text-7xl font-bold tracking-widest text-[#0f172a] font-sans mb-6 text-center drop-shadow-[0_4px_20px_rgba(255,255,255,0.8)]">
                    PHARMAGUARD
                </h2>
            </div>
        </section>
    );
}
