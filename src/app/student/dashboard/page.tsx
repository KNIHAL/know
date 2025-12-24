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

            {/* 🎛 Filters */}
            <Card className="p-6 bg-gradient-to-br from-[#f6f0e6] to-[#efe8db]
        dark:from-[#020617] dark:to-[#020617] border-none">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-sm">
                    {/* Content Type */}
                    <div>
                        <p className="font-medium mb-2">Content Type</p>
                        <div className="space-y-2">
                            <label className="flex items-center gap-2">
                                <Checkbox /> Micro-Courses
                            </label>
                            <label className="flex items-center gap-2">
                                <Checkbox /> Notes
                            </label>
                            <label className="flex items-center gap-2">
                                <Checkbox /> PPTs
                            </label>
                        </div>
                    </div>

                    {/* Stream */}
                    <div>
                        <p className="font-medium mb-2">Stream</p>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="All" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                <SelectItem value="science">Science</SelectItem>
                                <SelectItem value="commerce">Commerce</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Exam */}
                    <div>
                        <p className="font-medium mb-2">Exam</p>
                        <Input placeholder="JEE / NEET / CUET" />
                    </div>

                    {/* Price */}
                    <div>
                        <p className="font-medium mb-2">Price</p>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="All" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                <SelectItem value="free">Free</SelectItem>
                                <SelectItem value="paid">Paid</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </Card>

            {/* 🧠 Practice & Validation */}
            <section>
                <h2 className="text-lg font-semibold text-white mb-4">
                    Practice & Validation
                </h2>

                <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                        size="lg"
                        className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
                    >
                        <Link href="/student/mock-tests" className="w-full">
                            Take Platform Mock Test
                        </Link>
                    </Button>

                    <Button
                        size="lg"
                        variant="secondary"
                        className="rounded-xl"
                    >
                        <Link href="/student/rankings" className="w-full">
                            View Rankings
                        </Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
