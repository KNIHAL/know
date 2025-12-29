import { supabase } from "@/lib/supabase";
import { canAccessContent } from "@/lib/guards/canAccessContent";
import PaidContentGuard from "@/components/student/PaidContentGuard";
import MicroCourseTestAttempt from "@/components/student/MicroCourseTestAttempt";

export default async function StartMicroCourseTest({
    params,
}: {
    params: { id: string; testId: string };
}) {
    const { data: course } = await supabase
        .from("micro_courses")
        .select("id, price")
        .eq("id", params.id)
        .single();

    if (!course) {
        return <p className="text-slate-400">Course not found.</p>;
    }

    const { allowed } = await canAccessContent({
        contentId: course.id,
        contentType: "micro_course",
        price: course.price,
    });

    const { data: questions } = await supabase
        .from("micro_course_questions")
        .select("*")
        .eq("test_id", params.testId);

    return (
        <PaidContentGuard allowed={allowed}>
            <MicroCourseTestAttempt
                testId={params.testId}
                questions={questions || []}
            />
        </PaidContentGuard>
    );
}
