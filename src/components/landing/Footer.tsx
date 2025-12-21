"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative border-t" style={{ borderColor: "#5A7ACD22" }}>
            {/* Background gradient */}
            <div className="absolute inset-0 -z-10 opacity-5">
                <div
                    className="absolute bottom-0 left-0 right-0 h-1/2"
                    style={{
                        background: "linear-gradient(180deg, transparent, #5A7ACD22)",
                    }}
                />
            </div>

            <div className="mx-auto max-w-7xl px-6 py-12">
                <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
                    {/* Left: Logo & Copyright */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col items-center md:items-start"
                    >
                        <Link
                            href="/"
                            className="text-2xl font-bold tracking-tighter mb-2"
                            style={{ color: "#16476A" }}
                        >
                            KNOW
                        </Link>
                        <p className="text-sm" style={{ color: "#16476A", opacity: 0.7 }}>
                            © {currentYear} KNOW Platform. All rights reserved.
                        </p>
                    </motion.div>

                    {/* Center: Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="flex flex-wrap justify-center gap-6"
                    >
                        {[
                            { label: "Terms of Service", href: "/terms" },
                            { label: "Privacy Policy", href: "/privacy" },
                            { label: "Contact", href: "/contact" },
                            { label: "FAQ", href: "/faq" },
                        ].map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                className="text-sm transition-colors hover:underline"
                                style={{ color: "#16476A", opacity: 0.8 }}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </motion.div>

                    {/* Right: Social Icons (Optional) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="flex items-center gap-4"
                    >
                        {[
                            { icon: Facebook, href: "#", label: "Facebook" },
                            { icon: Twitter, href: "#", label: "Twitter" },
                            { icon: Instagram, href: "#", label: "Instagram" },
                            { icon: Linkedin, href: "#", label: "LinkedIn" },
                        ].map((social) => (
                            <a
                                key={social.label}
                                href={social.href}
                                aria-label={social.label}
                                className="rounded-lg p-2 transition-all hover:scale-110"
                                style={{
                                    backgroundColor: "#16476A0D",
                                    color: "#16476A"
                                }}
                            >
                                <social.icon className="h-4 w-4" />
                            </a>
                        ))}
                    </motion.div>
                </div>

                {/* Bottom note */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="mt-8 text-center text-xs"
                    style={{ color: "#16476A", opacity: 0.6 }}
                >
                    <p>
                        Built for skill validation. Performance over certificates.
                        This is an MVP platform.
                    </p>
                </motion.div>
            </div>
        </footer>
    );
}