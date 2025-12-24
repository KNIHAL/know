import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { supabase } from "@/lib/supabase";

export default async function ResultsPage() {
  const session = await getServerSession(authOptions);

  const { data: attempts } = await supabase
    .from("mock_test_attempts")
    .select(`
      id,
      score,
      created_at,
      platform_mock_tests (
        title,
        total_marks
      )
    `)
    .eq("student_id", session!.user.id)
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">My Results</h1>

      {!attempts || attempts.length === 0 ? (
        <p>No mock tests attempted yet.</p>
      ) : (
        <div className="space-y-4">
          {attempts.map((a: any) => (
            <div
              key={a.id}
              className="border p-4 rounded bg-white"
            >
              <h2 className="font-medium">
                {a.platform_mock_tests?.title}
              </h2>

              <p className="text-sm text-gray-600">
                Score: {a.score} / {a.platform_mock_tests?.total_marks}
              </p>

              <p className="text-xs text-gray-500">
                Attempted on{" "}
                {new Date(a.created_at).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
