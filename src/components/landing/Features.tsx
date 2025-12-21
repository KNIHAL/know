"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import {
    BookOpen,
    Target,
    Trophy,
    Package,
    Sparkles,
    ArrowRight,
    CheckCircle,
    TrendingUp,
    Shield,
    Zap
} from "lucide-react";
import { useState } from "react";

const features = [
    {
        title: "Structured Learning",
        desc: "Well-organized notes, PPTs, quizzes and mock tests designed for clarity and depth.",
        icon: BookOpen,
        color: "#5A7ACD",
        gradient: "from-[#5A7ACD] to-[#7E9CFF]",
        points: ["Stream-wise content", "Progressive difficulty", "Self-paced learning"]
    },
    {
        title: "Official Mock Tests",
        desc: "Platform-created mock tests with real exam-level difficulty and evaluation.",
        icon: Target,
        color: "#FEB05D",
        gradient: "from-[#FEB05D] to-[#FFC97E]",
        points: ["Time-bound tests", "Auto evaluation", "Performance analytics"]
    },
    {
        title: "Rankings & Percentile",
        desc: "Transparent rankings based only on performance in official platform tests.",
        icon: Trophy,
        color: "#10B981",
        gradient: "from-[#10B981] to-[#34D399]",
        points: ["Stream leaderboards", "Percentile scores", "Skill validation"]
    },
    {
        title: "Micro-Courses",
        desc: "Complete learning bundles combining content + practice into one focused path.",
        icon: Package,
        color: "#8B5CF6",
        gradient: "from-[#8B5CF6] to-[#A78BFA]",
        points: ["Bundle discounts", "Complete syllabus", "Integrated learning"]
    },
];

export default function Features() {
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);

    return (
        <section
            id="features"
            className="relative overflow-hidden py-32"
            style={{ backgroundColor: "#F5F2F2" }}
        >
            {/* Background elements */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                {/* Animated grid */}
                <div className="absolute inset-0 opacity-5">
                    <div className="h-full w-full"
                        style={{
                            backgroundImage: `linear-gradient(to right, #16476A22 1px, transparent 1px),
                                linear-gradient(to bottom, #16476A22 1px, transparent 1px)`,
                            backgroundSize: '50px 50px',
                        }}
                    />
                </div>

                {/* Floating orbs */}
                <motion.div
                    animate={{
                        x: [0, 30, 0],
                        y: [0, -20, 0],
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute top-20 left-10 w-64 h-64 rounded-full opacity-5 blur-3xl"
                    style={{ backgroundColor: "#5A7ACD" }}
                />
                <motion.div
                    animate={{
                        x: [0, -20, 0],
                        y: [0, 30, 0],
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear", delay: 2 }}
                    className="absolute bottom-20 right-10 w-72 h-72 rounded-full opacity-5 blur-3xl"
                    style={{ backgroundColor: "#FEB05D" }}
                />
            </div>

            <div className="mx-auto max-w-7xl px-6">
                {/* Heading with animation */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7 }}
                    className="mx-auto max-w-3xl text-center"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6"
                        style={{ backgroundColor: "#5A7ACD15" }}
                    >
                        <Sparkles className="h-4 w-4" style={{ color: "#5A7ACD" }} />
                        <span className="text-sm font-medium" style={{ color: "#5A7ACD" }}>
                            Core Differentiators
                        </span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="text-4xl font-bold sm:text-5xl"
                        style={{ color: "#16476A" }}
                    >
                        Why{" "}
                        <motion.span
                            initial={{ backgroundSize: "0% 100%" }}
                            whileInView={{ backgroundSize: "100% 100%" }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5, duration: 1 }}
                            className="relative bg-gradient-to-r from-[#5A7ACD] to-[#FEB05D] bg-clip-text text-transparent"
                        >
                            KNOW
                        </motion.span>{" "}
                        is Different
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="mt-6 text-xl leading-relaxed"
                        style={{ color: "#16476A", opacity: 0.8 }}
                    >
                        We focus on{" "}
                        <span className="font-semibold" style={{ color: "#5A7ACD" }}>
                            real skill validation
                        </span>
                        , not just content consumption. Your performance is your proof.
                    </motion.p>
                </motion.div>

                {/* Features Grid */}
                <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 40, scale: 0.95 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{
                                duration: 0.6,
                                delay: index * 0.1,
                                type: "spring",
                                stiffness: 100
                            }}
                            onHoverStart={() => setHoveredCard(index)}
                            onHoverEnd={() => setHoveredCard(null)}
                            className="relative h-full"
                        >
                            {/* Card glow effect */}
                            <motion.div
                                className="absolute -inset-4 rounded-3xl opacity-0 blur-xl -z-10"
                                style={{ backgroundColor: feature.color }}
                                animate={{
                                    opacity: hoveredCard === index ? 0.15 : 0
                                }}
                                transition={{ duration: 0.3 }}
                            />

                            <Card
                                className="h-full border-none overflow-hidden relative group cursor-pointer"
                                style={{
                                    backgroundColor: "white",
                                    boxShadow: "0 10px 40px rgba(22, 71, 106, 0.05)"
                                }}
                            >
                                {/* Animated top border */}
                                <motion.div
                                    className="absolute top-0 left-0 right-0 h-1"
                                    initial={{ width: "0%" }}
                                    whileInView={{ width: "100%" }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.8 + index * 0.1, duration: 0.8 }}
                                    style={{
                                        background: `linear-gradient(90deg, ${feature.color}00, ${feature.color}, ${feature.color}00)`,
                                    }}
                                />

                                <CardContent className="p-8">
                                    {/* Icon container with animation */}
                                    <motion.div
                                        className="relative mb-6"
                                        whileHover={{ scale: 1.1 }}
                                        transition={{ type: "spring", stiffness: 400 }}
                                    >
                                        <div className="relative">
                                            {/* Icon background gradient */}
                                            <motion.div
                                                className="absolute inset-0 rounded-2xl opacity-20"
                                                animate={{
                                                    scale: hoveredCard === index ? 1.2 : 1,
                                                    rotate: hoveredCard === index ? 180 : 0,
                                                }}
                                                transition={{ duration: 0.4 }}
                                                style={{ backgroundColor: feature.color }}
                                            />

                                            {/* Icon */}
                                            <div className="relative p-4 rounded-xl"
                                                style={{
                                                    background: `linear-gradient(135deg, ${feature.color}15, ${feature.color}05)`
                                                }}
                                            >
                                                <feature.icon
                                                    className="h-8 w-8"
                                                    style={{ color: feature.color }}
                                                />
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/* Title with hover effect */}
                                    <motion.h3
                                        className="text-xl font-bold mb-3"
                                        style={{ color: "#16476A" }}
                                        animate={{
                                            x: hoveredCard === index ? 5 : 0
                                        }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        {feature.title}
                                        <motion.div
                                            className="h-[2px] rounded-full mt-2"
                                            style={{ backgroundColor: feature.color }}
                                            initial={{ width: 0 }}
                                            whileInView={{ width: "40px" }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.5 + index * 0.1 }}
                                        />
                                    </motion.h3>

                                    {/* Description */}
                                    <p className="mb-6 leading-relaxed"
                                        style={{ color: "#16476A", opacity: 0.7 }}
                                    >
                                        {feature.desc}
                                    </p>

                                    {/* Feature points */}
                                    <div className="space-y-3 mb-8">
                                        {feature.points.map((point, pointIndex) => (
                                            <motion.div
                                                key={point}
                                                initial={{ opacity: 0, x: -10 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: 0.6 + index * 0.1 + pointIndex * 0.1 }}
                                                className="flex items-center gap-3"
                                            >
                                                <motion.div
                                                    animate={{
                                                        scale: hoveredCard === index ? [1, 1.2, 1] : 1
                                                    }}
                                                    transition={{
                                                        duration: 0.3,
                                                        delay: pointIndex * 0.1
                                                    }}
                                                >
                                                    <CheckCircle
                                                        className="h-4 w-4"
                                                        style={{ color: feature.color }}
                                                    />
                                                </motion.div>
                                                <span className="text-sm" style={{ color: "#16476A", opacity: 0.8 }}>
                                                    {point}
                                                </span>
                                            </motion.div>
                                        ))}
                                    </div>

                                    {/* Interactive CTA */}
                                    <motion.div
                                        className="flex items-center gap-2 text-sm font-medium"
                                        style={{ color: feature.color }}
                                        animate={{
                                            x: hoveredCard === index ? 5 : 0
                                        }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <span>Learn more</span>
                                        <motion.div
                                            animate={{
                                                x: hoveredCard === index ? 5 : 0
                                            }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <ArrowRight className="h-4 w-4" />
                                        </motion.div>
                                    </motion.div>

                                    {/* Floating elements inside card */}
                                    {hoveredCard === index && (
                                        <>
                                            {[...Array(3)].map((_, i) => (
                                                <motion.div
                                                    key={i}
                                                    className="absolute w-1 h-1 rounded-full -z-10"
                                                    style={{ backgroundColor: feature.color }}
                                                    initial={{
                                                        x: Math.random() * 100 + "%",
                                                        y: Math.random() * 100 + "%",
                                                        opacity: 0,
                                                        scale: 0,
                                                    }}
                                                    animate={{
                                                        opacity: [0, 0.5, 0],
                                                        scale: [0, 1, 0],
                                                        x: Math.random() * 100 + "%",
                                                        y: Math.random() * 100 + "%",
                                                    }}
                                                    transition={{
                                                        duration: 1,
                                                        repeat: Infinity,
                                                        delay: i * 0.3,
                                                    }}
                                                />
                                            ))}
                                        </>
                                    )}
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* Stats banner at bottom */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 }}
                    className="mt-20 rounded-2xl p-8 relative overflow-hidden"
                    style={{
                        backgroundColor: "#16476A",
                        backgroundImage: "linear-gradient(135deg, #16476A 0%, #1E5A8C 100%)"
                    }}
                >
                    {/* Background pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0"
                            style={{
                                backgroundImage: `radial-gradient(circle at 25px 25px, #5A7ACD 2px, transparent 0)`,
                                backgroundSize: '50px 50px',
                            }}
                        />
                    </div>

                    <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { value: "10K+", label: "Active Learners", icon: TrendingUp },
                            { value: "500+", label: "Mock Tests", icon: Target },
                            { value: "94%", label: "Success Rate", icon: Trophy },
                            { value: "4.8★", label: "Student Rating", icon: Shield },
                        ].map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.9 + index * 0.1 }}
                                className="text-center"
                            >
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-4"
                                    style={{ backgroundColor: "#5A7ACD40" }}
                                >
                                    <stat.icon className="h-6 w-6" style={{ color: "#FEB05D" }} />
                                </motion.div>
                                <div className="text-3xl font-bold text-white mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-sm" style={{ color: "#F5F2F2", opacity: 0.9 }}>
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* CTA at bottom */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 1.3 }}
                        className="mt-10 text-center"
                    >
                        <p className="text-lg text-white/90 mb-6">
                            Join thousands who are already validating their skills
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center gap-2 rounded-xl px-8 py-3 font-semibold text-white relative overflow-hidden group"
                            style={{
                                backgroundColor: "#FEB05D",
                                boxShadow: "0 10px 30px rgba(254, 176, 93, 0.3)"
                            }}
                        >
                            <span className="relative z-10">Start Here</span>
                            <motion.div
                                className="relative z-10"
                                animate={{ x: [0, 5, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            >
                                <Zap className="h-5 w-5" />
                            </motion.div>

                            {/* Hover effect */}
                            <motion.div
                                className="absolute inset-0"
                                style={{ backgroundColor: "#5A7ACD" }}
                                initial={{ x: "-100%" }}
                                whileHover={{ x: 0 }}
                                transition={{ duration: 0.3 }}
                            />
                        </motion.button>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}