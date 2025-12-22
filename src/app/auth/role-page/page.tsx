"use client";

import RoleCard from "@/components/role-card";
import { GraduationCap, Users } from "lucide-react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect } from "react";
import { useRouter } from "next/navigation";


export default function RolePage() {
    const router = useRouter();

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const bgX = useTransform(mouseX, [0, 1], [-20, 20]);
    const bgY = useTransform(mouseY, [0, 1], [-20, 20]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX / window.innerWidth);
            mouseY.set(e.clientY / window.innerHeight);
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <main className="relative min-h-screen w-full flex items-center justify-center px-6 overflow-hidden bg-gradient-to-b from-[#0b1020] via-[#0e1430] to-[#0b1020]">

            {/* Parallax background glow */}
            <motion.div
                style={{ x: bgX, y: bgY }}
                className="absolute inset-0 pointer-events-none"
            >
                <div className="absolute top-[-150px] left-[-150px] w-[400px] h-[400px] rounded-full bg-indigo-500/20 blur-3xl" />
                <div className="absolute bottom-[-150px] right-[-150px] w-[420px] h-[420px] rounded-full bg-orange-400/20 blur-3xl" />
            </motion.div>

            {/* Floating dot grid */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.15]">
                <svg width="100%" height="100%">
                    <defs>
                        <pattern
                            id="dots"
                            x="0"
                            y="0"
                            width="40"
                            height="40"
                            patternUnits="userSpaceOnUse"
                        >
                            <circle cx="2" cy="2" r="1" fill="white" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#dots)" />
                </svg>
            </div>

            <div className="relative w-full max-w-6xl mx-auto text-center z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Choose Your <span className="text-indigo-400">Journey</span>
                    </h1>
                    <p className="text-gray-400 text-base md:text-lg">
                        Select how you want to experience KNOW
                    </p>
                </motion.div>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 place-items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <RoleCard
                            title="Student"
                            description="Learn, practice, and prove your skills with performance-based validation."
                            icon={<GraduationCap className="w-10 h-10 text-white" />}
                            gradient="#4f7cff"
                            features={[
                                "Access platform mock tests",
                                "Get ranked by performance",
                                "Purchase learning materials",
                                "Track progress with analytics",
                            ]}
                            isHighlighted
                            onClick={() => router.push("/auth/signup/student")}
                        />
                    </motion.div>


                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <RoleCard
                            title="Teacher"
                            description="Create content, share knowledge, and earn through transparent commission."
                            icon={<Users className="w-10 h-10 text-white" />}
                            gradient="#f4a259"
                            features={[
                                "Create and sell content",
                                "15–20% platform commission",
                                "Track earnings dashboard",
                                "Receive student feedback",
                            ]}
                            onClick={() => router.push("/auth/signup/teacher")}
                        />
                    </motion.div>
                </div>
            </div>
        </main>
    );
}
