"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, FileText } from "lucide-react";

type TestStatus = "upcoming" | "live" | "ended";

function StatusBadge({ status }: { status: TestStatus }) {
    const map = {
        upcoming: "secondary",
        live: "default",
        ended: "outline",
    } as const;

    return <Badge variant={map[status]}>{status.toUpperCase()}</Badge>;
}

function MockTestCard({
    title,
    duration,
    questions,
    status,
}: {
    title: string;
    duration: string;
    questions: number;
    status: TestStatus;
}) {
    return (
        <Card className="bg-[#0f172a]/80 border border-white/10 hover:border-blue-500/40 transition">
            <CardHeader className="space-y-2">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-white text-base">{title}</CardTitle>
                    <StatusBadge status={status} />
                </div>
            </CardHeader>

            <CardContent className="space-y-4">
                <div className="flex items-center gap-4 text-sm text-slate-300">
                    <div className="flex items-center gap-1">
                        <Clock size={14} /> {duration}
                    </div>
                    <div className="flex items-center gap-1">
                        <FileText size={14} /> {questions} Questions
                    </div>
                </div>

                <div className="flex justify-end">
                    {status === "live" && (
                        <Button size="sm">Start Test</Button>
                    )}
                    {status === "upcoming" && (
                        <Button size="sm" variant="secondary" disabled>
                            Not Started
                        </Button>
                    )}
                    {status === "ended" && (
                        <Button size="sm" variant="outline">
                            View Result
                        </Button>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}

export default function MockTestsPage() {
    const tests = [
        {
            title: "JEE Full Length Mock – 01",
            duration: "3 Hours",
            questions: 90,
            status: "live" as TestStatus,
        },
        {
            title: "NEET Practice Mock – Biology",
            duration: "2 Hours",
            questions: 60,
            status: "upcoming" as TestStatus,
        },
        {
            title: "CUET General Test – 2024",
            duration: "1.5 Hours",
            questions: 75,
            status: "ended" as TestStatus,
        },
    ];

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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tests.map((t, i) => (
                    <MockTestCard key={i} {...t} />
                ))}
            </div>
        </div>
    );
}
