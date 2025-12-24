"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, IndianRupee } from "lucide-react";

function EmptyState() {
    return (
        <Card className="p-10 text-center bg-[#0f172a]/80 border border-white/10">
            <BookOpen className="mx-auto mb-4 text-blue-500" size={36} />
            <h3 className="text-lg font-semibold text-white mb-2">
                No Micro-Courses Found
            </h3>
            <p className="text-sm text-slate-400 mb-6">
                Explore structured learning bundles created by expert teachers.
            </p>
            <Button variant="secondary">Explore Micro-Courses</Button>
        </Card>
    );
}

/**
 * Dummy card UI structure
 * Later you’ll map real data here
 */
function MicroCourseCard() {
    return (
        <Card className="p-6 bg-[#0f172a]/80 border border-white/10
      hover:border-blue-500/40 transition">
            <div className="space-y-3">
                <Badge className="w-fit">Micro-Course</Badge>

                <h3 className="text-lg font-semibold text-white">
                    Complete Physics Revision
                </h3>

                <p className="text-sm text-slate-400">
                    Structured bundle: Notes + PPTs + Quizzes + Mock Test
                </p>

                <div className="flex items-center justify-between pt-4">
                    <div className="flex items-center text-slate-300 text-sm gap-1">
                        <IndianRupee size={14} />
                        <span>499</span>
                    </div>

                    <Button size="sm">View Details</Button>
                </div>
            </div>
        </Card>
    );
}

export default function MicroCoursesPage() {
    const hasCourses = false; // 🔑 change later when backend ready

    return (
        <div className="max-w-6xl space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-semibold text-white">Micro-Courses</h1>
                <p className="text-slate-400 mt-1">
                    Structured learning bundles designed for focused preparation
                </p>
            </div>

            {/* Content */}
            {hasCourses ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <MicroCourseCard />
                    <MicroCourseCard />
                    <MicroCourseCard />
                </div>
            ) : (
                <EmptyState />
            )}
        </div>
    );
}
