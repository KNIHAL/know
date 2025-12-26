"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Item = {
    id: string;
    title: string;
    type: "micro_course" | "platform_mock_test";
};

export default function MyContentPage() {
    const { data: session, status } = useSession();
    const [items, setItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (status !== "authenticated" || !session?.user?.id) return;

        const userId = session.user.id;

        async function loadMyContent() {
            setLoading(true);

            // 1️⃣ Purchases
            const { data: purchases } = await supabase
                .from("student_purchases")
                .select("content_id, content_type")
                .eq("student_id", userId);

            if (!purchases || purchases.length === 0) {
                setItems([]);
                setLoading(false);
                return;
            }

            // 2️⃣ Split by type
            const microIds = purchases
                .filter(p => p.content_type === "micro_course")
                .map(p => p.content_id);

            const mockIds = purchases
                .filter(p => p.content_type === "platform_mock_test")
                .map(p => p.content_id);

            // 3️⃣ Fetch content
            const [microRes, mockRes] = await Promise.all([
                microIds.length
                    ? supabase
                        .from("micro_courses")
                        .select("id, title")
                        .in("id", microIds)
                    : Promise.resolve({ data: [] }),
                mockIds.length
                    ? supabase
                        .from("platform_mock_tests")
                        .select("id, title")
                        .in("id", mockIds)
                    : Promise.resolve({ data: [] }),
            ]);

            const merged: Item[] = [
                ...(microRes.data || []).map((c: any) => ({
                    id: c.id,
                    title: c.title,
                    type: "micro_course" as const,
                })),
                ...(mockRes.data || []).map((t: any) => ({
                    id: t.id,
                    title: t.title,
                    type: "platform_mock_test" as const,
                })),
            ];


            setItems(merged);
            setLoading(false);
        }

        loadMyContent();
    }, [status, session?.user?.id]);

    return (
        <div className="max-w-5xl space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-semibold text-white">My Content</h1>
                <p className="text-slate-400 mt-1">
                    Access all the courses and tests you’ve unlocked
                </p>
            </div>

            {/* Body */}
            {loading ? (
                <p className="text-slate-400">Loading...</p>
            ) : items.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {items.map((item) => (
                        <Card
                            key={`${item.type}-${item.id}`}
                            className="p-5 bg-[#0f172a]/80 border border-white/10"
                        >
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-white font-medium">{item.title}</h3>
                                <Badge variant="secondary">
                                    {item.type === "micro_course" ? "Micro-Course" : "Mock Test"}
                                </Badge>
                            </div>

                            <Button asChild size="sm">
                                <Link
                                    href={
                                        item.type === "micro_course"
                                            ? `/student/micro-courses/${item.id}`
                                            : `/student/mock-tests/${item.id}`
                                    }
                                >
                                    Open
                                </Link>
                            </Button>
                        </Card>
                    ))}
                </div>
            ) : (
                <Card className="p-10 text-center bg-[#0f172a]/80 border border-white/10">
                    <p className="text-slate-400">
                        You haven’t unlocked any content yet.
                    </p>
                </Card>
            )}
        </div>
    );
}
