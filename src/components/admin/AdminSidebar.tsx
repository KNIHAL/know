"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, BookOpen, FileQuestion, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

const items = [
    {
        label: "Dashboard",
        href: "/admin",
        icon: LayoutDashboard,
    },
    {
        label: "Micro-Courses",
        href: "/admin/micro-courses",
        icon: BookOpen,
    },
    {
        label: "Mock Tests",
        href: "/admin/platform-mock-tests",
        icon: FileQuestion,
    },
];

export default function AdminSidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 min-h-screen bg-[#020617] border-r border-white/10 flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-white/10">
                <h1 className="text-lg font-semibold text-white">KNOW Admin</h1>
                <p className="text-xs text-slate-400 mt-1">
                    Platform Control Panel
                </p>
            </div>

            {/* Nav */}
            <nav className="flex-1 p-4 space-y-1">
                {items.map((item) => {
                    const active = pathname.startsWith(item.href);
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition
                ${active
                                    ? "bg-blue-600/15 text-white"
                                    : "text-slate-300 hover:bg-white/5"
                                }
              `}
                        >
                            <Icon size={18} />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-white/10">
                <button
                    onClick={() => signOut({ callbackUrl: "/auth/login" })}
                    className="flex items-center gap-3 w-full px-3 py-2 rounded-lg
                     text-slate-300 hover:bg-white/5 text-sm"
                >
                    <LogOut size={18} />
                    Logout
                </button>
            </div>
        </aside>
    );
}
