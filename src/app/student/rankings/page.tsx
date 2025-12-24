"use client";

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
                <span className={`text-sm ${row.isYou ? "text-white font-medium" : "text-slate-300"}`}>
                    {row.name}
                </span>
                {row.isYou && <Badge variant="secondary">You</Badge>}
            </div>

            <span className="text-sm text-slate-300">{row.score}</span>
        </div>
    );
}

export default function RankingsPage() {
    const leaderboard: RankRow[] = [
        { rank: 1, name: "Aarav Sharma", score: "285 / 300" },
        { rank: 2, name: "Neha Verma", score: "278 / 300" },
        { rank: 3, name: "Rahul Singh", score: "272 / 300" },
        { rank: 128, name: "You", score: "210 / 300", isYou: true },
    ];

    return (
        <div className="max-w-4xl space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-semibold text-white">Rankings</h1>
                <p className="text-slate-400 mt-1">
                    Rankings are calculated only from official platform mock tests
                </p>
            </div>

            {/* Filters (UI only) */}
            <div className="flex flex-wrap gap-4 text-white">
                <Select>
                    <SelectTrigger className="w-40">
                        <SelectValue placeholder="Stream" />
                    </SelectTrigger>
                    <SelectContent className="
                        bg-[#020617]
                        text-slate-200
                        border border-white/10
                        shadow-xl
                    ">
                        <SelectItem value="all" className="text-white">All</SelectItem>
                        <SelectItem value="jee" className="text-white">JEE</SelectItem>
                        <SelectItem value="neet" className="text-white">NEET</SelectItem>
                    </SelectContent>
                </Select>

                <Select>
                    <SelectTrigger className="w-40">
                        <SelectValue placeholder="Mock Test" />
                    </SelectTrigger>
                    <SelectContent className="
                        bg-[#020617]
                        text-slate-200
                        border border-white/10
                        shadow-xl
                    ">
                        <SelectItem value="latest" className="text-white">Latest Test</SelectItem>
                        <SelectItem value="mock1" className="text-white">Mock Test 01</SelectItem>
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
                    {leaderboard.map((row) => (
                        <RankRowItem key={row.rank} row={row} />
                    ))}
                </CardContent>
            </Card>
        </div>
    );
}
