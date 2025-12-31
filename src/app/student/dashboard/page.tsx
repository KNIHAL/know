"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

export default function StudentDashboardPage() {
    return (
        <div className="max-w-6xl space-y-10">
            {/* 🔍 Search Bar */}
            <div className="relative">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                    placeholder="Search courses, notes, teachers..."
                    className="pl-12 h-14 rounded-full
            bg-[#0f172a]/80 border border-white/10
            text-white placeholder:text-slate-400
            focus-visible:ring-blue-500"
                />
            </div>


        </div>
    );
}
