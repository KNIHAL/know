"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock, LogIn, Sparkles, Zap, ArrowRight } from "lucide-react";
import { getSession, useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function LoginPage() {
    const router = useRouter();
    const { data: session, status } = useSession();

    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [hoveredButton, setHoveredButton] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        const res = await signIn("credentials", {
            email: formData.email,
            password: formData.password,
            redirect: false,
        });

        setIsLoading(false);

        if (res?.error) {
            setError("Invalid email or password");
        }

        const session = await getSession();

        if (session?.user?.role === "student") {
            router.replace("/student/dashboard");
        } else if (session?.user?.role === "admin") {
            router.replace("/admin");
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <main className="relative min-h-screen flex items-center justify-center overflow-hidden">
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
                {[...Array(25)].map((_, i) => (
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

            {/* Login Card */}
            <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                    duration: 0.7,
                    type: "spring",
                    stiffness: 100,
                    damping: 15
                }}
                className="relative z-10 w-full max-w-md mx-4"
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
                        {/* Header with logo */}
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-center mb-8"
                        >

                            <h1 className="text-2xl font-bold text-white mb-2">
                                Welcome Back to{" "}
                                <span
                                    className="bg-gradient-to-r from-[#5A7ACD] to-[#FEB05D] bg-clip-text text-transparent"
                                >
                                    KNOW
                                </span>
                            </h1>
                            <p className="text-gray-400 text-sm">
                                Continue your skill validation journey
                            </p>
                        </motion.div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Email Input */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Email Address
                                </label>
                                <div className="relative group">
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
                            </motion.div>

                            {/* Password Input */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                <div className="flex justify-between items-center mb-2">
                                    <label className="block text-sm font-medium text-gray-300">
                                        Password
                                    </label>
                                    <Link
                                        href="/forgot-password"
                                        className="text-sm text-[#5A7ACD] hover:text-[#7E9CFF] transition-colors"
                                    >
                                        Forgot password?
                                    </Link>
                                </div>
                                <div className="relative group">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2">
                                        <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-[#5A7ACD]" />
                                    </div>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        className="w-full pl-12 pr-12 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-[#5A7ACD] focus:ring-2 focus:ring-[#5A7ACD]/30 transition-all duration-300"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </motion.div>


                            {/* Login Button */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                className="pt-4"
                            >
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onHoverStart={() => setHoveredButton("login")}
                                    onHoverEnd={() => setHoveredButton(null)}
                                    type="submit"
                                    disabled={isLoading}
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
                                            {isLoading ? (
                                                <div className="flex items-center gap-2">
                                                    <motion.div
                                                        animate={{ rotate: 360 }}
                                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                                                    />
                                                    Logging in...
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-2">
                                                    <LogIn className="h-5 w-5" />
                                                    Login to KNOW
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

                                    </div>

                                    {/* Button glow */}
                                    <motion.div
                                        className="absolute -inset-1 rounded-xl opacity-0 blur-md"
                                        style={{ backgroundColor: "#5A7ACD" }}
                                        animate={{
                                            opacity: hoveredButton === "login" ? 0.4 : 0
                                        }}
                                        transition={{ duration: 0.2 }}
                                    />
                                </motion.button>
                            </motion.div>
                        </form>

                        {/* Divider */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="my-8 flex items-center"
                        >
                            <div className="flex-1 h-px bg-white/10" />
                            <span className="px-4 text-sm text-gray-400">New to KNOW?</span>
                            <div className="flex-1 h-px bg-white/10" />
                        </motion.div>

                        {/* Signup Button */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.9 }}
                        >
                            <Link href="/auth/signup/student">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onHoverStart={() => setHoveredButton("signup")}
                                    onHoverEnd={() => setHoveredButton(null)}
                                    className="w-full relative overflow-hidden group"
                                >
                                    {/* Main button */}
                                    <div className="relative px-8 py-4 rounded-xl font-semibold border-2 flex items-center justify-center gap-3"
                                        style={{
                                            borderColor: "#5A7ACD",
                                            color: "#5A7ACD",
                                            backgroundColor: "transparent",
                                        }}
                                    >
                                        <span className="relative z-10 flex items-center gap-2">
                                            <Sparkles className="h-5 w-5" />
                                            Create an Account
                                        </span>

                                        {/* Hover background */}
                                        <motion.div
                                            className="absolute inset-0"
                                            style={{ backgroundColor: "#5A7ACD15" }}
                                            initial={{ x: "-100%" }}
                                            whileHover={{ x: 0 }}
                                            transition={{ duration: 0.3 }}
                                        />

                                        {/* Zap animation */}
                                        <motion.div
                                            className="relative z-10"
                                            animate={{
                                                scale: hoveredButton === "signup" ? [1, 1.2, 1] : 1,
                                                rotate: hoveredButton === "signup" ? [0, 10, 0] : 0
                                            }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            <Zap className="h-5 w-5" />
                                        </motion.div>
                                    </div>
                                </motion.button>
                            </Link>
                        </motion.div>

                    </div>
                </div>

                {/* Bottom note */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="mt-6 text-center text-sm text-gray-400"
                >
                    <p>By continuing, you agree to our Terms & Privacy Policy</p>
                </motion.div>
            </motion.div>

            {/* Decorative floating elements */}
            <motion.div
                animate={{
                    rotate: [0, 360],
                }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="fixed -bottom-48 -left-48 w-96 h-96 rounded-full opacity-5 blur-3xl pointer-events-none"
                style={{ backgroundColor: "#5A7ACD" }}
            />
            <motion.div
                animate={{
                    rotate: [360, 0],
                }}
                transition={{
                    duration: 40,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="fixed -top-48 -right-48 w-96 h-96 rounded-full opacity-5 blur-3xl pointer-events-none"
                style={{ backgroundColor: "#FEB05D" }}
            />
        </main>
    );
}