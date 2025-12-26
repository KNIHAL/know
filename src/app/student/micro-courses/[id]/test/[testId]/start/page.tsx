import { supabase } from "@/lib/supabase";
import MicroCourseTestAttempt from "@/components/student/MicroCourseTestAttempt";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { canAccessContent } from "@/lib/guards/canAccessContent";
import PaidContentGuard from "@/components/student/PaidContentGuard";

export default async function StartMicroCourseTest({
    params,
}: {
    params: { id: string; testId: string };
}) {
    /**
     * 1️⃣ Get micro-course ID from test
     */
    const { data: test } = await supabase
        .from("micro_course_tests")
        .select("id, micro_course_id")
        .eq("id", params.testId)
        .single();

    if (!test) {
        return <p className="text-slate-400">Test not found.</p>;
    }

    /**
     * 2️⃣ Get course price (needed for guard)
     */
    const { data: course } = await supabase
        .from("micro_courses")
        .select("id, price")
        .eq("id", test.micro_course_id)
        .single();

    if (!course) {
        return <p className="text-slate-400">Course not found.</p>;
    }

    /**
     * 3️⃣ SERVER-SIDE ACCESS CHECK (REAL SECURITY)
     */
    const { allowed } = await canAccessContent({
        contentId: course.id,
        contentType: "micro_course",
        price: course.price,
    });

    /**
     * 4️⃣ Fetch questions (safe now)
     */
    const { data: questions } = await supabase
        .from("micro_course_questions")
        .select("*")
        .eq("test_id", params.testId);

    return (
        <PaidContentGuard allowed={allowed}>
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
        </PaidContentGuard>
    );
}
