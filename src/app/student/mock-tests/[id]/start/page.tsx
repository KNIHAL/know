import { supabase } from "@/lib/supabase";
import MockTestAttempt from "@/components/student/MockTestAttempt";
import { Card } from "@/components/ui/card";

export default async function StartMockTest({ params }: any) {
    const { data: questions } = await supabase
        .from("platform_mock_questions")
        .select("*")
        .eq("mock_test_id", params.id);

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-semibold text-white">
                    Platform Mock Test
                </h1>
                <p className="text-slate-400 mt-1">
                    This test affects your rank and percentile. Attempt carefully.
                </p>
            </div>

            {/* Test Container */}
            <Card className="p-6 bg-[#0f172a]/80 border border-white/10">
                <MockTestAttempt
                    mockTestId={params.id}
                    questions={questions || []}
                />
            </Card>
        </div>
    );
}
