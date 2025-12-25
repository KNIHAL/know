import { supabase } from "@/lib/supabase";
import { canAccessContent } from "@/lib/guards/canAccessContent";
import PaidContentGuard from "@/components/student/PaidContentGuard";

export default async function MockTestStartPage({
    params,
}: {
    params: { id: string };
}) {
    const { data: test } = await supabase
        .from("platform_mock_tests")
        .select("*")
        .eq("id", params.id)
        .single();

    if (!test) {
        return <p className="text-slate-400">Mock test not found.</p>;
    }

    const { allowed } = await canAccessContent({
        contentId: test.id,
        contentType: "platform_mock_test",
        price: test.price ?? 0, // agar future me paid hua
    });

    return (
        <PaidContentGuard allowed={allowed} price={test.price}>
            {/* EXISTING TEST START UI */}
            <div>
                <h1 className="text-xl font-semibold text-white">
                    {test.title}
                </h1>

                {/* Test engine yahin se start hoga */}
            </div>
        </PaidContentGuard>
    );
}
