"use client";

import { motion } from "framer-motion";
import {
    BookOpen,
    Target,
    Trophy,
    ArrowRight,
    CheckCircle,
    Zap
} from "lucide-react";
import { useState } from "react";

const steps = [
    {
        step: "01",
        title: "Understand Yourself",
        desc: "Explore your interests, abilities, and learning preferences through guided resources.",
        icon: BookOpen,
        color: "#5A7ACD",
        gradient: "from-[#5A7ACD] to-[#7E9CFF]",
        features: ["Interest-based", "Self-paced", "Reflective"]
    },
    {
        step: "02",
        title: "Explore Career Directions",
        desc: "Use simple assessments to understand which career paths suit you better.",
        icon: Target,
        color: "#FEB05D",
        gradient: "from-[#FEB05D] to-[#FFC97E]",
        features: ["Low-pressure", "Insight-driven", "Clarity focused"]
    },
    {
        step: "03",
        title: "Grow with Direction",
        desc: "Follow structured guidance to build skills with confidence and purpose.",
        icon: Trophy,
        color: "#10B981",
        gradient: "from-[#10B981] to-[#34D399]",
        features: ["Clear next steps", "Focused growth", "Confidence building"]
    },
];

export default function HowItWorks() {
    const [hoveredStep, setHoveredStep] = useState<number | null>(null);

    return (
        <section
            id="how-it-works"
            className="relative overflow-hidden py-32"
            style={{ backgroundColor: "#F5F2F2" }}
        >
            {/* Background patterns */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                {/* Abstract circular pattern */}
                <div className="absolute top-1/4 left-10 w-96 h-96 rounded-full opacity-5 blur-3xl"
                    style={{ backgroundColor: "#5A7ACD" }}
                />
                <div className="absolute bottom-1/4 right-10 w-96 h-96 rounded-full opacity-5 blur-3xl"
                    style={{ backgroundColor: "#FEB05D" }}
                />

                {/* Grid pattern */}
                <div className="absolute inset-0 opacity-3">
                    <div className="h-full w-full"
                        style={{
                            backgroundImage: `radial-gradient(circle at 2px 2px, #16476A 1px, transparent 0)`,
                            backgroundSize: '40px 40px',
                        }}
                    />
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-6">
                {/* Heading section */}
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
                        <Zap className="h-4 w-4" style={{ color: "#5A7ACD" }} />
                        <span className="text-sm font-medium" style={{ color: "#5A7ACD" }}>
                            3-Step Process
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
                        How{" "}
                        <motion.span
                            initial={{ backgroundSize: "0% 100%" }}
                            whileInView={{ backgroundSize: "100% 100%" }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5, duration: 1 }}
                            className="bg-gradient-to-r from-[#5A7ACD] via-[#FEB05D] to-[#10B981] bg-clip-text text-transparent"
                        >
                            KNOW
                        </motion.span>{" "}
                        Works
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="mt-6 text-xl leading-relaxed"
                        style={{ color: "#16476A", opacity: 0.8 }}
                    >
                        A simple,{" "}
                        <span className="font-semibold" style={{ color: "#5A7ACD" }}>
                            transparent process to discover your strengths and direction.
                        </span>

                    </motion.p>
                </motion.div>

                {/* Steps grid with connecting lines */}
                <div className="relative mt-24">
                    {/* Connecting line for desktop */}
                    <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 -translate-y-1/2">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#5A7ACD] via-[#FEB05D] to-[#10B981] opacity-20 rounded-full" />
                    </div>

                    <div className="grid gap-8 lg:grid-cols-3 lg:gap-12">
                        {steps.map((item, index) => (
                            <motion.div
                                key={item.step}
                                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{
                                    duration: 0.6,
                                    delay: index * 0.2,
                                    type: "spring",
                                    stiffness: 100
                                }}
                                onHoverStart={() => setHoveredStep(index)}
                                onHoverEnd={() => setHoveredStep(null)}
                                className="relative z-10"
                            >
                                {/* Step connector arrow for desktop */}
                                {index < steps.length - 1 && (
                                    <div className="hidden lg:block absolute top-1/2 -right-6 w-12 h-12 -translate-y-1/2 z-0">
                                        <motion.div
                                            animate={{
                                                x: hoveredStep === index ? 5 : 0,
                                                opacity: hoveredStep === index ? 1 : 0.5
                                            }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <ArrowRight className="h-full w-full"
                                                style={{ color: item.color, opacity: 0.3 }}
                                            />
                                        </motion.div>
                                    </div>
                                )}

                                {/* Main step card */}
                                <div className="relative h-full">
                                    {/* Floating step number */}
                                    <motion.div
                                        initial={{ y: 0 }}
                                        whileHover={{ y: -5 }}
                                        className="absolute -top-6 left-1/2 -translate-x-1/2 z-20"
                                    >
                                        <motion.div
                                            animate={{
                                                scale: hoveredStep === index ? 1.2 : 1,
                                                rotate: hoveredStep === index ? 360 : 0
                                            }}
                                            transition={{ duration: 0.5 }}
                                            className="relative"
                                        >
                                            {/* Outer ring */}
                                            <div className="absolute inset-0 rounded-full animate-ping opacity-20"
                                                style={{ backgroundColor: item.color }}
                                            />

                                            {/* Main circle */}
                                            <div
                                                className="relative w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg"
                                                style={{
                                                    backgroundColor: item.color,
                                                    boxShadow: `0 10px 30px ${item.color}40`
                                                }}
                                            >
                                                {item.step}

                                                {/* Inner glow */}
                                                <div className="absolute inset-2 rounded-full opacity-30"
                                                    style={{
                                                        background: `radial-gradient(circle at center, white, transparent 70%)`
                                                    }}
                                                />
                                            </div>
                                        </motion.div>
                                    </motion.div>

                                    {/* Step card */}
                                    <motion.div
                                        whileHover={{
                                            y: -10,
                                            boxShadow: `0 20px 50px ${item.color}20`
                                        }}
                                        transition={{ duration: 0.3 }}
                                        className="relative rounded-2xl bg-white p-8 pt-12 border h-full overflow-hidden group"
                                        style={{
                                            borderColor: `${item.color}30`,
                                            boxShadow: "0 10px 40px rgba(22, 71, 106, 0.08)"
                                        }}
                                    >
                                        {/* Card shine effect */}
                                        <div
                                            className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
                                            style={{
                                                background: `linear-gradient(90deg, ${item.color}00, ${item.color}, ${item.color}00)`,
                                            }}
                                        />

                                        {/* Icon container */}
                                        <motion.div
                                            animate={{
                                                scale: hoveredStep === index ? 1.1 : 1,
                                                rotate: hoveredStep === index ? 5 : 0
                                            }}
                                            transition={{ duration: 0.3 }}
                                            className="relative mb-6"
                                        >
                                            <div className="relative inline-block">
                                                {/* Icon background */}
                                                <motion.div
                                                    className="absolute inset-0 rounded-2xl"
                                                    animate={{
                                                        scale: hoveredStep === index ? 1.2 : 1,
                                                        opacity: hoveredStep === index ? 0.2 : 0.1
                                                    }}
                                                    style={{ backgroundColor: item.color }}
                                                />

                                                {/* Icon */}
                                                <div className="relative p-4 rounded-xl"
                                                    style={{
                                                        background: `linear-gradient(135deg, ${item.color}15, ${item.color}05)`
                                                    }}
                                                >
                                                    <item.icon
                                                        className="h-8 w-8"
                                                        style={{ color: item.color }}
                                                    />
                                                </div>
                                            </div>
                                        </motion.div>

                                        {/* Title */}
                                        <motion.h3
                                            className="text-xl font-bold mb-4"
                                            style={{ color: "#16476A" }}
                                            animate={{
                                                x: hoveredStep === index ? 5 : 0
                                            }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            {item.title}
                                        </motion.h3>

                                        {/* Description */}
                                        <p className="mb-6 leading-relaxed"
                                            style={{ color: "#16476A", opacity: 0.7 }}
                                        >
                                            {item.desc}
                                        </p>

                                        {/* Features list */}
                                        <div className="space-y-3 mb-8">
                                            {item.features.map((feature, featureIndex) => (
                                                <motion.div
                                                    key={feature}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: 0.6 + index * 0.2 + featureIndex * 0.1 }}
                                                    className="flex items-center gap-3"
                                                >
                                                    <motion.div
                                                        animate={{
                                                            scale: hoveredStep === index ? [1, 1.2, 1] : 1
                                                        }}
                                                        transition={{
                                                            duration: 0.3,
                                                            delay: featureIndex * 0.1
                                                        }}
                                                    >
                                                        <CheckCircle
                                                            className="h-4 w-4"
                                                            style={{ color: item.color }}
                                                        />
                                                    </motion.div>
                                                    <span className="text-sm" style={{ color: "#16476A", opacity: 0.8 }}>
                                                        {feature}
                                                    </span>
                                                </motion.div>
                                            ))}
                                        </div>

                                        {/* Animated arrow indicator */}
                                        <motion.div
                                            className="flex items-center gap-2 text-sm font-medium mt-6 pt-6 border-t"
                                            style={{
                                                borderColor: `${item.color}20`,
                                                color: item.color
                                            }}
                                            animate={{
                                                x: hoveredStep === index ? 5 : 0
                                            }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <span>Step {item.step}</span>
                                            <motion.div
                                                animate={{
                                                    x: hoveredStep === index ? 5 : 0
                                                }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <ArrowRight className="h-4 w-4" />
                                            </motion.div>
                                        </motion.div>

                                        {/* Floating particles on hover */}
                                        {hoveredStep === index && (
                                            <>
                                                {[...Array(5)].map((_, i) => (
                                                    <motion.div
                                                        key={i}
                                                        className="absolute w-1 h-1 rounded-full -z-10"
                                                        style={{ backgroundColor: item.color }}
                                                        initial={{
                                                            x: Math.random() * 100 + "%",
                                                            y: Math.random() * 100 + "%",
                                                            opacity: 0,
                                                            scale: 0,
                                                        }}
                                                        animate={{
                                                            opacity: [0, 0.6, 0],
                                                            scale: [0, 1, 0],
                                                            x: Math.random() * 100 + "%",
                                                            y: Math.random() * 100 + "%",
                                                        }}
                                                        transition={{
                                                            duration: 1.5,
                                                            repeat: Infinity,
                                                            delay: i * 0.3,
                                                        }}
                                                    />
                                                ))}
                                            </>
                                        )}
                                    </motion.div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}