import { supabase } from "@/lib/supabase";
import MicroCourseTestAttempt from "@/components/student/MicroCourseTestAttempt";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function StartMicroCourseTest({
    params,
}: {
    params: { testId: string };
}) {
    const { data: questions } = await supabase
        .from("micro_course_questions")
        .select("*")
        .eq("test_id", params.testId);

    return (
        <div className="max-w-4xl space-y-6">
            {/* Header */}
            <div>
                <Badge className="mb-3">Practice Test</Badge>
                <h1 className="text-2xl font-semibold text-white">
                    Micro-Course Practice Test
                </h1>
                <p className="mt-2 text-slate-400">
                    Attempt the questions below. This test is for practice only and does
                    not affect rankings.
                </p>
            </div>

            {/* Test Container */}
            <Card className="p-6 bg-[#0f172a]/80 border border-white/10">
                <MicroCourseTestAttempt
                    testId={params.testId}
                    questions={questions || []}
                />
            </Card>
        </div>
    );
}
