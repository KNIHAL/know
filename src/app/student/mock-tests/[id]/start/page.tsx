import { supabase } from "@/lib/supabase";
import MockTestAttempt from "@/components/student/MockTestAttempt";

export default async function StartMockTest({ params }: any) {
    const { data: questions } = await supabase
        .from("platform_mock_questions")
        .select("*")
        .eq("mock_test_id", params.id);

    return (
        <MockTestAttempt
            mockTestId={params.id}
            questions={questions || []}
        />
    );
}
