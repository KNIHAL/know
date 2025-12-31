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

            const { data: purchases } = await supabase
                .from("student_purchases")
                .select("content_id")
                .eq("student_id", userId)
                .eq("content_type", "micro_course");

            if (!purchases || purchases.length === 0) {
                setItems([]);
                setLoading(false);
                return;
            }

            const ids = purchases.map(p => p.content_id);

            const { data } = await supabase
                .from("micro_courses")
                .select("id, title")
                .in("id", ids);

            setItems(data || []);
            setLoading(false);
        }

        loadMyContent();
    }, [status, session?.user?.id]);

    return (
        <div className="max-w-5xl space-y-8">
            <div>
                <h1 className="text-2xl font-semibold text-white">My Content</h1>
                <p className="text-slate-400 mt-1">
                    Access all the micro-courses you’ve purchased
                </p>
            </div>

            {loading ? (
                <p className="text-slate-400">Loading...</p>
            ) : items.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {items.map(item => (
                        <Card
                            key={item.id}
                            className="p-5 bg-[#0f172a]/80 border border-white/10"
                        >
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-white font-medium">{item.title}</h3>
                                <Badge variant="secondary">Micro-Course</Badge>
                            </div>

                            <Button asChild size="sm">
                                <Link href={`/student/micro-courses/${item.id}`}>
                                    Open
                                </Link>
                            </Button>
                        </Card>
                    ))}
                </div>
            ) : (
                <Card className="p-10 text-center bg-[#0f172a]/80 border border-white/10">
                    <p className="text-slate-400">
                        You haven’t unlocked any micro-courses yet.
                    </p>
                </Card>
            )}
        </div>
    );
}
