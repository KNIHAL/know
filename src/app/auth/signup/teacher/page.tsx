ji"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
    User, Mail, Phone, BookOpen, Award, Briefcase,
    Lock, Sparkles, Zap, Check, Globe, Cpu, Database,
    Calculator, Atom, Palette, Shield, Target,
    GraduationCap, Clock, MapPin, ChevronRight, ArrowRight, FlaskConical
} from "lucide-react";
import { useRouter } from "next/navigation";



export default function TeacherSignupPage() {
    const router = useRouter();
    const [expertise, setExpertise] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        qualification: "",
        experience: "",
        bio: "",
        password: ""
    });

    const expertiseOptions = [
        { id: "math", label: "Mathematics", icon: Calculator, color: "#EF4444" },
        { id: "physics", label: "Physics", icon: Atom, color: "#3B82F6" },
        { id: "chemistry", label: "Chemistry", icon: FlaskConical, color: "#10B981" },
        { id: "biology", label: "Biology", icon: BookOpen, color: "#8B5CF6" },
        { id: "web-dev", label: "Web Development", icon: Globe, color: "#F59E0B" },
        { id: "ai-ml", label: "AI / Machine Learning", icon: Cpu, color: "#EC4899" },
        { id: "data-science", label: "Data Science", icon: Database, color: "#06B6D4" },
        { id: "design", label: "UI/UX Design", icon: Palette, color: "#8B5CF6" },
        { id: "gov-exams", label: "Government Exams", icon: Shield, color: "#6366F1" },
        { id: "programming", label: "Programming", icon: Cpu, color: "#3B82F6" },
        { id: "commerce", label: "Commerce & Finance", icon: Briefcase, color: "#10B981" },
        { id: "language", label: "Languages", icon: BookOpen, color: "#F59E0B" },
    ];

    const experienceOptions = [
        { value: "0-1", label: "0-1 years", desc: "Starting out" },
        { value: "2-3", label: "2-3 years", desc: "Intermediate" },
        { value: "4-6", label: "4-6 years", desc: "Experienced" },
        { value: "7-10", label: "7-10 years", desc: "Senior" },
        { value: "10+", label: "10+ years", desc: "Expert" },
    ];

    const qualificationOptions = [
        "B.Tech/B.E.",
        "M.Tech/M.E.",
        "B.Sc",
        "M.Sc",
        "Ph.D",
        "B.Ed",
        "M.Ed",
        "B.Com",
        "M.Com",
        "MBA",
        "CA",
        "Other"
    ];

    const toggleExpertise = (skillId: string) => {
        setExpertise((prev) =>
            prev.includes(skillId)
                ? prev.filter((s) => s !== skillId)
                : [...prev, skillId]
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                    name: formData.fullName,
                    role: "teacher",
                }),
            });

            if (!res.ok) throw new Error("Signup failed");

            router.push("/auth/login");
        } catch (err) {
            alert("Signup failed. Email may already exist.");
        } finally {
            setIsSubmitting(false);
        }
    };



    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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
                    style={{ backgroundColor: "#FEB05D" }}
                />

                <motion.div
                    animate={{
                        x: [0, -100, 0],
                        y: [0, -50, 0],
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear", delay: 2 }}
                    className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl"
                    style={{ backgroundColor: "#5A7ACD" }}
                />

                {/* Grid pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div
                        className="h-full w-full"
                        style={{
                            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(254, 176, 93, 0.1) 1px, transparent 0)`,
                            backgroundSize: '50px 50px',
                        }}
                    />
                </div>

                {/* Floating particles */}
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 rounded-full"
                        style={{ backgroundColor: "#FEB05D" }}
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
                                "0 0 40px rgba(254, 176, 93, 0.2)",
                                "0 0 60px rgba(254, 176, 93, 0.3)",
                                "0 0 40px rgba(254, 176, 93, 0.2)"
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
                                        background: "linear-gradient(135deg, #FEB05D, #FFC97E)",
                                        boxShadow: "0 10px 30px rgba(254, 176, 93, 0.3)"
                                    }}
                                >
                                    <GraduationCap className="h-8 w-8 text-white" />
                                </motion.div>
                            </div>

                            <h1 className="text-3xl font-bold text-white mb-2">
                                Teacher <span className="text-[#FEB05D]">Registration</span>
                            </h1>
                            <p className="text-gray-400 text-sm">
                                Join KNOW to create content, teach, and earn through transparent commission
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
                                    <User className="h-5 w-5 text-[#FEB05D]" />
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
                                                <User className="h-5 w-5 text-gray-400 group-focus-within:text-[#FEB05D]" />
                                            </div>
                                            <input
                                                type="text"
                                                name="fullName"
                                                value={formData.fullName}
                                                onChange={handleChange}
                                                placeholder="Dr. John Doe"
                                                className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-[#FEB05D] focus:ring-2 focus:ring-[#FEB05D]/30 transition-all duration-300"
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
                                                <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-[#FEB05D]" />
                                            </div>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="teacher@example.com"
                                                className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-[#FEB05D] focus:ring-2 focus:ring-[#FEB05D]/30 transition-all duration-300"
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
                                                <Phone className="h-5 w-5 text-gray-400 group-focus-within:text-[#FEB05D]" />
                                            </div>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                placeholder="+91 9876543210"
                                                className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-[#FEB05D] focus:ring-2 focus:ring-[#FEB05D]/30 transition-all duration-300"
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
                                                <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-[#FEB05D]" />
                                            </div>
                                            <input
                                                type="password"
                                                name="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                placeholder="••••••••"
                                                className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-[#FEB05D] focus:ring-2 focus:ring-[#FEB05D]/30 transition-all duration-300"
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

                            {/* Professional Information */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="space-y-6"
                            >
                                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                    <Award className="h-5 w-5 text-[#FEB05D]" />
                                    Professional Information
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Highest Qualification */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Highest Qualification *
                                        </label>
                                        <div className="relative">
                                            <select
                                                name="qualification"
                                                value={formData.qualification}
                                                onChange={handleChange}
                                                className="w-full px-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#FEB05D] focus:ring-2 focus:ring-[#FEB05D]/30 transition-all duration-300 appearance-none"
                                                required
                                            >
                                                <option value="" className="bg-gray-900">Select qualification</option>
                                                {qualificationOptions.map((qual) => (
                                                    <option key={qual} value={qual} className="bg-gray-900">
                                                        {qual}
                                                    </option>
                                                ))}
                                            </select>
                                            <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 rotate-90 pointer-events-none" />
                                        </div>
                                    </div>

                                    {/* Teaching Experience */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Teaching Experience *
                                        </label>
                                        <div className="grid grid-cols-5 gap-2">
                                            {experienceOptions.map((exp) => (
                                                <motion.button
                                                    key={exp.value}
                                                    type="button"
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={() => setFormData({ ...formData, experience: exp.value })}
                                                    className={`p-3 rounded-lg border-2 flex flex-col items-center justify-center transition-all ${formData.experience === exp.value
                                                        ? "border-[#FEB05D] bg-[#FEB05D]/10"
                                                        : "border-white/10 bg-white/5 hover:border-white/20"
                                                        }`}
                                                >
                                                    <span className="text-sm font-medium text-white">
                                                        {exp.label}
                                                    </span>
                                                    <span className="text-xs text-gray-400 mt-1">
                                                        {exp.desc}
                                                    </span>
                                                </motion.button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Expertise Section */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="space-y-4"
                            >
                                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                    <Zap className="h-5 w-5 text-[#FEB05D]" />
                                    Teaching Expertise *
                                </h3>
                                <p className="text-sm text-gray-400">
                                    Select subjects you can teach. This helps students find your content.
                                </p>

                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                                    {expertiseOptions.map((skill) => {
                                        const isSelected = expertise.includes(skill.id);
                                        const Icon = skill.icon;
                                        return (
                                            <motion.button
                                                key={skill.id}
                                                type="button"
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => toggleExpertise(skill.id)}
                                                className={`p-4 rounded-xl border-2 flex flex-col items-center justify-center gap-3 transition-all ${isSelected
                                                    ? "border-[#FEB05D] bg-[#FEB05D]/10"
                                                    : "border-white/10 bg-white/5 hover:border-white/20"
                                                    }`}
                                            >
                                                <div className={`p-3 rounded-lg ${isSelected ? "bg-[#FEB05D]/20" : "bg-white/5"}`}>
                                                    <Icon className="h-6 w-6" style={{
                                                        color: isSelected ? "#FEB05D" : skill.color
                                                    }} />
                                                </div>
                                                <span className="text-sm font-medium text-white text-center">
                                                    {skill.label}
                                                </span>
                                                {isSelected && (
                                                    <motion.div
                                                        initial={{ scale: 0 }}
                                                        animate={{ scale: 1 }}
                                                        className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#FEB05D] flex items-center justify-center"
                                                    >
                                                        <Check className="h-3 w-3 text-white" />
                                                    </motion.div>
                                                )}
                                            </motion.button>
                                        );
                                    })}
                                </div>
                            </motion.div>

                            {/* Additional Information */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                className="space-y-6"
                            >
                                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                    <Briefcase className="h-5 w-5 text-[#FEB05D]" />
                                    Additional Information
                                </h3>

                                {/* Current Organization */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="group">
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Current Organization (Optional)
                                        </label>
                                        <div className="relative">
                                            <div className="absolute left-4 top-1/2 -translate-y-1/2">
                                                <Briefcase className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                type="text"
                                                placeholder="University/Company name"
                                                className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-[#FEB05D] focus:ring-2 focus:ring-[#FEB05D]/30 transition-all duration-300"
                                            />
                                        </div>
                                    </div>

                                    {/* Location */}
                                    <div className="group">
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Location (Optional)
                                        </label>
                                        <div className="relative">
                                            <div className="absolute left-4 top-1/2 -translate-y-1/2">
                                                <MapPin className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                type="text"
                                                placeholder="City, Country"
                                                className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-[#FEB05D] focus:ring-2 focus:ring-[#FEB05D]/30 transition-all duration-300"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Bio */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Short Bio (Optional)
                                    </label>
                                    <textarea
                                        name="bio"
                                        value={formData.bio}
                                        onChange={handleChange}
                                        rows={4}
                                        placeholder="Tell students about your teaching philosophy, experience, and what makes your content special..."
                                        className="w-full px-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-[#FEB05D] focus:ring-2 focus:ring-[#FEB05D]/30 transition-all duration-300 resize-none"
                                    />
                                    <p className="mt-1 text-xs text-gray-400">
                                        This will be displayed on your teacher profile
                                    </p>
                                </div>
                            </motion.div>



                            {/* Terms & Submit */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8 }}
                                className="space-y-6 pt-4"
                            >
                                <div className="flex items-start gap-3">
                                    <input
                                        type="checkbox"
                                        id="terms"
                                        className="w-5 h-5 rounded bg-white/10 border-white/20 text-[#FEB05D] focus:ring-[#FEB05D] focus:ring-offset-0 mt-1"
                                        required
                                    />
                                    <label htmlFor="terms" className="text-sm text-gray-300">
                                        I agree to the{" "}
                                        <a href="#" className="text-[#FEB05D] hover:underline">
                                            Terms & Conditions
                                        </a>{" "}
                                        and{" "}
                                        <a href="#" className="text-[#FEB05D] hover:underline">
                                            Privacy Policy
                                        </a>
                                        . I understand KNOW charges a commission and I'll need to add bank details before publishing paid content.
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
                                            background: "linear-gradient(135deg, #FEB05D, #FFC97E)",
                                            boxShadow: "0 10px 30px rgba(254, 176, 93, 0.3)"
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
                                                    Creating Teacher Account...
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-2">
                                                    <Sparkles className="h-5 w-5" />
                                                    Complete Teacher Registration
                                                </div>
                                            )}
                                        </span>

                                        {/* Hover effect */}
                                        <motion.div
                                            className="absolute inset-0"
                                            style={{ background: "linear-gradient(135deg, #D97706, #FEB05D)" }}
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
                                        style={{ backgroundColor: "#FEB05D" }}
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
                                        className="text-[#FEB05D] hover:text-[#FFC97E] font-medium transition-colors"
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