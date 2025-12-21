"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X, ChevronRight } from "lucide-react";
import Link from "next/link";

const navItems = [
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Mock Tests", href: "#mock-tests" },
    { label: "Rankings", href: "#rankings" },
];


export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [hoveredNav, setHoveredNav] = useState<string | null>(null);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
                duration: 0.5,
                ease: [0.25, 0.1, 0.25, 1], // Smooth cubic bezier
                delay: 0.1
            }}
            className="fixed top-0 z-50 w-full"
        >
            <motion.div
                animate={{
                    backgroundColor: scrolled ? "rgba(255, 255, 255, 0.95)" : "rgba(255, 255, 255, 0)",
                    backdropFilter: scrolled ? "blur(10px)" : "blur(0px)",
                    borderBottom: scrolled ? "1px solid #e5e7eb" : "1px solid transparent",
                    boxShadow: scrolled ? "0 4px 20px rgba(0, 0, 0, 0.08)" : "none",
                }}
                transition={{ duration: 0.3 }}
                className="relative"
            >
                {/* Animated background gradient */}
                <motion.div
                    className="absolute inset-0 -z-10 opacity-0"
                    animate={{ opacity: scrolled ? 0.7 : 0 }}
                    transition={{ duration: 0.4 }}
                    style={{
                        background: "linear-gradient(135deg, #5A7ACD11 0%, #FEB05D11 100%)",
                    }}
                />

                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
                    {/* LOGO with animation */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        className="relative"
                    >
                        <Link href="/" className="group relative block">
                            <motion.span
                                className="text-2xl font-bold tracking-tighter"
                                style={{ color: "#16476A" }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                                ƙׁׅ֑ꪀׁׅᨵׁׅᨰׁׅ
                            </motion.span>
                            <motion.div
                                className="absolute -bottom-1 left-0 h-[3px] rounded-full"
                                style={{ backgroundColor: "#5A7ACD" }}
                                initial={{ width: 0 }}
                                animate={{ width: "100%" }}
                                transition={{ delay: 0.5, duration: 0.8 }}
                            />
                        </Link>
                    </motion.div>

                    {/* DESKTOP NAV with enhanced hover effects */}
                    <nav className="hidden md:flex items-center gap-1">
                        {navItems.map((item) => (
                            <motion.div
                                key={item.label}
                                onHoverStart={() => setHoveredNav(item.label)}
                                onHoverEnd={() => setHoveredNav(null)}
                                whileHover={{ y: -2 }}
                                className="relative px-4 py-2"
                            >
                                <a
                                    href={item.href}
                                    className="relative text-sm font-medium transition-colors duration-200"
                                    style={{
                                        color: hoveredNav === item.label ? "#5A7ACD" : "#16476A"
                                    }}
                                >
                                    {item.label}

                                    {/* Animated underline */}
                                    <motion.div
                                        className="absolute -bottom-1 left-0 h-[2px] rounded-full"
                                        style={{ backgroundColor: "#5A7ACD" }}
                                        initial={{ width: 0 }}
                                        animate={{
                                            width: hoveredNav === item.label ? "100%" : 0
                                        }}
                                        transition={{ duration: 0.2 }}
                                    />

                                    {/* Hover glow effect */}
                                    <motion.div
                                        className="absolute -inset-2 rounded-lg -z-10"
                                        style={{ backgroundColor: "#5A7ACD" }}
                                        initial={{ opacity: 0 }}
                                        animate={{
                                            opacity: hoveredNav === item.label ? 0.1 : 0
                                        }}
                                        transition={{ duration: 0.2 }}
                                    />
                                </a>
                            </motion.div>
                        ))}
                    </nav>

                    {/* DESKTOP CTA with enhanced animations */}
                    <div className="hidden md:flex items-center gap-4">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Button
                                variant="ghost"
                                className="font-medium"
                                style={{ color: "#16476A" }}
                            >
                                Login
                            </Button>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <Button
                                className="font-medium group relative overflow-hidden"
                                style={{
                                    backgroundColor: "#5A7ACD",
                                    color: "#F5F2F2",
                                }}
                            >
                                <span className="relative z-10">Sign Up</span>

                                {/* Button hover effect */}
                                <motion.div
                                    className="absolute inset-0"
                                    style={{ backgroundColor: "#16476A" }}
                                    initial={{ x: "100%" }}
                                    whileHover={{ x: 0 }}
                                    transition={{ duration: 0.3 }}
                                />

                                {/* Arrow icon animation */}
                                <motion.div
                                    className="relative z-10 ml-2"
                                    initial={{ x: 0 }}
                                    whileHover={{ x: 3 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <ChevronRight className="h-4 w-4" />
                                </motion.div>
                            </Button>
                        </motion.div>
                    </div>

                    {/* MOBILE MENU */}
                    <div className="md:hidden">
                        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                            <SheetTrigger asChild>
                                <motion.div
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="relative"
                                        onClick={() => setMobileOpen(true)}
                                    >
                                        <AnimatePresence mode="wait">
                                            {mobileOpen ? (
                                                <motion.div
                                                    key="close"
                                                    initial={{ rotate: -90, opacity: 0 }}
                                                    animate={{ rotate: 0, opacity: 1 }}
                                                    exit={{ rotate: 90, opacity: 0 }}
                                                >
                                                    <X className="h-5 w-5" />
                                                </motion.div>
                                            ) : (
                                                <motion.div
                                                    key="menu"
                                                    initial={{ rotate: 90, opacity: 0 }}
                                                    animate={{ rotate: 0, opacity: 1 }}
                                                    exit={{ rotate: -90, opacity: 0 }}
                                                >
                                                    <Menu className="h-5 w-5" />
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </Button>
                                </motion.div>
                            </SheetTrigger>

                            <SheetContent
                                side="right"
                                className="w-[300px] sm:w-[350px] p-0 border-none"
                                style={{ backgroundColor: "#F5F2F2" }}
                            >
                                <motion.div
                                    initial={{ x: 100, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                    className="h-full flex flex-col"
                                >
                                    {/* Mobile menu header */}
                                    <div className="p-6 border-b" style={{ borderColor: "#5A7ACD22" }}>
                                        <span className="text-2xl font-bold" style={{ color: "#16476A" }}>
                                            KNOW
                                        </span>
                                        <p className="text-sm mt-2" style={{ color: "#16476A99" }}>
                                            Skill Validation Platform
                                        </p>
                                    </div>

                                    {/* Mobile menu items */}
                                    <div className="flex-1 p-6">
                                        <div className="space-y-1">
                                            {navItems.map((item, index) => (
                                                <motion.div
                                                    key={item.label}
                                                    initial={{ x: 20, opacity: 0 }}
                                                    animate={{ x: 0, opacity: 1 }}
                                                    transition={{ delay: index * 0.1 }}
                                                    whileHover={{ x: 5 }}
                                                >
                                                    <a
                                                        href={item.href}
                                                        className="flex items-center justify-between py-3 text-lg font-medium"
                                                        style={{ color: "#16476A" }}
                                                        onClick={() => setMobileOpen(false)}
                                                    >
                                                        <span>{item.label}</span>
                                                        <ChevronRight className="h-4 w-4" />
                                                    </a>
                                                </motion.div>
                                            ))}
                                        </div>

                                        {/* Mobile CTA */}
                                        <motion.div
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.5 }}
                                            className="mt-12 space-y-4"
                                        >
                                            <Button
                                                variant="outline"
                                                className="w-full justify-center"
                                                style={{
                                                    borderColor: "#16476A",
                                                    color: "#16476A"
                                                }}
                                                onClick={() => setMobileOpen(false)}
                                            >
                                                Login
                                            </Button>

                                            <Button
                                                className="w-full justify-center group"
                                                style={{
                                                    backgroundColor: "#5A7ACD",
                                                    color: "#F5F2F2"
                                                }}
                                                onClick={() => setMobileOpen(false)}
                                            >
                                                <span>Sign Up Free</span>
                                                <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                            </Button>
                                        </motion.div>
                                    </div>

                                    {/* Mobile footer */}
                                    <div className="p-6 border-t" style={{ borderColor: "#5A7ACD22" }}>
                                        <p className="text-xs text-center" style={{ color: "#16476A80" }}>
                                            Start your skill validation journey today
                                        </p>
                                    </div>
                                </motion.div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </motion.div>
        </motion.header>
    );
}