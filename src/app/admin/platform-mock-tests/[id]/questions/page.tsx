import { supabase } from "@/lib/supabase";
import QuestionList from "@/components/admin/QuestionList";

export default async function MockTestQuestions({
    params,
}: {
    params: { id: string };
}) {
    const { data: test } = await supabase
        .from("platform_mock_tests")
        .select("id, title")
        .eq("id", params.id)
        .single();

    if (!test) {
        return <p className="text-slate-400">Mock test not found.</p>;
    }

    const { data: questions } = await supabase
        .from("platform_mock_questions")
        .select("*")
        .eq("mock_test_id", params.id)
        .order("created_at", { ascending: true });

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-semibold">
                Questions — {test.title}
            </h1>

            <QuestionList
                mockTestId={params.id}
                questions={questions || []}
            />
        </div>
    );
}
