"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
    User, Mail, Phone, BookOpen, Target, Lock,
    GraduationCap, ChevronRight, Sparkles, Zap,
    Check, X, Globe, Cpu, Database, Palette,
    Smartphone, Shield, ArrowRight
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function StudentSignupPage() {
    const router = useRouter();
    const [level, setLevel] = useState("");
    const [skills, setSkills] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        targetExam: "",
        password: ""
    });

    const skillOptions = [
        { id: "web-dev", label: "Web Development", icon: Globe },
        { id: "ai-ml", label: "AI / ML", icon: Cpu },
        { id: "data-science", label: "Data Science", icon: Database },
        { id: "design", label: "UI/UX Design", icon: Palette },
        { id: "app-dev", label: "App Development", icon: Smartphone },
        { id: "cyber", label: "Cyber Security", icon: Shield },
    ];

    const educationLevels = [
        { value: "10", label: "Class 10", icon: "🎓" },
        { value: "12", label: "Class 12", icon: "📚" },
        { value: "graduation", label: "Graduation", icon: "🎓" },
        { value: "postgrad", label: "Post Graduation", icon: "👨‍🎓" },
        { value: "working", label: "Working Professional", icon: "💼" },
        { value: "other", label: "Other", icon: "✨" },
    ];

    const streamOptions = [
        "Science (PCM)",
        "Science (PCB)",
        "Commerce",
        "Arts/Humanities",
        "Computer Science",
        "Other"
    ];

    const degreeOptions = [
        "B.Tech/B.E.",
        "B.Sc",
        "B.Com",
        "B.A.",
        "BBA",
        "BCA",
        "Other"
    ];

    const yearOptions = [
        "1st Year",
        "2nd Year",
        "3rd Year",
        "4th Year",
        "Final Year"
    ];

    const toggleSkill = (skillId: string) => {
        setSkills((prev) =>
            prev.includes(skillId)
                ? prev.filter((s) => s !== skillId)
                : [...prev, skillId]
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            router.push("/student/dashboard"); // Redirect to student dashboard
        }, 2000);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <main className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0 -z-10">
                {/* Main gradient */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: "linear-gradient(135deg, #0f0f1a 0%, #12122a 50%, #0a0a14 100%)",
                    }}
                />

                {/* Animated orbs */}
                <motion.div
                    animate={{
                        x: [0, 100, 0],
                        y: [0, 50, 0],
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl"
                    style={{ backgroundColor: "#5A7ACD" }}
                />

                <motion.div
                    animate={{
                        x: [0, -100, 0],
                        y: [0, -50, 0],
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear", delay: 2 }}
                    className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl"
                    style={{ backgroundColor: "#FEB05D" }}
                />

                {/* Grid pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div
                        className="h-full w-full"
                        style={{
                            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(90, 122, 205, 0.1) 1px, transparent 0)`,
                            backgroundSize: '50px 50px',
                        }}
                    />
                </div>

                {/* Floating particles */}
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 rounded-full"
                        style={{ backgroundColor: "#5A7ACD" }}
                        initial={{
                            x: Math.random() * 100 + "vw",
                            y: Math.random() * 100 + "vh",
                            opacity: 0.1,
                        }}
                        animate={{
                            y: [null, `-${Math.random() * 50 + 20}px`],
                            opacity: [0.1, 0.3, 0.1],
                        }}
                        transition={{
                            duration: Math.random() * 3 + 2,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                        }}
                    />
                ))}
            </div>

            {/* Main form card */}
            <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                    duration: 0.7,
                    type: "spring",
                    stiffness: 100,
                    damping: 15
                }}
                className="w-full max-w-2xl"
            >
                {/* Card with glass effect */}
                <div className="relative rounded-3xl overflow-hidden">
                    {/* Card background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-xl border border-white/10" />

                    {/* Animated border glow */}
                    <motion.div
                        animate={{
                            boxShadow: [
                                "0 0 40px rgba(90, 122, 205, 0.2)",
                                "0 0 60px rgba(90, 122, 205, 0.3)",
                                "0 0 40px rgba(90, 122, 205, 0.2)"
                            ]
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="absolute -inset-1 rounded-3xl pointer-events-none"
                    />

                    <div className="relative p-8">
                        {/* Header with progress indicator */}
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-center mb-8"
                        >
                            <div className="inline-block mb-4">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.3, type: "spring" }}
                                    className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center mb-4"
                                    style={{
                                        background: "linear-gradient(135deg, #5A7ACD, #7E9CFF)",
                                        boxShadow: "0 10px 30px rgba(90, 122, 205, 0.3)"
                                    }}
                                >
                                    <GraduationCap className="h-8 w-8 text-white" />
                                </motion.div>
                            </div>

                            <h1 className="text-3xl font-bold text-white mb-2">
                                Student <span className="text-[#5A7ACD]">Registration</span>
                            </h1>
                            <p className="text-gray-400 text-sm">
                                Complete your profile to start your skill validation journey
                            </p>


                        </motion.div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Basic Info Section */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="space-y-6"
                            >
                                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                    <User className="h-5 w-5 text-[#5A7ACD]" />
                                    Basic Information
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Full Name */}
                                    <div className="group">
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Full Name *
                                        </label>
                                        <div className="relative">
                                            <div className="absolute left-4 top-1/2 -translate-y-1/2">
                                                <User className="h-5 w-5 text-gray-400 group-focus-within:text-[#5A7ACD]" />
                                            </div>
                                            <input
                                                type="text"
                                                name="fullName"
                                                value={formData.fullName}
                                                onChange={handleChange}
                                                placeholder="John Doe"
                                                className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-[#5A7ACD] focus:ring-2 focus:ring-[#5A7ACD]/30 transition-all duration-300"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div className="group">
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Email Address *
                                        </label>
                                        <div className="relative">
                                            <div className="absolute left-4 top-1/2 -translate-y-1/2">
                                                <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-[#5A7ACD]" />
                                            </div>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="student@example.com"
                                                className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-[#5A7ACD] focus:ring-2 focus:ring-[#5A7ACD]/30 transition-all duration-300"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Phone Number */}
                                    <div className="group">
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Phone Number *
                                        </label>
                                        <div className="relative">
                                            <div className="absolute left-4 top-1/2 -translate-y-1/2">
                                                <Phone className="h-5 w-5 text-gray-400 group-focus-within:text-[#5A7ACD]" />
                                            </div>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                placeholder="+91 9876543210"
                                                className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-[#5A7ACD] focus:ring-2 focus:ring-[#5A7ACD]/30 transition-all duration-300"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Password */}
                                    <div className="group">
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Password *
                                        </label>
                                        <div className="relative">
                                            <div className="absolute left-4 top-1/2 -translate-y-1/2">
                                                <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-[#5A7ACD]" />
                                            </div>
                                            <input
                                                type="password"
                                                name="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                placeholder="••••••••"
                                                className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-[#5A7ACD] focus:ring-2 focus:ring-[#5A7ACD]/30 transition-all duration-300"
                                                required
                                                minLength={8}
                                            />
                                        </div>
                                        <p className="mt-1 text-xs text-gray-400">
                                            Minimum 8 characters with letters and numbers
                                        </p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Education Level Section */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="space-y-4"
                            >
                                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                    <BookOpen className="h-5 w-5 text-[#5A7ACD]" />
                                    Education Level *
                                </h3>

                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {educationLevels.map((edu) => (
                                        <motion.button
                                            key={edu.value}
                                            type="button"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => setLevel(edu.value)}
                                            className={`p-4 rounded-xl border-2 flex flex-col items-center justify-center gap-2 transition-all ${level === edu.value
                                                ? "border-[#5A7ACD] bg-[#5A7ACD]/10"
                                                : "border-white/10 bg-white/5 hover:border-white/20"
                                                }`}
                                        >
                                            <span className="text-2xl">{edu.icon}</span>
                                            <span className="text-sm font-medium text-white">
                                                {edu.label}
                                            </span>
                                        </motion.button>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Conditional Fields */}
                            <AnimatePresence mode="wait">
                                {level === "12" && (
                                    <motion.div
                                        key="class12"
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="space-y-4"
                                    >
                                        <h4 className="text-md font-semibold text-white">
                                            Class 12 Details
                                        </h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                                    Stream *
                                                </label>
                                                <div className="relative">
                                                    <select
                                                        className="w-full px-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#5A7ACD] focus:ring-2 focus:ring-[#5A7ACD]/30 transition-all duration-300 appearance-none"
                                                        required
                                                    >
                                                        <option value="" className="bg-gray-900">Select your stream</option>
                                                        {streamOptions.map((stream) => (
                                                            <option key={stream} value={stream} className="bg-gray-900">
                                                                {stream}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 rotate-90 pointer-events-none" />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                                    School/College
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="School/College name"
                                                    className="w-full px-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-[#5A7ACD] focus:ring-2 focus:ring-[#5A7ACD]/30 transition-all duration-300"
                                                />
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {level === "graduation" && (
                                    <motion.div
                                        key="graduation"
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="space-y-4"
                                    >
                                        <h4 className="text-md font-semibold text-white">
                                            Graduation Details
                                        </h4>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                                    Degree *
                                                </label>
                                                <div className="relative">
                                                    <select
                                                        className="w-full px-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#5A7ACD] focus:ring-2 focus:ring-[#5A7ACD]/30 transition-all duration-300 appearance-none"
                                                        required
                                                    >
                                                        <option value="" className="bg-gray-900">Select degree</option>
                                                        {degreeOptions.map((degree) => (
                                                            <option key={degree} value={degree} className="bg-gray-900">
                                                                {degree}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 rotate-90 pointer-events-none" />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                                    Year *
                                                </label>
                                                <div className="relative">
                                                    <select
                                                        className="w-full px-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#5A7ACD] focus:ring-2 focus:ring-[#5A7ACD]/30 transition-all duration-300 appearance-none"
                                                        required
                                                    >
                                                        <option value="" className="bg-gray-900">Select year</option>
                                                        {yearOptions.map((year) => (
                                                            <option key={year} value={year} className="bg-gray-900">
                                                                {year}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 rotate-90 pointer-events-none" />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                                    College/University
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="College name"
                                                    className="w-full px-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-[#5A7ACD] focus:ring-2 focus:ring-[#5A7ACD]/30 transition-all duration-300"
                                                />
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Target Exam */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="space-y-4"
                            >
                                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                    <Target className="h-5 w-5 text-[#5A7ACD]" />
                                    Target Exam (Optional)
                                </h3>
                                <div className="relative">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2">
                                        <Target className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        name="targetExam"
                                        value={formData.targetExam}
                                        onChange={handleChange}
                                        placeholder="JEE, NEET, GATE, UPSC, CAT, etc."
                                        className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-[#5A7ACD] focus:ring-2 focus:ring-[#5A7ACD]/30 transition-all duration-300"
                                    />
                                </div>
                            </motion.div>

                            {/* Skills Section */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                className="space-y-4"
                            >
                                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                    <Zap className="h-5 w-5 text-[#FEB05D]" />
                                    Skills & Interests *
                                </h3>
                                <p className="text-sm text-gray-400">
                                    Select skills you want to learn or improve. This helps us recommend relevant content.
                                </p>

                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {skillOptions.map((skill) => {
                                        const isSelected = skills.includes(skill.id);
                                        const Icon = skill.icon;
                                        return (
                                            <motion.button
                                                key={skill.id}
                                                type="button"
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => toggleSkill(skill.id)}
                                                className={`p-4 rounded-xl border-2 flex items-center justify-between transition-all ${isSelected
                                                    ? "border-[#FEB05D] bg-[#FEB05D]/10"
                                                    : "border-white/10 bg-white/5 hover:border-white/20"
                                                    }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className={`p-2 rounded-lg ${isSelected ? "bg-[#FEB05D]/20" : "bg-white/5"
                                                        }`}>
                                                        <Icon className="h-5 w-5" style={{
                                                            color: isSelected ? "#FEB05D" : "#9CA3AF"
                                                        }} />
                                                    </div>
                                                    <span className="text-sm font-medium text-white">
                                                        {skill.label}
                                                    </span>
                                                </div>
                                                {isSelected && (
                                                    <motion.div
                                                        initial={{ scale: 0 }}
                                                        animate={{ scale: 1 }}
                                                        className="w-6 h-6 rounded-full bg-[#FEB05D] flex items-center justify-center"
                                                    >
                                                        <Check className="h-3 w-3 text-white" />
                                                    </motion.div>
                                                )}
                                            </motion.button>
                                        );
                                    })}
                                </div>
                            </motion.div>

                            {/* Terms & Submit */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7 }}
                                className="space-y-6 pt-4"
                            >
                                <div className="flex items-start gap-3">
                                    <input
                                        type="checkbox"
                                        id="terms"
                                        className="w-5 h-5 rounded bg-white/10 border-white/20 text-[#5A7ACD] focus:ring-[#5A7ACD] focus:ring-offset-0 mt-1"
                                        required
                                    />
                                    <label htmlFor="terms" className="text-sm text-gray-300">
                                        I agree to the{" "}
                                        <a href="#" className="text-[#5A7ACD] hover:underline">
                                            Terms & Conditions
                                        </a>{" "}
                                        and{" "}
                                        <a href="#" className="text-[#5A7ACD] hover:underline">
                                            Privacy Policy
                                        </a>
                                        . I understand that KNOW will personalize my experience based on this information.
                                    </label>
                                </div>

                                {/* Submit Button */}
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full relative overflow-hidden group"
                                >
                                    {/* Main button */}
                                    <div
                                        className="relative px-8 py-4 rounded-xl font-semibold text-white flex items-center justify-center gap-3"
                                        style={{
                                            background: "linear-gradient(135deg, #5A7ACD, #7E9CFF)",
                                            boxShadow: "0 10px 30px rgba(90, 122, 205, 0.3)"
                                        }}
                                    >
                                        <span className="relative z-10">
                                            {isSubmitting ? (
                                                <div className="flex items-center gap-2">
                                                    <motion.div
                                                        animate={{ rotate: 360 }}
                                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                                                    />
                                                    Creating Account...
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-2">
                                                    <Sparkles className="h-5 w-5" />
                                                    Complete Registration
                                                </div>
                                            )}
                                        </span>

                                        {/* Hover effect */}
                                        <motion.div
                                            className="absolute inset-0"
                                            style={{ background: "linear-gradient(135deg, #16476A, #5A7ACD)" }}
                                            initial={{ x: "-100%" }}
                                            whileHover={{ x: 0 }}
                                            transition={{ duration: 0.3 }}
                                        />

                                        {/* Arrow animation */}
                                        {!isSubmitting && (
                                            <motion.div
                                                className="relative z-10"
                                                animate={{ x: [0, 5, 0] }}
                                                transition={{ duration: 1.5, repeat: Infinity }}
                                            >
                                                <ArrowRight className="h-5 w-5" />
                                            </motion.div>
                                        )}
                                    </div>

                                    {/* Button glow */}
                                    <motion.div
                                        className="absolute -inset-1 rounded-xl opacity-0 blur-md"
                                        style={{ backgroundColor: "#5A7ACD" }}
                                        animate={{
                                            opacity: 0.2
                                        }}
                                    />
                                </motion.button>

                                {/* Login link */}
                                <p className="text-center text-sm text-gray-400">
                                    Already have an account?{" "}
                                    <a
                                        href="/auth/login"
                                        className="text-[#5A7ACD] hover:text-[#7E9CFF] font-medium transition-colors"
                                    >
                                        Login here
                                    </a>
                                </p>
                            </motion.div>
                        </form>
                    </div>
                </div>
            </motion.div>
        </main>
    );
}