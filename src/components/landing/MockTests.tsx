"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
    Clock,
    Target,
    BarChart,
    Award,
    Shield,
    Zap,
    TrendingUp,
    CheckCircle,
    Sparkles,
    Timer,
    Users
} from "lucide-react";
import { useState } from "react";

const mockTestFeatures = [
    {
        title: "Platform-Created & Managed",
        desc: "Official tests designed by KNOW team to ensure quality and standardization.",
        icon: Shield,
        color: "#5A7ACD",
    },
    {
        title: "Time-Bound with Real Pressure",
        desc: "Simulate actual exam conditions with strict time limits and interface.",
        icon: Timer,
        color: "#FEB05D",
    },
    {
        title: "Auto-Evaluated Performance",
        desc: "Instant scoring with detailed analytics on strengths and weaknesses.",
        icon: BarChart,
        color: "#10B981",
    },
    {
        title: "Ranking Basis Only",
        desc: "Your rank depends solely on these tests - no bias, pure performance.",
        icon: Award,
        color: "#8B5CF6",
    },
];

const testStats = [
    { value: "500+", label: "Platform Tests", icon: Target },
    { value: "94%", label: "Accuracy Rate", icon: TrendingUp },
    { value: "10K+", label: "Tests Taken", icon: Users },
    { value: "<30min", label: "Result Time", icon: Clock },
];

export default function MockTests() {
    const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
    const [hoveredButton, setHoveredButton] = useState<string | null>(null);

    return (
        <section
            id="mock-tests"
            className="relative overflow-hidden py-32"
            style={{ backgroundColor: "#F5F2F2" }}
        >
            {/* Background elements */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                {/* Animated gradient circles */}
                <motion.div
                    animate={{
                        x: [0, 30, 0],
                        y: [0, -30, 0],
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full opacity-5 blur-3xl"
                    style={{ backgroundColor: "#5A7ACD" }}
                />
                <motion.div
                    animate={{
                        x: [0, -20, 0],
                        y: [0, 20, 0],
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear", delay: 3 }}
                    className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full opacity-5 blur-3xl"
                    style={{ backgroundColor: "#FEB05D" }}
                />
            </div>

            <div className="mx-auto max-w-7xl px-6">
                <div className="grid items-center gap-20 lg:grid-cols-2">
                    {/* LEFT CONTENT */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.7 }}
                        className="relative"
                    >
                        {/* Badge */}
                        <motion.div
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                            className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6"
                            style={{
                                backgroundColor: "#FEB05D",
                                color: "#16476A"
                            }}
                        >
                            <Zap className="h-4 w-4" />
                            <span className="text-sm font-semibold">Core Differentiator</span>
                        </motion.div>

                        {/* Main heading */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                        >
                            <h2
                                className="max-w-xl text-4xl font-bold sm:text-5xl"
                                style={{ color: "#16476A" }}
                            >
                                Official Mock Tests That
                                <br />
                                <motion.span
                                    initial={{ backgroundSize: "0% 100%" }}
                                    whileInView={{ backgroundSize: "100% 100%" }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.5, duration: 1 }}
                                    className="relative bg-gradient-to-r from-[#5A7ACD] to-[#FEB05D] bg-clip-text text-transparent"
                                >
                                    Actually Measure Skill
                                </motion.span>
                            </h2>
                        </motion.div>

                        {/* Description */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="mt-6 max-w-xl text-lg leading-relaxed"
                            style={{ color: "#16476A", opacity: 0.8 }}
                        >
                            KNOW's mock tests are not random practice sets. They are{" "}
                            <span className="font-semibold" style={{ color: "#5A7ACD" }}>
                                platform-level, standardized assessments
                            </span>{" "}
                            designed to simulate real exam conditions and evaluate true ability.
                        </motion.p>

                        {/* Features grid */}
                        <div className="mt-10 grid grid-cols-2 gap-4">
                            {mockTestFeatures.map((feature, index) => (
                                <motion.div
                                    key={feature.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.5 + index * 0.1 }}
                                    onHoverStart={() => setHoveredFeature(index)}
                                    onHoverEnd={() => setHoveredFeature(null)}
                                    className="relative"
                                >
                                    <motion.div
                                        animate={{
                                            y: hoveredFeature === index ? -5 : 0,
                                            scale: hoveredFeature === index ? 1.02 : 1
                                        }}
                                        transition={{ duration: 0.2 }}
                                        className="rounded-xl p-4 h-full"
                                        style={{
                                            backgroundColor: hoveredFeature === index ?
                                                `${feature.color}10` : "#FFFFFF",
                                            border: `1px solid ${feature.color}30`
                                        }}
                                    >
                                        <div className="flex items-start gap-3">
                                            <motion.div
                                                animate={{
                                                    scale: hoveredFeature === index ? 1.2 : 1,
                                                    rotate: hoveredFeature === index ? 5 : 0
                                                }}
                                                transition={{ duration: 0.2 }}
                                                className="rounded-lg p-2 flex-shrink-0"
                                                style={{ backgroundColor: `${feature.color}15` }}
                                            >
                                                <feature.icon className="h-5 w-5" style={{ color: feature.color }} />
                                            </motion.div>
                                            <div>
                                                <h4 className="text-sm font-semibold" style={{ color: "#16476A" }}>
                                                    {feature.title}
                                                </h4>
                                                <p className="text-xs mt-1" style={{ color: "#16476A", opacity: 0.7 }}>
                                                    {feature.desc}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.9 }}
                            className="mt-12 rounded-xl p-6"
                            style={{
                                backgroundColor: "#16476A",
                                backgroundImage: "linear-gradient(135deg, #16476A 0%, #1E5A8C 100%)"
                            }}
                        >
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                {testStats.map((stat, index) => (
                                    <motion.div
                                        key={stat.label}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 1 + index * 0.1 }}
                                        whileHover={{ y: -5 }}
                                        className="text-center"
                                    >
                                        <div className="inline-flex items-center justify-center w-10 h-10 rounded-full mb-3"
                                            style={{ backgroundColor: "#5A7ACD40" }}
                                        >
                                            <stat.icon className="h-5 w-5" style={{ color: "#FEB05D" }} />
                                        </div>
                                        <div className="text-2xl font-bold text-white mb-1">
                                            {stat.value}
                                        </div>
                                        <div className="text-xs" style={{ color: "#F5F2F2", opacity: 0.9 }}>
                                            {stat.label}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* CTA */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 1.2 }}
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
                                        Explore Mock Tests
                                        <motion.span
                                            animate={{ x: hoveredButton === "primary" ? 5 : 0 }}
                                            transition={{ duration: 0.2 }}
                                            className="ml-2"
                                        >
                                            <Target className="h-5 w-5" />
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
                                        View Sample Test
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

                    {/* RIGHT VISUAL */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="relative hidden lg:block"
                    >
                        {/* Main test card */}
                        <motion.div
                            initial={{ rotate: -5, opacity: 0 }}
                            whileInView={{ rotate: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
                            className="relative rounded-2xl border bg-white/80 p-8 shadow-2xl backdrop-blur-sm"
                            style={{
                                borderColor: "#5A7ACD30",
                                boxShadow: "0 25px 70px rgba(90, 122, 205, 0.15)"
                            }}
                        >
                            {/* Shine effect */}
                            <div
                                className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
                                style={{
                                    background: "linear-gradient(90deg, #5A7ACD, #FEB05D, #10B981)",
                                }}
                            />

                            {/* Header */}
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-3">
                                    <div className="rounded-lg p-2" style={{ backgroundColor: "#5A7ACD15" }}>
                                        <Target className="h-6 w-6" style={{ color: "#5A7ACD" }} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold" style={{ color: "#16476A" }}>
                                            Platform Mock Test
                                        </h4>
                                        <p className="text-sm" style={{ color: "#16476A", opacity: 0.7 }}>
                                            Computer Science • Advanced Level
                                        </p>
                                    </div>
                                </div>
                                <div className="rounded-full px-3 py-1 text-xs font-semibold"
                                    style={{
                                        backgroundColor: "#10B98120",
                                        color: "#10B981"
                                    }}
                                >
                                    Active
                                </div>
                            </div>

                            {/* Test details */}
                            <div className="space-y-6">
                                {/* Question progress */}
                                <div>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span style={{ color: "#16476A" }}>Questions Completed</span>
                                        <span className="font-medium" style={{ color: "#5A7ACD" }}>42/50</span>
                                    </div>
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: "84%" }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.6, duration: 1 }}
                                        className="h-2 rounded-full overflow-hidden"
                                    >
                                        <div
                                            className="h-full rounded-full"
                                            style={{
                                                background: "linear-gradient(90deg, #5A7ACD, #7E9CFF)",
                                            }}
                                        />
                                    </motion.div>
                                </div>

                                {/* Time progress */}
                                <div>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span style={{ color: "#16476A" }}>Time Remaining</span>
                                        <span className="font-medium" style={{ color: "#FEB05D" }}>28:15</span>
                                    </div>
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: "56%" }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.8, duration: 1 }}
                                        className="h-2 rounded-full overflow-hidden bg-[#16476A10]"
                                    >
                                        <div
                                            className="h-full rounded-full"
                                            style={{
                                                background: "linear-gradient(90deg, #FEB05D, #FFC97E)",
                                            }}
                                        />
                                    </motion.div>
                                </div>

                                {/* Performance metrics */}
                                <div className="rounded-xl p-6 relative overflow-hidden"
                                    style={{ backgroundColor: "#5A7ACD1A" }}
                                >
                                    <div className="relative z-10">
                                        <div className="flex items-center justify-between mb-4">
                                            <h5 className="font-semibold" style={{ color: "#16476A" }}>
                                                Performance Summary
                                            </h5>
                                            <div className="text-xs px-2 py-1 rounded-full"
                                                style={{
                                                    backgroundColor: "#5A7ACD20",
                                                    color: "#5A7ACD"
                                                }}
                                            >
                                                LIVE
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-3 gap-4">
                                            {[
                                                { label: "Accuracy", value: "88%", color: "#10B981" },
                                                { label: "Speed", value: "Fast", color: "#FEB05D" },
                                                { label: "Rank", value: "Top 5%", color: "#8B5CF6" },
                                            ].map((metric, index) => (
                                                <motion.div
                                                    key={metric.label}
                                                    initial={{ opacity: 0, scale: 0.9 }}
                                                    whileInView={{ opacity: 1, scale: 1 }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: 1 + index * 0.1 }}
                                                    whileHover={{ scale: 1.05 }}
                                                    className="text-center p-3 rounded-lg bg-white/50"
                                                >
                                                    <div
                                                        className="text-lg font-bold mb-1"
                                                        style={{ color: metric.color }}
                                                    >
                                                        {metric.value}
                                                    </div>
                                                    <div className="text-xs" style={{ color: "#16476A", opacity: 0.7 }}>
                                                        {metric.label}
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Animated background dots */}
                                    <div className="absolute inset-0 opacity-5">
                                        {[...Array(15)].map((_, i) => (
                                            <motion.div
                                                key={i}
                                                className="absolute w-1 h-1 rounded-full"
                                                style={{ backgroundColor: "#5A7ACD" }}
                                                animate={{
                                                    y: [0, -10, 0],
                                                    opacity: [0.3, 0.7, 0.3],
                                                }}
                                                transition={{
                                                    duration: 2,
                                                    repeat: Infinity,
                                                    delay: i * 0.2,
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* Difficulty breakdown */}
                                <div>
                                    <div className="text-sm font-medium mb-3" style={{ color: "#16476A" }}>
                                        Difficulty Breakdown
                                    </div>
                                    <div className="flex gap-2">
                                        {[
                                            { level: "Easy", count: 15, color: "#10B981" },
                                            { level: "Medium", count: 25, color: "#FEB05D" },
                                            { level: "Hard", count: 10, color: "#EF4444" },
                                        ].map((difficulty, index) => (
                                            <motion.div
                                                key={difficulty.level}
                                                initial={{ height: 0 }}
                                                whileInView={{ height: "40px" }}
                                                viewport={{ once: true }}
                                                transition={{ delay: 1.2 + index * 0.1, duration: 0.5 }}
                                                className="flex-1 flex flex-col items-center"
                                            >
                                                <div
                                                    className="w-full rounded-t-lg"
                                                    style={{
                                                        backgroundColor: difficulty.color,
                                                        height: `${(difficulty.count / 50) * 40}px`
                                                    }}
                                                />
                                                <div className="text-xs mt-2 font-medium" style={{ color: "#16476A" }}>
                                                    {difficulty.count}
                                                </div>
                                                <div className="text-xs mt-1" style={{ color: "#16476A", opacity: 0.6 }}>
                                                    {difficulty.level}
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Footer buttons */}
                            <div className="mt-8 flex gap-3">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex-1 rounded-lg py-3 text-sm font-medium text-center"
                                    style={{
                                        backgroundColor: "#5A7ACD",
                                        color: "#F5F2F2"
                                    }}
                                >
                                    Continue Test
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex-1 rounded-lg py-3 text-sm font-medium border text-center"
                                    style={{
                                        borderColor: "#5A7ACD",
                                        color: "#5A7ACD",
                                        backgroundColor: "transparent"
                                    }}
                                >
                                    View Analysis
                                </motion.button>
                            </div>
                        </motion.div>

                        {/* Floating elements */}
                        <motion.div
                            animate={{
                                y: [0, -15, 0],
                                rotate: [0, 5, 0, -5, 0],
                            }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-10 blur-xl"
                            style={{ backgroundColor: "#FEB05D" }}
                        />
                        <motion.div
                            animate={{
                                y: [0, 10, 0],
                                x: [0, 5, 0],
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