import { supabase } from "@/lib/supabase";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { togglePlatformMockTestPublish } from "../../actions";

export default async function ReviewMockTest({
    params,
}: {
    params: { id: string };
}) {
    const { data: test } = await supabase
        .from("platform_mock_tests")
        .select("id, title, duration_minutes, total_marks, is_published")
        .eq("id", params.id)
        .single();

    if (!test) redirect("/admin/platform-mock-tests");

    const { count } = await supabase
        .from("platform_mock_questions")
        .select("*", { count: "exact", head: true })
        .eq("mock_test_id", params.id);

    return (
        <div className="max-w-xl space-y-6">
            <h1 className="text-2xl font-semibold">Review Mock Test</h1>

            <div className="text-slate-300 space-y-1">
                <p><b>Title:</b> {test.title}</p>
                <p><b>Duration:</b> {test.duration_minutes} minutes</p>
                <p><b>Total Marks:</b> {test.total_marks}</p>
                <p><b>Questions:</b> {count || 0}</p>
                <p><b>Status:</b> {test.is_published ? "Published" : "Draft"}</p>
            </div>

            <form
                action={async () => {
                    "use server";
                    await togglePlatformMockTestPublish(test.id, !test.is_published);
                }}
            >
                <Button>
                    {test.is_published ? "Unpublish" : "Publish"}
                </Button>
            </form>
        </div>
    );
}
