import { supabase } from "@/lib/supabase";
import MicroCourseTestAttempt from "@/components/student/MicroCourseTestAttempt";

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
        <MicroCourseTestAttempt
            testId={params.testId}
            questions={questions || []}
        />
    );
}
