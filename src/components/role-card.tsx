"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Zap } from "lucide-react";

type RoleCardProps = {
    title: string;
    description: string;
    icon: ReactNode;
    gradient: string;
    onClick: () => void;
    isHighlighted?: boolean;
    features: string[];
};

export default function RoleCard({
    title,
    description,
    icon,
    gradient,
    onClick,
    isHighlighted = false,
    features,
}: RoleCardProps) {
    return (
        <motion.button
            onClick={onClick}
            whileHover={{ y: -6, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 16 }}
            className="
        group
        relative
        mx-auto
        w-full
        max-w-sm
        h-[420px]
        rounded-3xl
        border border-white/15
        bg-white/5
        backdrop-blur-md
        focus:outline-none
        focus:ring-4
        focus:ring-offset-2
      "
        >
            {/* Hover gradient */}
            <div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                style={{
                    background: `linear-gradient(135deg, ${gradient}18, transparent 65%)`,
                }}
            />

            <div className="relative z-10 h-full flex flex-col items-center justify-center px-8 text-center">
                {/* Icon */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 220, delay: 0.1 }}
                    whileHover={{ scale: 1.06 }}
                    className="relative mb-8"
                >
                    {/* SINGLE glow only */}
                    <motion.div
                        animate={{ opacity: [0.35, 0.55, 0.35] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute -inset-2 rounded-full blur-xl"
                        style={{ backgroundColor: gradient }}
                    />

                    {/* Icon container */}
                    <div
                        className="relative w-24 h-24 rounded-full flex items-center justify-center bg-white shadow-xl overflow-hidden"
                        style={{
                            background: `linear-gradient(135deg, ${gradient}, ${gradient}90)`,
                        }}
                    >
                        {icon}
                    </div>

                    {/* Badges (only if highlighted) */}
                    {isHighlighted && (
                        <>
                            <motion.div
                                animate={{ y: [0, -4, 0] }}
                                transition={{ duration: 3, repeat: Infinity }}
                                className="absolute -top-2 -right-2"
                            >
                                <div className="rounded-full p-2 bg-white shadow-md">
                                    <Sparkles className="h-4 w-4" style={{ color: gradient }} />
                                </div>
                            </motion.div>

                            <motion.div
                                animate={{ y: [0, 4, 0] }}
                                transition={{ duration: 4, repeat: Infinity }}
                                className="absolute -bottom-2 -left-2"
                            >
                                <div className="rounded-full p-2 bg-white shadow-md">
                                    <Zap className="h-4 w-4" style={{ color: gradient }} />
                                </div>
                            </motion.div>
                        </>
                    )}
                </motion.div>

                {/* Title */}
                <h2 className="text-2xl font-bold text-white mb-2">
                    {title}
                    {isHighlighted && <span className="ml-2">⭐</span>}
                </h2>

                {/* Description */}
                <p className="text-gray-300 mb-5">{description}</p>

                {/* Features */}
                <div className="w-full space-y-2 mb-7">
                    {features.map((feature) => (
                        <div
                            key={feature}
                            className="flex items-center justify-center gap-2 text-sm"
                        >
                            <div
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: gradient }}
                            />
                            <span className="text-gray-400">{feature}</span>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="relative">
                    <div
                        className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white"
                        style={{ backgroundColor: gradient }}
                    >
                        <span>Continue as {title}</span>
                        <motion.span
                            animate={{ x: [0, 6, 0] }}
                            transition={{ duration: 1.4, repeat: Infinity }}
                        >
                            <ArrowRight className="h-5 w-5" />
                        </motion.span>
                    </div>
                </div>
            </div>
        </motion.button>
    );
}
