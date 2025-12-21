"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
    Trophy,
    TrendingUp,
    Target,
    Shield,
    Zap,
    Award,
    BarChart3,
    Users,
    Sparkles,
    Medal,
    Crown,
    Star,
    ChevronRight
} from "lucide-react";
import { useState } from "react";

const leaderboardData = [
    { rank: 1, name: "Alex Johnson", score: 98, percentile: 99.8, stream: "Computer Science", change: "+2" },
    { rank: 2, name: "Priya Sharma", score: 96, percentile: 99.2, stream: "Engineering", change: "↑" },
    { rank: 3, name: "Rahul Verma", score: 94, percentile: 98.5, stream: "Medical", change: "-1" },
    { rank: 4, name: "Sneha Patel", score: 92, percentile: 97.8, stream: "Commerce", change: "+3" },
    { rank: 5, name: "Karan Singh", score: 90, percentile: 97.0, stream: "Arts", change: "↑" },
    { rank: 6, name: "Ananya Das", score: 88, percentile: 96.2, stream: "Law", change: "-2" },
    { rank: 7, name: "Vikram Roy", score: 86, percentile: 95.4, stream: "Computer Science", change: "↑" },
    { rank: 8, name: "Neha Gupta", score: 84, percentile: 94.6, stream: "Engineering", change: "↓" },
];

const rankingStats = [
    { value: "100%", label: "Transparent Scoring", icon: Shield, color: "#5A7ACD" },
    { value: "No Bias", label: "Performance Only", icon: Target, color: "#FEB05D" },
    { value: "Real-Time", label: "Live Updates", icon: TrendingUp, color: "#10B981" },
    { value: "Stream-Wise", label: "Fair Comparison", icon: Users, color: "#8B5CF6" },
];

export default function Rankings() {
    const [hoveredRow, setHoveredRow] = useState<number | null>(null);
    const [hoveredButton, setHoveredButton] = useState<string | null>(null);

    const getRankBadge = (rank: number) => {
        if (rank === 1) return <Crown className="h-5 w-5 text-yellow-500" />;
        if (rank === 2) return <Medal className="h-5 w-5 text-gray-400" />;
        if (rank === 3) return <Medal className="h-5 w-5 text-amber-700" />;
        return <span className="text-sm font-bold text-[#16476A]">{rank}</span>;
    };

    return (
        <section
            id="rankings"
            className="relative overflow-hidden py-32"
            style={{ backgroundColor: "#F5F2F2" }}
        >
            {/* Background elements */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                {/* Gradient orbs */}
                <motion.div
                    animate={{
                        x: [0, 40, 0],
                        y: [0, -20, 0],
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/3 left-10 w-96 h-96 rounded-full opacity-5 blur-3xl"
                    style={{ backgroundColor: "#FEB05D" }}
                />
                <motion.div
                    animate={{
                        x: [0, -30, 0],
                        y: [0, 30, 0],
                    }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear", delay: 2 }}
                    className="absolute bottom-1/3 right-10 w-80 h-80 rounded-full opacity-5 blur-3xl"
                    style={{ backgroundColor: "#5A7ACD" }}
                />

                {/* Grid pattern */}
                <div className="absolute inset-0 opacity-3">
                    <div className="h-full w-full"
                        style={{
                            backgroundImage: `linear-gradient(90deg, #16476A22 1px, transparent 1px),
                                linear-gradient(180deg, #16476A22 1px, transparent 1px)`,
                            backgroundSize: '40px 40px',
                        }}
                    />
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-6">
                <div className="grid items-center gap-20 lg:grid-cols-2">
                    {/* LEFT VISUAL - Interactive Leaderboard */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.7 }}
                        className="relative"
                    >
                        {/* Main leaderboard card */}
                        <motion.div
                            whileHover={{ y: -5 }}
                            transition={{ duration: 0.3 }}
                            className="relative rounded-2xl border bg-white/80 p-6 shadow-2xl backdrop-blur-sm"
                            style={{
                                borderColor: "#5A7ACD30",
                                boxShadow: "0 25px 70px rgba(90, 122, 205, 0.15)"
                            }}
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-3">
                                    <div className="rounded-lg p-2" style={{ backgroundColor: "#5A7ACD15" }}>
                                        <Trophy className="h-6 w-6" style={{ color: "#5A7ACD" }} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold" style={{ color: "#16476A" }}>
                                            Official Leaderboard
                                        </h4>
                                        <p className="text-sm" style={{ color: "#16476A", opacity: 0.7 }}>
                                            Computer Science • Updated Today
                                        </p>
                                    </div>
                                </div>
                                <div className="rounded-full px-3 py-1 text-xs font-semibold"
                                    style={{
                                        backgroundColor: "#10B98120",
                                        color: "#10B981"
                                    }}
                                >
                                    LIVE
                                </div>
                            </div>

                            {/* Leaderboard table */}
                            <div className="space-y-2">
                                {leaderboardData.map((item, index) => (
                                    <motion.div
                                        key={item.rank}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.05 }}
                                        onHoverStart={() => setHoveredRow(index)}
                                        onHoverEnd={() => setHoveredRow(null)}
                                        whileHover={{ x: 5 }}
                                        className={`flex items-center justify-between rounded-xl p-4 transition-all cursor-pointer ${hoveredRow === index ? "bg-white shadow-md" : "bg-[#16476A05]"
                                            }`}
                                    >
                                        {/* Rank and user info */}
                                        <div className="flex items-center gap-4 flex-1">
                                            <div className="relative">
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${item.rank === 1 ? "bg-yellow-500/20" :
                                                        item.rank === 2 ? "bg-gray-400/20" :
                                                            item.rank === 3 ? "bg-amber-700/20" : "bg-[#16476A10]"
                                                    }`}>
                                                    {getRankBadge(item.rank)}
                                                </div>
                                                {item.rank <= 3 && (
                                                    <motion.div
                                                        className="absolute -top-1 -right-1"
                                                        animate={{ scale: [1, 1.2, 1] }}
                                                        transition={{ duration: 2, repeat: Infinity }}
                                                    >
                                                        <Sparkles className="h-3 w-3"
                                                            style={{
                                                                color: item.rank === 1 ? "#FBBF24" :
                                                                    item.rank === 2 ? "#9CA3AF" : "#B45309"
                                                            }}
                                                        />
                                                    </motion.div>
                                                )}
                                            </div>

                                            <div className="flex-1">
                                                <div className="flex items-center gap-2">
                                                    <h5 className="font-medium" style={{ color: "#16476A" }}>
                                                        {item.name}
                                                    </h5>
                                                    <span className={`text-xs px-2 py-0.5 rounded-full ${item.change.startsWith('+') ? "bg-green-100 text-green-800" :
                                                            item.change.startsWith('-') ? "bg-red-100 text-red-800" :
                                                                "bg-blue-100 text-blue-800"
                                                        }`}>
                                                        {item.change}
                                                    </span>
                                                </div>
                                                <p className="text-xs" style={{ color: "#16476A", opacity: 0.6 }}>
                                                    {item.stream}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Score and percentile */}
                                        <div className="text-right">
                                            <div className="flex items-center gap-4">
                                                <div className="text-right">
                                                    <div className="text-lg font-bold" style={{ color: "#16476A" }}>
                                                        {item.score}
                                                        <span className="text-sm font-normal" style={{ opacity: 0.7 }}>/100</span>
                                                    </div>
                                                    <div className="text-xs" style={{ color: "#16476A", opacity: 0.6 }}>
                                                        Score
                                                    </div>
                                                </div>
                                                <div className="w-16">
                                                    <div className="h-2 rounded-full overflow-hidden bg-[#16476A10]">
                                                        <motion.div
                                                            initial={{ width: 0 }}
                                                            whileInView={{ width: `${item.score}%` }}
                                                            viewport={{ once: true }}
                                                            transition={{ delay: 0.5 + index * 0.1, duration: 1 }}
                                                            className="h-full rounded-full"
                                                            style={{
                                                                background: `linear-gradient(90deg, #5A7ACD, #7E9CFF)`,
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="text-xs mt-1" style={{ color: "#16476A", opacity: 0.7 }}>
                                                        {item.percentile}%
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Footer note */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 1 }}
                                className="mt-6 rounded-xl p-4 text-center"
                                style={{ backgroundColor: "#5A7ACD1A" }}
                            >
                                <p className="text-sm font-medium" style={{ color: "#16476A" }}>
                                    Rankings update every 24 hours
                                </p>
                                <p className="text-xs mt-1" style={{ color: "#16476A", opacity: 0.7 }}>
                                    Based on latest platform mock test results
                                </p>
                            </motion.div>
                        </motion.div>

                        {/* Stats cards below leaderboard */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 }}
                            className="mt-8 grid grid-cols-2 gap-4"
                        >
                            {rankingStats.map((stat, index) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.6 + index * 0.1 }}
                                    whileHover={{ y: -5 }}
                                    className="rounded-xl p-4 text-center bg-white/70 backdrop-blur"
                                >
                                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-full mb-2"
                                        style={{ backgroundColor: `${stat.color}15` }}
                                    >
                                        <stat.icon className="h-5 w-5" style={{ color: stat.color }} />
                                    </div>
                                    <div className="text-lg font-bold" style={{ color: "#16476A" }}>
                                        {stat.value}
                                    </div>
                                    <div className="text-xs mt-1" style={{ color: "#16476A", opacity: 0.7 }}>
                                        {stat.label}
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* RIGHT CONTENT */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.7, delay: 0.2 }}
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
                            <Award className="h-4 w-4" />
                            <span className="text-sm font-semibold">Skill Validation</span>
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
                                Rankings That
                                <br />
                                <motion.span
                                    initial={{ backgroundSize: "0% 100%" }}
                                    whileInView={{ backgroundSize: "100% 100%" }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.5, duration: 1 }}
                                    className="relative bg-gradient-to-r from-[#5A7ACD] to-[#FEB05D] bg-clip-text text-transparent"
                                >
                                    Actually Mean Something
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
                            KNOW rankings are{" "}
                            <span className="font-semibold" style={{ color: "#5A7ACD" }}>
                                not based on course completion or certificates
                            </span>
                            . They are generated solely from performance in official, time-bound platform mock tests.
                        </motion.p>

                        {/* Features list */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 }}
                            className="mt-8 space-y-4"
                        >
                            {[
                                "Stream-wise & category-wise leaderboards",
                                "Transparent percentile calculation",
                                "No external or manual score manipulation",
                                "True comparison with real competitors",
                                "Real-time ranking updates",
                                "Skill validation over certificates"
                            ].map((feature, index) => (
                                <motion.div
                                    key={feature}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.6 + index * 0.1 }}
                                    className="flex items-center gap-3"
                                >
                                    <motion.div
                                        whileHover={{ scale: 1.2 }}
                                        transition={{ duration: 0.2 }}
                                        className="rounded-full p-1"
                                        style={{ backgroundColor: "#5A7ACD15" }}
                                    >
                                        <Star className="h-3 w-3" style={{ color: "#5A7ACD" }} />
                                    </motion.div>
                                    <span style={{ color: "#16476A", opacity: 0.9 }}>
                                        {feature}
                                    </span>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* User stats preview */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.9 }}
                            className="mt-10 rounded-xl p-6"
                            style={{
                                backgroundColor: "#16476A",
                                backgroundImage: "linear-gradient(135deg, #16476A 0%, #1E5A8C 100%)"
                            }}
                        >
                            <div className="grid grid-cols-3 gap-6">
                                {[
                                    { value: "124", label: "Your Rank", icon: Trophy },
                                    { value: "78", label: "Your Score", icon: Target },
                                    { value: "96.3%", label: "Percentile", icon: TrendingUp },
                                ].map((stat, index) => (
                                    <motion.div
                                        key={stat.label}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 1 + index * 0.1 }}
                                        whileHover={{ scale: 1.05 }}
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
                            <p className="text-xs text-center mt-4" style={{ color: "#F5F2F2", opacity: 0.8 }}>
                                Based on your latest platform mock test
                            </p>
                        </motion.div>

                        {/* CTA Buttons */}
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
                                        View Full Leaderboard
                                        <motion.span
                                            animate={{ x: hoveredButton === "primary" ? 5 : 0 }}
                                            transition={{ duration: 0.2 }}
                                            className="ml-2"
                                        >
                                            <BarChart3 className="h-5 w-5" />
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
                                        Take Mock Test
                                        <motion.div
                                            animate={{ rotate: hoveredButton === "secondary" ? 90 : 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="ml-2"
                                        >
                                            <Zap className="h-4 w-4" />
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
                </div>
            </div>
        </section>
    );
}