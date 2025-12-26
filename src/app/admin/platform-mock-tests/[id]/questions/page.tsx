import { requireAdmin } from "@/lib/guards/requireAdmin";
import { supabase } from "@/lib/supabase";
import { redirect } from "next/navigation";
import PlatformMockQuestionForm from "@/components/admin/PlatformMockQuestionForm";
import QuestionList from "@/components/admin/QuestionList";

export default async function QuestionsPage({
    params,
}: {
    params: { id: string };
}) {
    const { allowed } = await requireAdmin();
    if (!allowed) redirect("/admin/not-authorized");

    const { data: questions } = await supabase
        .from("platform_mock_questions")
        .select("*")
        .eq("mock_test_id", params.id)
        .order("order_index");

    async function addQuestion(q: any) {
        "use server";
        await supabase.from("platform_mock_questions").insert({
            ...q,
            mock_test_id: params.id,
        });
    }

    async function updateQuestion(id: string, q: any) {
        "use server";
        await supabase
            .from("platform_mock_questions")
            .update(q)
            .eq("id", id);
    }

    async function deleteQuestion(id: string) {
        "use server";
        await supabase
            .from("platform_mock_questions")
            .delete()
            .eq("id", id);
    }

    async function reorder(ids: string[]) {
        "use server";
        await Promise.all(
            ids.map((id, index) =>
                supabase
                    .from("platform_mock_questions")
                    .update({ order_index: index })
                    .eq("id", id)
            )
        );
    }

    return (
        <div className="space-y-6">
            <h1 className="text-xl font-semibold">Questions</h1>

            <PlatformMockQuestionForm onSubmit={addQuestion} />

            <QuestionList
                questions={questions || []}
                onUpdate={updateQuestion}
                onDelete={deleteQuestion}
                onReorder={reorder}
            />
        </div>
    );
}
