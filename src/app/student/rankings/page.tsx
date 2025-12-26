"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useSession } from "next-auth/react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Trophy, User } from "lucide-react";

type RankRow = {
    rank: number;
    name: string;
    score: string;
    isYou?: boolean;
};

function RankRowItem({ row }: { row: RankRow }) {
    return (
        <div
            className={`flex items-center justify-between p-3 rounded-lg
        ${row.isYou ? "bg-blue-600/15 border border-blue-500/30" : "hover:bg-white/5"}
      `}
        >
            <div className="flex items-center gap-3">
                <span className="w-8 text-center font-semibold text-slate-200">
                    {row.rank}
                </span>
                <User size={16} className="text-slate-400" />
                <span
                    className={`text-sm ${row.isYou ? "text-white font-medium" : "text-slate-300"
                        }`}
                >
                    {row.name}
                </span>
                {row.isYou && <Badge variant="secondary">You</Badge>}
            </div>

            <span className="text-sm text-slate-300">{row.score}</span>
        </div>
    );
}

export default function RankingsPage() {
    const { data: session, status } = useSession();
    const [leaderboard, setLeaderboard] = useState<RankRow[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (status !== "authenticated" || !session?.user?.id) return;

        async function loadLeaderboard() {
            setLoading(true);

            // latest published mock test
            const { data: test } = await supabase
                .from("platform_mock_tests")
                .select("id, total_marks")
                .eq("is_published", true)
                .order("created_at", { ascending: false })
                .limit(1)
                .single();

            if (!test) {
                setLeaderboard([]);
                setLoading(false);
                return;
            }

            // rankings from SQL function
            const { data: ranks } = await supabase.rpc("get_rankings", {
                test_id: test.id,
            });

            if (!ranks) {
                setLeaderboard([]);
                setLoading(false);
                return;
            }

            const userId = session?.user?.id ?? "";

            const rows: RankRow[] = ranks.map((r: any) => ({
                rank: r.rank,
                name: r.student_id === userId ? "You" : `Student ${r.rank}`,
                score: `${r.score} / ${test.total_marks}`,
                isYou: r.student_id === userId,
            }));


            setLeaderboard(rows);
            setLoading(false);
        }

        loadLeaderboard();
    }, [status, session?.user?.id]);

    return (
        <div className="max-w-4xl space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-semibold text-white">Rankings</h1>
                <p className="text-slate-400 mt-1">
                    Rankings are calculated only from official platform mock tests
                </p>
            </div>

            {/* Filters (UI only – future-ready) */}
            <div className="flex flex-wrap gap-4 text-white">
                <Select disabled>
                    <SelectTrigger className="w-40">
                        <SelectValue placeholder="Stream" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#020617] border border-white/10">
                        <SelectItem value="all">All</SelectItem>
                    </SelectContent>
                </Select>

                <Select disabled>
                    <SelectTrigger className="w-40">
                        <SelectValue placeholder="Mock Test" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#020617] border border-white/10">
                        <SelectItem value="latest">Latest Test</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Leaderboard */}
            <Card className="bg-[#0f172a]/80 border border-white/10">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white">
                        <Trophy size={18} /> Leaderboard
                    </CardTitle>
                </CardHeader>

                <CardContent className="space-y-2">
                    {loading ? (
                        <p className="text-slate-400">Loading leaderboard...</p>
                    ) : leaderboard.length > 0 ? (
                        leaderboard.map((row) => (
                            <RankRowItem key={row.rank} row={row} />
                        ))
                    ) : (
                        <p className="text-slate-400">No rankings available yet.</p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
