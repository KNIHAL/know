import { supabase } from "@/lib/supabase";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import { canAccessContent } from "@/lib/guards/canAccessContent";
import PaidContentGuard from "@/components/student/PaidContentGuard";
import BuyNowButton from "@/components/student/BuyNowButton";

export default async function PlatformMockTestDetail({
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

    // 🔐 SERVER-SIDE ACCESS CHECK
    const { allowed } = await canAccessContent({
        contentId: test.id,
        contentType: "platform_mock_test",
        price: test.price, // ensure this column exists (or treat 0 as free)
    });

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
            <div className="max-w-4xl space-y-8">
                {/* Header */}
                <div>
                    <Badge className="mb-3">Platform Mock Test</Badge>
                    <h1 className="text-2xl font-semibold text-white">
                        {test.title}
                    </h1>
                    <p className="mt-2 text-slate-400">
                        {test.description}
                    </p>
                </div>

                {/* Meta */}
                <Card className="p-6 bg-[#0f172a]/80 border border-white/10">
                    <ul className="space-y-2 text-slate-300 text-sm">
                        <li>⏱ Duration: {test.duration_minutes} minutes</li>
                        <li>🧮 Total Marks: {test.total_marks}</li>
                        <li>🏆 Used for rankings & percentile</li>
                    </ul>
                </Card>

                {/* CTA */}
                <div>
                    <Button asChild size="lg" className="rounded-xl">
                        <Link href={`/student/mock-tests/${params.id}/start`}>
                            Start Mock Test
                        </Link>
                    </Button>
                </div>
            </div>
        </PaidContentGuard>
    );
}
