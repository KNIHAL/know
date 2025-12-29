import { getServerSession } from "next-auth";
import { authOptions } from "@/app/utils/authOptions";
import { supabase } from "@/lib/supabase";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Trophy, BarChart3 } from "lucide-react";

export default async function ResultsPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return (
      <Card className="p-8 text-center text-slate-400 bg-[#0f172a]/80 border border-white/10">
        Please login to view your results.
      </Card>
    );
  }

  const { data: attempts } = await supabase
    .from("mock_test_attempts")
    .select(`
      id,
      score,
      submitted_at,
      platform_mock_tests (
        title,
        total_marks
      )
    `)
    .eq("student_id", session.user.id)
    .order("submitted_at", { ascending: false });

  if (!attempts || attempts.length === 0) {
    return (
      <Card className="p-10 text-center bg-[#0f172a]/80 border border-white/10">
        <p className="text-slate-400">
          You haven’t attempted any platform mock tests yet.
        </p>
      </Card>
    );
  }

  return (
    <div className="max-w-6xl space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-white">My Results</h1>
        <p className="text-slate-400 mt-1">
          View your performance in platform mock tests
        </p>
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {attempts.map((a) => {
          const test = a.platform_mock_tests?.[0];

          return (
            <Card
              key={a.id}
              className="bg-[#0f172a]/80 border border-white/10 hover:border-blue-500/40 transition p-5 space-y-4"
            >
              <div className="flex items-center justify-between">
                <p className="text-white font-medium">
                  {test?.title ?? "Mock Test"}
                </p>
                <Badge>Evaluated</Badge>
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-slate-300">
                <div className="flex items-center gap-1">
                  <Calendar size={14} />
                  {a.submitted_at
                    ? new Date(a.submitted_at).toLocaleDateString()
                    : "—"}
                </div>

                <div className="flex items-center gap-1">
                  <BarChart3 size={14} />
                  {a.score !== null && test
                    ? `${a.score} / ${test.total_marks}`
                    : "—"}
                </div>

                <div className="flex items-center gap-1">
                  <Trophy size={14} />
                  Ranking available on leaderboard
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
