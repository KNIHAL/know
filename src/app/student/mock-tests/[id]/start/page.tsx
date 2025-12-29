import { supabase } from "@/lib/supabase";
import MockTestPlayer from "@/components/student/MockTestPlayer";
import { canAccessContent } from "@/lib/guards/canAccessContent";
import PaidContentGuard from "@/components/student/PaidContentGuard";
import BuyNowButton from "@/components/student/BuyNowButton";

export default async function StartMockTest({
    params,
}: {
    params: { id: string };
}) {
    const { data: test } = await supabase
        .from("platform_mock_tests")
        .select("id, title, duration_minutes, is_published, price")
        .eq("id", params.id)
        .eq("is_published", true)
        .single();

    if (!test) {
        return <p className="text-slate-400">Mock test not available.</p>;
    }

    const { allowed } = await canAccessContent({
        contentId: test.id,
        contentType: "platform_mock_test",
        price: test.price,
    });

    const { data: questions } = await supabase
        .from("platform_mock_questions")
        .select("id, question, options")
        .eq("mock_test_id", test.id);

    return (
        <PaidContentGuard
            allowed={allowed}
            fallback={
                <BuyNowButton
                    price={test.price}
                    contentId={test.id}
                    contentType="platform_mock_test"
                />
            }
        >
            <MockTestPlayer
                mockTestId={test.id}
                durationMinutes={test.duration_minutes}
                questions={questions || []}
            />
        </PaidContentGuard>
    );
}
