import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { canAccessContent } from "@/lib/guards/canAccessContent";
import PaidContentGuard from "@/components/student/PaidContentGuard";
import BuyNowButton from "@/components/student/BuyNowButton";

export default async function MicroCourseDetail({
    params,
}: {
    params: { id: string };
}) {
    const { data } = await supabase
        .from("micro_courses")
        .select("*")
        .eq("id", params.id)
        .single();

    if (!data) {
        return <p className="text-slate-400">Course not found.</p>;
    }

    // 🔐 SERVER-SIDE ACCESS CHECK
    const { allowed } = await canAccessContent({
        contentId: data.id,
        contentType: "micro_course",
        price: data.price,
    });

    return (
        <PaidContentGuard
            allowed={allowed}
            fallback={
                <BuyNowButton
                    price={data.price}
                    contentId={data.id}
                    contentType="micro_course"
                />
            }
        >
            <div className="max-w-4xl space-y-8">
                {/* Header */}
                <div>
                    <Badge className="mb-3">Micro-Course</Badge>
                    <h1 className="text-2xl font-semibold text-white">
                        {data.title}
                    </h1>
                    <p className="mt-2 text-slate-400">
                        {data.description}
                    </p>
                </div>

                {/* What’s inside */}
                <Card className="p-6 bg-[#0f172a]/80 border border-white/10">
                    <h2 className="text-lg font-semibold text-white mb-4">
                        What’s included
                    </h2>

                    <ul className="space-y-2 text-slate-300 text-sm">
                        <li>📄 Notes (PDF)</li>
                        <li>📊 PPT Slides</li>
                        <li>🧪 Quizzes</li>
                        <li>📝 Internal Practice Test</li>
                    </ul>
                </Card>

                {/* CTA */}
                <div>
                    <Button asChild size="lg" className="rounded-xl">
                        <Link href={`/student/micro-courses/${params.id}/test`}>
                            Start Practice Test
                        </Link>
                    </Button>
                </div>
            </div>
        </PaidContentGuard>
    );
}
