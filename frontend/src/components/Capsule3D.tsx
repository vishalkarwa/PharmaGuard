"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
import * as THREE from "three";
import { useScroll, useSpring } from "framer-motion";

function CapsuleModel() {
    const groupRef = useRef<THREE.Group>(null);
    const { scrollY } = useScroll();

    // Add smooth spring physics to scroll behavior - softer settings
    const smoothY = useSpring(scrollY, {
        stiffness: 50,
        damping: 30,
        restDelta: 0.001
    });

    useFrame(() => {
        if (!groupRef.current) return;

        const currentScroll = smoothY.get();
        // Reduced rotation for softer effect
        groupRef.current.rotation.y = currentScroll * 0.001 + 0.4;
        groupRef.current.rotation.x = currentScroll * 0.0005 + 0.2;
    });

    // Premium Apple-level Glass Refraction (Simulated for Performance)
    const glassMaterialProps = {
        color: "#ffffff",
        transparent: true,
        opacity: 0.25,
        roughness: 0,
        metalness: 0.1,
    };

    // Soft Medical Red
    const solidMaterialProps = {
        color: "#ef4444",
        roughness: 0.3,
        metalness: 0.6
    };

    return (
        <group ref={groupRef} scale={3} position={[0, 0, -4]}>
            {/* Inner Core Glowing Cyan Light */}
            <pointLight color="#0071e3" intensity={4} distance={6} position={[0, 0, 0]} />

            {/* Top Half of Capsule (Transparent Glass) */}
            <mesh position={[0, 0.5, 0]}>
                <capsuleGeometry args={[0.5, 1, 32, 32]} />
                <meshPhysicalMaterial {...glassMaterialProps} transmission={1} thickness={0.5} />
            </mesh>

            {/* Bottom Half of Capsule (Soft Red) */}
            <mesh position={[0, -0.5, 0]}>
                <capsuleGeometry args={[0.5, 1, 32, 32]} />
                <meshStandardMaterial {...solidMaterialProps} transparent opacity={0.8} />
            </mesh>

            {/* Accenting Exterior Lights */}
            <pointLight color="#0071e3" intensity={2} distance={10} position={[-1, -1, -2]} />
        </group>
    );
}

export default function Capsule3D() {
    return (
        <div className="fixed inset-0 w-full h-full pointer-events-none z-[0] opacity-30 bg-transparent">
            {/* PERFORMANCE: Limit DPR so retina screens don't lag rendering at crazy resolutions */}
            <Canvas camera={{ position: [0, 0, 8], fov: 45 }} dpr={[1, 1.5]}>
                {/* Light Theme Ambient Light */}
                <ambientLight intensity={0.8} color="#ffffff" />
                <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
                <spotLight position={[-10, 10, -5]} intensity={2} color="#3b82f6" />
                <spotLight position={[10, -10, 5]} intensity={1.5} color="#0071e3" angle={0.5} penumbra={1} />

                <Float speed={1} rotationIntensity={0.3} floatIntensity={0.5}>
                    <CapsuleModel />
                </Float>
                <Environment preset="city" />
            </Canvas>
        </div>
    );
}
