"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
    Home,
    BookOpen,
    Layers,
    FileText,
    BarChart3,
    Trophy,
    User,
    Settings,
    HelpCircle,
    Bell,
    Calendar,
    TrendingUp,
    LogOut,
    Menu,
    X,
    ChevronLeft,
    ChevronRight,
    Sun,
    Moon,
    Search
} from "lucide-react";

import { useSession } from "next-auth/react";
import { supabase } from "@/lib/supabase";
import { signOut } from "next-auth/react";


const links = [
    { name: "Dashboard", href: "/student/dashboard", icon: Home },
    { name: "My Content", href: "/student/my-content", icon: BookOpen },
    { name: "Micro-Courses", href: "/student/micro-courses", icon: Layers },
    { name: "Mock Tests", href: "/student/mock-tests", icon: FileText },
    { name: "Results", href: "/student/results", icon: BarChart3 },
    { name: "Rankings", href: "/student/rankings", icon: Trophy },
];

const bottomLinks = [
    { name: "Settings", href: "/student/settings", icon: Settings },
    { name: "Help Center", href: "/student/help", icon: HelpCircle },
];

// Define user type interface
interface UserData {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    stream?: string;
    exam?: string;
    enrollmentDate?: string;
}

// Mock user data - Replace with actual API call
const mockUser: UserData = {
    id: "1",
    name: "",
    email: "",
    stream: "NEET Aspirant",
    enrollmentDate: "2024-01-15"
};

export default function StudentSidebar() {
    const pathname = usePathname();
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [user, setUser] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);

    // Fetch user data from your API/DB
    const { data: session, status } = useSession();
    useEffect(() => {
        if (!session?.user?.id) return;

        const fetchUserProfile = async () => {
            try {
                setLoading(true);

                // 👇 IMPORTANT: no .single()
                const { data, error } = await supabase
                    .from("student_profiles")
                    .select("full_name, stream, exam")
                    .eq("id", session.user.id)
                    .maybeSingle(); // 🔥 FIX

                if (error) {
                    console.error(error);
                    return;
                }

                setUser({
                    id: session.user.id,
                    name: data?.full_name || session.user.name || "",
                    email: session.user.email || "",
                    stream: data?.stream || "",
                    exam: data?.exam || "",
                });
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();

        window.addEventListener("profile-updated", fetchUserProfile);
        return () =>
            window.removeEventListener("profile-updated", fetchUserProfile);
    }, [session]);


    // Get user initials for avatar
    const getUserInitials = (name: string) => {
        if (!name) return "S";
        const names = name.split(' ');
        if (names.length === 1) return names[0].charAt(0).toUpperCase();
        return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
    };

    // Check if mobile on mount and resize
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
            if (window.innerWidth >= 768) {
                setIsMobileOpen(false);
            }
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Load dark mode preference
    useEffect(() => {
        const savedDarkMode = localStorage.getItem('know-dark-mode') === 'true';
        setIsDarkMode(savedDarkMode);

        if (savedDarkMode) {
            document.documentElement.classList.add('dark');
        }
    }, []);

    const toggleDarkMode = () => {
        const newDarkMode = !isDarkMode;
        setIsDarkMode(newDarkMode);

        if (newDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }

        localStorage.setItem('know-dark-mode', newDarkMode.toString());
    };

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    // Mobile overlay click handler
    const handleOverlayClick = () => {
        setIsMobileOpen(false);
    };

    // Main sidebar component
    const SidebarContent = () => (
        <div className={`
      flex flex-col h-full transition-all duration-300
      ${isCollapsed && !isMobile ? 'w-20' : 'w-64'}
      bg-gradient-to-b from-[#1a237e] to-[#283593] dark:from-gray-900 dark:to-gray-800
      text-white dark:text-gray-200
    `}>
            {/* Header with toggle */}
            <div className="p-4 border-b border-white/10 dark:border-gray-700">
                <div className={`flex items-center justify-between ${isCollapsed && !isMobile ? 'justify-center' : ''}`}>
                    {(!isCollapsed || isMobile) && (
                        <>
                            <div>
                                <h1 className="text-xl font-bold tracking-tight">KNOW</h1>
                                <p className="text-xs text-blue-100 dark:text-gray-400 mt-1">Student Portal</p>
                            </div>
                            <button
                                onClick={toggleSidebar}
                                className="hidden md:block p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                                aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                            >
                                {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
                            </button>
                        </>
                    )}
                    {isCollapsed && !isMobile && (
                        <button
                            onClick={toggleSidebar}
                            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                            aria-label="Expand sidebar"
                        >
                            <ChevronRight size={18} />
                        </button>
                    )}
                </div>
            </div>

            {/* User Profile - Dynamic from DB */}
            {(!isCollapsed || isMobile) && (
                <div className="p-4 border-b border-white/10 dark:border-gray-700">
                    {loading ? (
                        // Loading skeleton
                        <div className="flex items-center space-x-3">
                            <div className="h-10 w-10 rounded-full bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
                            <div className="space-y-2">
                                <div className="h-3 w-24 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
                                <div className="h-2 w-16 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
                            </div>
                        </div>
                    ) : user ? (
                        <div className="flex items-center space-x-3">
                            {/* User Avatar - Dynamic */}
                            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
                                <span className="font-bold text-sm">
                                    {getUserInitials(user.name)}
                                </span>
                            </div>
                            <div>
                                <h3 className="font-semibold text-sm">
                                    {user.name || "Student Name"}
                                </h3>
                                <p className="text-xs text-blue-100 dark:text-gray-400">
                                    {user.stream || "Your Stream"}
                                </p>
                            </div>
                        </div>
                    ) : (
                        // No user found
                        <div className="flex items-center space-x-3">
                            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-gray-500 to-gray-700 flex items-center justify-center">
                                <User size={18} />
                            </div>
                            <div>
                                <h3 className="font-semibold text-sm">Guest User</h3>
                                <p className="text-xs text-blue-100 dark:text-gray-400">
                                    Please login
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Navigation Links */}
            <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
                {links.map((link) => {
                    const Icon = link.icon;
                    const active = pathname === link.href;

                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => isMobile && setIsMobileOpen(false)}
                            className={`
                flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200
                ${active
                                    ? "bg-white/20 backdrop-blur-sm border-l-4 border-cyan-400"
                                    : "text-blue-100 dark:text-gray-300 hover:bg-white/10"
                                }
                ${isCollapsed && !isMobile ? 'justify-center' : ''}
              `}
                            title={isCollapsed && !isMobile ? link.name : ''}
                        >
                            <Icon size={20} />
                            {(!isCollapsed || isMobile) && (
                                <span className="text-sm font-medium">{link.name}</span>
                            )}
                        </Link>
                    );
                })}
            </nav>


            {/* Dark Mode Toggle */}
            <div className="p-3 border-t border-white/10 dark:border-gray-700">
                <button
                    onClick={toggleDarkMode}
                    className={`
            flex items-center justify-center space-x-2 w-full px-3 py-2.5 
            rounded-lg bg-white/10 hover:bg-white/20 transition-colors
            ${isCollapsed && !isMobile ? 'justify-center' : ''}
          `}
                    aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
                >
                    {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                    {(!isCollapsed || isMobile) && (
                        <span className="text-sm">
                            {isDarkMode ? "Light Mode" : "Dark Mode"}
                        </span>
                    )}
                </button>
            </div>

            {/* Bottom Links */}
            <div className="p-2 space-y-1">
                {bottomLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => isMobile && setIsMobileOpen(false)}
                            className={`
                flex items-center space-x-3 px-3 py-2.5 rounded-lg
                text-blue-100 dark:text-gray-300 hover:bg-white/10 transition-colors
                ${isCollapsed && !isMobile ? 'justify-center' : ''}
              `}
                            title={isCollapsed && !isMobile ? link.name : ''}
                        >
                            <Icon size={18} />
                            {(!isCollapsed || isMobile) && (
                                <span className="text-sm">{link.name}</span>
                            )}
                        </Link>
                    );
                })}

                {/* Logout Button */}
                <button
                    onClick={() => signOut({ callbackUrl: "/auth/login" })}
                    className={`
                    flex items-center space-x-3 px-3 py-2.5 rounded-lg w-full
                    text-blue-100 dark:text-gray-300 hover:bg-white/10 transition-colors
                    ${isCollapsed && !isMobile ? "justify-center" : ""}
                `}
                >
                    <LogOut size={18} />
                    {(!isCollapsed || isMobile) && (
                        <span className="text-sm">Logout</span>
                    )}
                </button>
            </div>
        </div>
    );

    return (
        <>
            {/* Mobile Top Bar with Dynamic User */}
            <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 p-3 flex items-center justify-between">
                <button
                    onClick={() => setIsMobileOpen(true)}
                    className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800"
                    aria-label="Open menu"
                >
                    <Menu size={20} />
                </button>

                <div className="flex-1 mx-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search courses, notes..."
                            className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                {/* Mobile User Avatar */}
                {user && !loading && (
                    <div className="h-8 w-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
                        <span className="font-bold text-xs text-white">
                            {getUserInitials(user.name)}
                        </span>
                    </div>
                )}
            </div>

            {/* Mobile Sidebar Overlay */}
            {isMobileOpen && isMobile && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={handleOverlayClick}
                />
            )}

            {/* Sidebar for Mobile */}
            <div className={`
        fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
        md:relative md:translate-x-0 md:flex
      `}>
                <SidebarContent />

                {/* Close button for mobile */}
                {isMobile && (
                    <button
                        onClick={() => setIsMobileOpen(false)}
                        className="absolute top-4 right-4 p-2 rounded-full bg-white/20 backdrop-blur-sm md:hidden"
                        aria-label="Close menu"
                    >
                        <X size={20} />
                    </button>
                )}
            </div>

            {/* Spacer for mobile top bar */}
            {isMobile && <div className="h-16 md:h-0"></div>}
        </>
    );
}