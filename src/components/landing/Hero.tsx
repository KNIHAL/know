"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Trophy, Target, TrendingUp, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

// Floating element component
const FloatingElement = ({ delay = 0, children }: { delay?: number, children: React.ReactNode }) => (
    <motion.div
        initial={{ y: 0 }}
        animate={{ y: [0, -10, 0] }}
        transition={{
            duration: 3,
            delay,
            repeat: Infinity,
            ease: "easeInOut",
        }}
        className="relative"
    >
        {children}
    </motion.div>
);

export default function Hero() {
    const [hoveredButton, setHoveredButton] = useState<string | null>(null);

    return (
        <section className="relative overflow-hidden pt-32 pb-28 md:pt-40 md:pb-32">
            {/* Animated background gradient */}
            <div className="absolute inset-0 -z-20">
                <div
                    className="absolute inset-0 opacity-30"
                    style={{
                        background: "radial-gradient(circle at 20% 50%, #5A7ACD22 0%, transparent 50%), radial-gradient(circle at 80% 20%, #FEB05D22 0%, transparent 50%)",
                    }}
                />

                {/* Moving gradient orbs */}
                <motion.div
                    animate={{
                        x: [0, 100, 0],
                        y: [0, 50, 0],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="absolute top-1/4 left-1/4 w-[300px] h-[300px] rounded-full opacity-10 blur-3xl"
                    style={{ backgroundColor: "#5A7ACD" }}
                />

                <motion.div
                    animate={{
                        x: [0, -100, 0],
                        y: [0, -50, 0],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "linear",
                        delay: 2,
                    }}
                    className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-10 blur-3xl"
                    style={{ backgroundColor: "#FEB05D" }}
                />
            </div>

            {/* Animated particles */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-[2px] h-[2px] rounded-full"
                        style={{ backgroundColor: "#5A7ACD" }}
                        initial={{
                            x: Math.random() * 100 + "vw",
                            y: Math.random() * 100 + "vh",
                            opacity: 0.3,
                        }}
                        animate={{
                            y: [null, `-${Math.random() * 50 + 20}px`],
                            opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{
                            duration: Math.random() * 3 + 2,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                        }}
                    />
                ))}
            </div>

            <div className="mx-auto max-w-7xl px-6">
                <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
                    {/* LEFT CONTENT */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.8,
                            ease: [0.25, 0.1, 0.25, 1],
                            delay: 0.2
                        }}
                        className="relative"
                    >
                        {/* Floating badge */}
                        <FloatingElement delay={0.3}>
                            <Badge
                                className="mb-6 border-none px-4 py-2 text-sm font-semibold shadow-sm"
                                style={{
                                    backgroundColor: "#FEB05D",
                                    color: "#16476A"
                                }}
                            >
                                <motion.div
                                    animate={{ rotate: [0, 10, 0, -10, 0] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="mr-2"
                                >
                                    <Trophy className="h-3 w-3" />
                                </motion.div>
                                Skill Validation Platform
                            </Badge>
                        </FloatingElement>

                        {/* Main heading with stagger animation */}
                        <div className="overflow-hidden">
                            <motion.h1
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4, duration: 0.6 }}
                                className="max-w-xl text-4xl font-bold leading-tight sm:text-5xl md:text-6xl"
                                style={{ color: "#16476A" }}
                            >
                                Learn. Practice.
                                <br />
                                <motion.span
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.6, duration: 0.6 }}
                                    className="relative inline-block"
                                    style={{ color: "#5A7ACD" }}
                                >
                                    Prove Your Skills.
                                    <motion.div
                                        className="absolute -bottom-2 left-0 h-[3px] rounded-full"
                                        style={{ backgroundColor: "#FEB05D" }}
                                        initial={{ width: 0 }}
                                        animate={{ width: "100%" }}
                                        transition={{ delay: 0.8, duration: 0.8 }}
                                    />
                                </motion.span>
                            </motion.h1>
                        </div>

                        {/* Description */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8, duration: 0.6 }}
                            className="mt-6 max-w-xl text-lg leading-relaxed"
                            style={{ color: "#16476A", opacity: 0.85 }}
                        >
                            KNOW is where <span className="font-semibold" style={{ color: "#5A7ACD" }}>real skills</span> are validated through official mock tests, performance-based rankings, and transparent evaluation — not just certificates.
                        </motion.p>

                        {/* Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1, duration: 0.6 }}
                            className="mt-8 flex flex-wrap gap-6"
                        >
                            {[
                                { label: "Mock Tests", value: "500+", icon: Target },
                                { label: "Active Students", value: "10K+", icon: TrendingUp },
                                { label: "Success Rate", value: "94%", icon: Trophy },
                            ].map((stat, index) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 1.1 + index * 0.1 }}
                                    whileHover={{ y: -5 }}
                                    className="flex items-center gap-3"
                                >
                                    <div className="rounded-lg p-2" style={{ backgroundColor: "#5A7ACD15" }}>
                                        <stat.icon className="h-4 w-4" style={{ color: "#5A7ACD" }} />
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold" style={{ color: "#16476A" }}>
                                            {stat.value}
                                        </div>
                                        <div className="text-sm" style={{ color: "#16476A", opacity: 0.7 }}>
                                            {stat.label}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.3, duration: 0.6 }}
                            className="mt-10 flex flex-wrap gap-4"
                        >
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onHoverStart={() => setHoveredButton("primary")}
                                onHoverEnd={() => setHoveredButton(null)}
                                className="relative"
                            >
                                <Button
                                    size="lg"
                                    className="group px-8 py-6 text-base font-semibold relative overflow-hidden"
                                    style={{
                                        backgroundColor: "#5A7ACD",
                                        color: "#F5F2F2",
                                    }}
                                >
                                    <span className="relative z-10 flex items-center">
                                        Get Started Free
                                        <motion.span
                                            animate={{ x: hoveredButton === "primary" ? 5 : 0 }}
                                            transition={{ duration: 0.2 }}
                                            className="ml-2"
                                        >
                                            <ArrowRight className="h-5 w-5" />
                                        </motion.span>
                                    </span>

                                    {/* Button hover effect */}
                                    <motion.div
                                        className="absolute inset-0"
                                        style={{ backgroundColor: "#16476A" }}
                                        initial={{ x: "-100%" }}
                                        whileHover={{ x: 0 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </Button>

                                {/* Glow effect */}
                                <motion.div
                                    className="absolute -inset-1 rounded-lg opacity-0 blur-md"
                                    style={{ backgroundColor: "#5A7ACD" }}
                                    animate={{
                                        opacity: hoveredButton === "primary" ? 0.4 : 0
                                    }}
                                    transition={{ duration: 0.2 }}
                                />
                            </motion.div>

                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onHoverStart={() => setHoveredButton("secondary")}
                                onHoverEnd={() => setHoveredButton(null)}
                            >
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="px-8 py-6 text-base font-semibold group relative overflow-hidden"
                                    style={{
                                        borderColor: "#16476A",
                                        color: "#16476A",
                                        backgroundColor: "transparent",
                                    }}
                                >
                                    <span className="relative z-10 flex items-center">
                                        Explore Mock Tests
                                        <motion.div
                                            animate={{ rotate: hoveredButton === "secondary" ? 90 : 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="ml-2"
                                        >
                                            <Sparkles className="h-4 w-4" />
                                        </motion.div>
                                    </span>

                                    {/* Hover background */}
                                    <motion.div
                                        className="absolute inset-0"
                                        style={{ backgroundColor: "#16476A11" }}
                                        initial={{ x: "-100%" }}
                                        whileHover={{ x: 0 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </Button>
                            </motion.div>
                        </motion.div>
                    </motion.div>

                    {/* RIGHT VISUAL - Enhanced with animations */}
                    <motion.div
                        initial={{ opacity: 0, x: 50, rotate: 5 }}
                        animate={{ opacity: 1, x: 0, rotate: 0 }}
                        transition={{
                            duration: 0.8,
                            ease: "backOut",
                            delay: 0.5
                        }}
                        className="relative hidden lg:block"
                    >
                        {/* Main card */}
                        <FloatingElement delay={0.5}>
                            <motion.div
                                whileHover={{ y: -10 }}
                                transition={{ duration: 0.3 }}
                                className="relative rounded-2xl border bg-white/80 p-8 shadow-2xl backdrop-blur-sm"
                                style={{
                                    borderColor: "#5A7ACD22",
                                    boxShadow: "0 20px 60px rgba(90, 122, 205, 0.15)"
                                }}
                            >
                                {/* Card shine effect */}
                                <div
                                    className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
                                    style={{
                                        background: "linear-gradient(90deg, #5A7ACD, #FEB05D)",
                                    }}
                                />

                                {/* Animated content */}
                                <div className="space-y-6">
                                    {/* Animated header */}
                                    <div className="space-y-4">
                                        <motion.div
                                            animate={{ width: ["30%", "40%", "30%"] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                            className="h-3 rounded-full bg-gradient-to-r from-[#16476A]/20 to-[#5A7ACD]/40"
                                        />
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: "100%" }}
                                            transition={{ delay: 1, duration: 0.8 }}
                                            className="h-8 rounded-full bg-gradient-to-r from-[#16476A]/10 to-[#5A7ACD]/20"
                                        />
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: "86%" }}
                                            transition={{ delay: 1.2, duration: 0.8 }}
                                            className="h-8 rounded-full bg-gradient-to-r from-[#16476A]/10 to-[#5A7ACD]/20"
                                        />
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: "63%" }}
                                            transition={{ delay: 1.4, duration: 0.8 }}
                                            className="h-8 rounded-full bg-gradient-to-r from-[#16476A]/10 to-[#5A7ACD]/20"
                                        />
                                    </div>

                                    {/* Mock test result card */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 1.6 }}
                                        className="rounded-xl p-6 relative overflow-hidden"
                                        style={{ backgroundColor: "#5A7ACD1A" }}
                                    >
                                        {/* Animated background dots */}
                                        <div className="absolute inset-0 opacity-10">
                                            {[...Array(20)].map((_, i) => (
                                                <div
                                                    key={i}
                                                    className="absolute w-1 h-1 rounded-full"
                                                    style={{
                                                        backgroundColor: "#5A7ACD",
                                                        left: `${Math.random() * 100}%`,
                                                        top: `${Math.random() * 100}%`,
                                                    }}
                                                />
                                            ))}
                                        </div>

                                        <div className="relative z-10">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <motion.div
                                                        animate={{ rotate: [0, 360] }}
                                                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                                    >
                                                        <Trophy className="h-5 w-5" style={{ color: "#FEB05D" }} />
                                                    </motion.div>
                                                    <p className="font-semibold" style={{ color: "#16476A" }}>
                                                        Official Mock Test Result
                                                    </p>
                                                </div>
                                                <Badge
                                                    className="border-none"
                                                    style={{
                                                        backgroundColor: "#10B981",
                                                        color: "#FFFFFF"
                                                    }}
                                                >
                                                    Completed
                                                </Badge>
                                            </div>

                                            <div className="mt-4 grid grid-cols-3 gap-4">
                                                {[
                                                    { label: "Rank", value: "124", change: "+5" },
                                                    { label: "Score", value: "92%", change: null },
                                                    { label: "Percentile", value: "96.3", change: "+2.1" },
                                                ].map((stat, index) => (
                                                    <motion.div
                                                        key={stat.label}
                                                        initial={{ opacity: 0, scale: 0.9 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        transition={{ delay: 1.8 + index * 0.1 }}
                                                        whileHover={{ scale: 1.05 }}
                                                        className="text-center"
                                                    >
                                                        <div className="text-2xl font-bold" style={{ color: "#16476A" }}>
                                                            {stat.value}
                                                        </div>
                                                        <div className="text-sm mt-1" style={{ color: "#16476A", opacity: 0.7 }}>
                                                            {stat.label}
                                                            {stat.change && (
                                                                <span className="ml-1 text-xs font-medium" style={{ color: "#10B981" }}>
                                                                    {stat.change}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/* Progress bar */}
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span style={{ color: "#16476A" }}>Skill Level</span>
                                            <span className="font-medium" style={{ color: "#5A7ACD" }}>Advanced</span>
                                        </div>
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: "85%" }}
                                            transition={{ delay: 2, duration: 1 }}
                                            className="h-2 rounded-full overflow-hidden"
                                        >
                                            <div
                                                className="h-full rounded-full"
                                                style={{
                                                    background: "linear-gradient(90deg, #5A7ACD, #FEB05D)",
                                                }}
                                            />
                                        </motion.div>
                                    </div>
                                </div>
                            </motion.div>
                        </FloatingElement>

                        {/* Decorative floating elements */}
                        <motion.div
                            animate={{
                                y: [0, -20, 0],
                                rotate: [0, 5, 0, -5, 0],
                            }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-10 blur-xl"
                            style={{ backgroundColor: "#FEB05D" }}
                        />
                        <motion.div
                            animate={{
                                y: [0, 15, 0],
                                x: [0, 10, 0],
                            }}
                            transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                            className="absolute -bottom-8 -left-8 w-20 h-20 rounded-full opacity-10 blur-xl"
                            style={{ backgroundColor: "#5A7ACD" }}
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}