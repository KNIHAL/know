"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
    Home,
    BookOpen,
    Layers,
    User,
    Settings,
    HelpCircle,
    LogOut,
    Menu,
    X,
    ChevronLeft,
    ChevronRight,
    Sun,
    Moon,
    Search,
} from "lucide-react";

import { useSession, signOut } from "next-auth/react";

const links = [
    { name: "Dashboard", href: "/student/dashboard", icon: Home },
    { name: "My Content", href: "/student/my-content", icon: BookOpen },
    { name: "Micro-Courses", href: "/student/micro-courses", icon: Layers },
];

const bottomLinks = [
    { name: "Settings", href: "/student/settings", icon: Settings },
    { name: "Help Center", href: "/student/help-center", icon: HelpCircle },
];

export default function StudentSidebar() {
    const pathname = usePathname();
    const { data: session } = useSession();

    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const userName = session?.user?.name || "Student";
    const userEmail = session?.user?.email || "";

    const getUserInitials = (name: string) => {
        if (!name) return "S";
        const parts = name.split(" ");
        return parts.length === 1
            ? parts[0][0].toUpperCase()
            : (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    };

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
            if (window.innerWidth >= 768) setIsMobileOpen(false);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    useEffect(() => {
        const saved = localStorage.getItem("know-dark-mode") === "true";
        setIsDarkMode(saved);
        if (saved) document.documentElement.classList.add("dark");
    }, []);

    const toggleDarkMode = () => {
        const next = !isDarkMode;
        setIsDarkMode(next);
        document.documentElement.classList.toggle("dark", next);
        localStorage.setItem("know-dark-mode", next.toString());
    };

    const SidebarContent = () => (
        <div
            className={`
        flex flex-col h-full transition-all duration-300
        ${isCollapsed && !isMobile ? "w-20" : "w-64"}
        bg-gradient-to-b from-[#1a221e] to-[#283694]
        dark:from-gray-900 dark:to-gray-800
        text-white
      `}
        >
            {/* Header */}
            <div className="p-4 border-b border-white/10">
                <div className="flex items-center justify-between">
                    {!isCollapsed && (
                        <div>
                            <h1 className="text-xl font-bold">KNOW</h1>
                            <p className="text-xs text-blue-100 mt-1">Student Portal</p>
                        </div>
                    )}
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="hidden md:block p-1.5 rounded-lg bg-white/10 hover:bg-white/20"
                    >
                        {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
                    </button>
                </div>
            </div>

            {/* User */}
            {(!isCollapsed || isMobile) && (
                <div className="p-4 border-b border-white/10">
                    <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
                            <span className="font-bold text-sm">
                                {getUserInitials(userName)}
                            </span>
                        </div>
                        <div>
                            <h3 className="font-semibold text-sm">{userName}</h3>
                            <p className="text-xs text-blue-100">{userEmail}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Links */}
            <nav className="flex-1 p-2 space-y-1">
                {links.map((link) => {
                    const Icon = link.icon;
                    const active = pathname === link.href;
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => isMobile && setIsMobileOpen(false)}
                            className={`
                flex items-center space-x-3 px-3 py-2.5 rounded-lg
                ${active ? "bg-white/20 border-l-4 border-cyan-400" : "hover:bg-white/10"}
                ${isCollapsed && !isMobile ? "justify-center" : ""}
              `}
                        >
                            <Icon size={20} />
                            {!isCollapsed && <span className="text-sm">{link.name}</span>}
                        </Link>
                    );
                })}
            </nav>

            {/* Dark mode */}
            <div className="p-3 border-t border-white/10">
                <button
                    onClick={toggleDarkMode}
                    className="flex items-center justify-center w-full px-3 py-2.5 rounded-lg bg-white/10 hover:bg-white/20"
                >
                    {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                    {!isCollapsed && (
                        <span className="ml-2 text-sm">
                            {isDarkMode ? "Light Mode" : "Dark Mode"}
                        </span>
                    )}
                </button>
            </div>

            {/* Bottom */}
            <div className="p-2 space-y-1">
                {bottomLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="flex items-center space-x-3 px-3 py-2.5 rounded-lg hover:bg-white/10"
                        >
                            <Icon size={18} />
                            {!isCollapsed && <span className="text-sm">{link.name}</span>}
                        </Link>
                    );
                })}

                <button
                    onClick={() => signOut({ callbackUrl: "/auth/login" })}
                    className="flex items-center space-x-3 px-3 py-2.5 rounded-lg w-full hover:bg-white/10"
                >
                    <LogOut size={18} />
                    {!isCollapsed && <span className="text-sm">Logout</span>}
                </button>
            </div>
        </div>
    );

    return (
        <>
            {/* Mobile top bar */}
            <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-white dark:bg-gray-900 p-3 flex items-center justify-between">
                <button onClick={() => setIsMobileOpen(true)}>
                    <Menu size={20} />
                </button>
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
                    <span className="font-bold text-xs text-white">
                        {getUserInitials(userName)}
                    </span>
                </div>
            </div>

            {isMobileOpen && isMobile && (
                <div
                    className="fixed inset-0 bg-black/50 z-40"
                    onClick={() => setIsMobileOpen(false)}
                />
            )}

            <div
                className={`
          fixed inset-y-0 left-0 z-50 transform transition-transform
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
          md:relative md:translate-x-0
        `}
            >
                <SidebarContent />
                {isMobile && (
                    <button
                        onClick={() => setIsMobileOpen(false)}
                        className="absolute top-4 right-4 p-2 bg-white/20 rounded-full md:hidden"
                    >
                        <X size={20} />
                    </button>
                )}
            </div>

            {isMobile && <div className="h-16" />}
        </>
    );
}
