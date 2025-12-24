"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trophy, Calendar, BarChart3 } from "lucide-react";

type ResultStatus = "evaluated" | "pending";

function ResultCard({
  title,
  date,
  score,
  rank,
  status,
}: {
  title: string;
  date: string;
  score: string;
  rank?: number;
  status: ResultStatus;
}) {
  return (
    <Card className="bg-[#0f172a]/80 border border-white/10 hover:border-blue-500/40 transition">
      <CardHeader className="space-y-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-white text-base">{title}</CardTitle>
          <Badge variant={status === "evaluated" ? "default" : "secondary"}>
            {status === "evaluated" ? "EVALUATED" : "PENDING"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-4 text-sm text-slate-300">
          <div className="flex items-center gap-1">
            <Calendar size={14} /> {date}
          </div>
          <div className="flex items-center gap-1">
            <BarChart3 size={14} /> Score: {score}
          </div>
          {rank !== undefined && (
            <div className="flex items-center gap-1">
              <Trophy size={14} /> Rank: {rank}
            </div>
          )}
        </div>

        <div className="flex justify-end">
          <Button size="sm" variant="outline">
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function ResultsPage() {
  const results = [
    {
      title: "JEE Full Length Mock – 01",
      date: "12 Jan 2025",
      score: "210 / 300",
      rank: 128,
      status: "evaluated" as ResultStatus,
    },
    {
      title: "NEET Practice Mock – Biology",
      date: "18 Jan 2025",
      score: "—",
      status: "pending" as ResultStatus,
    },
  ];

  return (
    <div className="max-w-6xl space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-white">
          My Results
        </h1>
        <p className="text-slate-400 mt-1">
          View your performance in platform mock tests
        </p>
      </div>

      {/* Results Grid */}
      {results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((r, i) => (
            <ResultCard key={i} {...r} />
          ))}
        </div>
      ) : (
        <Card className="p-10 text-center bg-[#0f172a]/80 border border-white/10">
          <p className="text-slate-400">
            You haven’t attempted any platform mock tests yet.
          </p>
        </Card>
      )}
    </div>
  );
}
