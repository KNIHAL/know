"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, FileText } from "lucide-react";

type Test = {
    id: string;
    title: string;
    duration_minutes: number;
    total_marks: number;
};

function MockTestCard({ test }: { test: Test }) {
    return (
        <Card className="bg-[#0f172a]/80 border border-white/10 hover:border-blue-500/40 transition">
            <CardHeader>
                <CardTitle className="text-white text-base">
                    {test.title}
                </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
                <div className="flex items-center gap-4 text-sm text-slate-300">
                    <div className="flex items-center gap-1">
                        <Clock size={14} /> {test.duration_minutes} min
                    </div>
                    <div className="flex items-center gap-1">
                        <FileText size={14} /> {test.total_marks} Marks
                    </div>
                </div>

                <div className="flex justify-end">
                    <Link href={`/student/mock-tests/${test.id}/start`}>
                        <Button size="sm">Start Test</Button>
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
}

export default function MockTestsPage() {
    const [tests, setTests] = useState<Test[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchTests() {
            const { data } = await supabase
                .from("platform_mock_tests")
                .select("id, title, duration_minutes, total_marks")
                .eq("is_published", true)
                .order("created_at", { ascending: false });

            setTests(data || []);
            setLoading(false);
        }

        fetchTests();
    }, []);

    if (loading) {
        return <p className="text-slate-400">Loading mock tests…</p>;
    }

    return (
        <div className="max-w-6xl space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-semibold text-white">
                    Platform Mock Tests
                </h1>
                <p className="text-slate-400 mt-1">
                    Official mock tests used for rankings and percentile calculation
                </p>
            </div>

            {/* List */}
            {tests.length ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tests.map((t) => (
                        <MockTestCard key={t.id} test={t} />
                    ))}
                </div>
            ) : (
                <p className="text-slate-400">
                    No platform mock tests available yet.
                </p>
            )}
        </div>
    );
}
