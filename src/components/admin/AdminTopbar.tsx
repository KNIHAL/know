"use client";

import { usePathname } from "next/navigation";

export default function AdminTopbar() {
    const pathname = usePathname();

    const getTitle = () => {
        if (pathname === "/admin") return "Dashboard";
        if (pathname.startsWith("/admin/micro-courses")) return "Micro-Courses";
        if (pathname.startsWith("/admin/platform-mock-tests")) return "Platform Mock Tests";
        return "Admin Panel";
    };

    return (
        <header className="border-b border-white/10 bg-[#020617]">
            <div className="px-6 py-4 flex items-center justify-between">
                {/* Left */}
                <h1 className="text-lg font-semibold text-white">
                    {getTitle()}
                </h1>

                {/* Right */}
                <div className="flex items-center gap-3">
                    <div className="text-right">
                        <p className="text-sm font-medium text-white">Admin</p>
                        <p className="text-xs text-slate-400">Platform Owner</p>
                    </div>

                    <div className="w-9 h-9 rounded-full bg-blue-600/20 
                                    flex items-center justify-center 
                                    text-blue-400 font-semibold">
                        A
                    </div>
                </div>
            </div>
        </header>
    );
}
