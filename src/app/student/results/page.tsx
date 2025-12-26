"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trophy, Calendar, BarChart3 } from "lucide-react";
import { useSession } from "next-auth/react";

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
  const { data: session, status } = useSession();
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ⛔ wait until session is resolved
    if (status !== "authenticated" || !session?.user?.id) return;

    async function loadResults() {
      setLoading(true);

      const { data: attempts } = await supabase
        .from("mock_test_attempts")
        .select(`
          id,
          score,
          submitted_at,
          mock_test_id,
          platform_mock_tests (
            title,
            total_marks
          )
        `)
        .eq("student_id", session!.user!.id)

        .order("submitted_at", { ascending: false });

      if (!attempts || attempts.length === 0) {
        setResults([]);
        setLoading(false);
        return;
      }

      const formatted = [];

      for (const a of attempts) {
        let rank: number | undefined = undefined;

        if (a.submitted_at) {
          const { data: ranks } = await supabase.rpc("get_rankings", {
            test_id: a.mock_test_id,
          });

          const me = ranks?.find((r: any) => r.attempt_id === a.id);
          rank = me?.rank;
        }

        const test = a.platform_mock_tests?.[0];

        formatted.push({
          title: test?.title ?? "Mock Test",
          date: a.submitted_at
            ? new Date(a.submitted_at).toLocaleDateString()
            : "—",
          score:
            a.score !== null && test
              ? `${a.score} / ${test.total_marks}`
              : "—",
          rank,
          status: a.submitted_at ? "evaluated" : "pending",
        });
      }

      setResults(formatted);
      setLoading(false);
    }

    loadResults();
  }, [session, status]);

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

      {/* Body */}
      {loading ? (
        <p className="text-slate-400">Loading results...</p>
      ) : results.length > 0 ? (
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
