"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, IndianRupee } from "lucide-react";

type MicroCourse = {
    id: string;
    title: string;
    description: string;
    price: number;
};

function EmptyState() {
    return (
        <Card className="p-10 text-center bg-[#0f172a]/80 border border-white/10">
            <BookOpen className="mx-auto mb-4 text-blue-500" size={36} />
            <h3 className="text-lg font-semibold text-white mb-2">
                No Micro-Courses Found
            </h3>
            <p className="text-sm text-slate-400 mb-6">
                New micro-courses will appear here once published.
            </p>
        </Card>
    );
}

function MicroCourseCard({ course }: { course: MicroCourse }) {
    return (
        <Card
            className="p-6 bg-[#0f172a]/80 border border-white/10
                 hover:border-blue-500/40 transition"
        >
            <div className="space-y-3">
                <Badge className="w-fit">Micro-Course</Badge>

                <h3 className="text-lg font-semibold text-white">
                    {course.title}
                </h3>

                <p className="text-sm text-slate-400 line-clamp-2">
                    {course.description}
                </p>

                <div className="flex items-center justify-between pt-4">
                    <div className="flex items-center text-slate-300 text-sm gap-1">
                        <IndianRupee size={14} />
                        <span>{course.price}</span>
                    </div>

                    <Link href={`/student/micro-courses/${course.id}`}>
                        <Button size="sm">View Details</Button>
                    </Link>
                </div>
            </div>
        </Card>
    );
}

export default function MicroCoursesPage() {
    const [courses, setCourses] = useState<MicroCourse[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchCourses() {
            const { data } = await supabase
                .from("micro_courses")
                .select("id, title, description, price")
                .eq("is_published", true)
                .order("created_at", { ascending: false });

            setCourses(data || []);
            setLoading(false);
        }

        fetchCourses();
    }, []);

    if (loading) {
        return (
            <div className="text-slate-400 text-sm">
                Loading micro-courses…
            </div>
        );
    }

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
            {courses.length ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses.map((c) => (
                        <MicroCourseCard key={c.id} course={c} />
                    ))}
                </div>
            ) : (
                <EmptyState />
            )}
        </div>
    );
}
