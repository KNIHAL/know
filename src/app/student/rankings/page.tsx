import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { supabase } from "@/lib/supabase";

export default async function RankingsPage() {
    await getServerSession(authOptions); // auth guard

    const { data } = await supabase
        .from("mock_test_attempts")
        .select(`
      student_id,
      score,
      users (
        name
      )
    `)
        .order("score", { ascending: false });

    if (!data || data.length === 0) {
        return <p>No rankings available yet.</p>;
    }

    // Dense ranking
    let lastScore: number | null = null;
    let rank = 0;

    const ranked = data.map((row) => {
        if (row.score !== lastScore) {
            rank += 1;
            lastScore = row.score;
        }
        return { ...row, rank };
    });

    return (
        <div>
            <h1 className="text-2xl font-semibold mb-4">Leaderboard</h1>

            <div className="border rounded overflow-hidden">
                <div className="grid grid-cols-3 bg-gray-100 p-2 font-medium">
                    <span>Rank</span>
                    <span>Student</span>
                    <span>Score</span>
                </div>

                {ranked.map((r, idx) => (
                    <div
                        key={idx}
                        className="grid grid-cols-3 p-2 border-t"
                    >
                        <span>{r.rank}</span>
                        <span>{r.users?.[0]?.name ?? "Student"}</span>

                        <span>{r.score}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
