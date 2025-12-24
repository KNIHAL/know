import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default async function MicroCourseTestPage({
    params,
}: {
    params: { id: string };
}) {
    const { data: test } = await supabase
        .from("micro_course_tests")
        .select("*")
        .eq("micro_course_id", params.id)
        .single();

    if (!test) {
        return (
            <p className="text-slate-400">
                No practice test available for this micro-course.
            </p>
        );
    }

    return (
        <div className="max-w-3xl space-y-8">
            {/* Header */}
            <div>
                <Badge className="mb-3">Practice Test</Badge>
                <h1 className="text-2xl font-semibold text-white">
                    {test.title}
                </h1>
                <p className="mt-2 text-slate-400">
                    This test helps you validate your understanding of the micro-course
                    content.
                </p>
            </div>

            {/* Test Info */}
            <Card className="p-6 bg-[#0f172a]/80 border border-white/10">
                <h2 className="text-lg font-semibold text-white mb-3">
                    Test Overview
                </h2>

                <ul className="space-y-2 text-slate-300 text-sm">
                    <li>📝 Type: Internal Practice Test</li>
                    <li>⏱️ Mode: Self-paced</li>
                    <li>📊 Evaluation: Auto-evaluated</li>
                </ul>
            </Card>

            {/* CTA */}
            <div>
                <Button asChild size="lg" className="rounded-xl">
                    <Link
                        href={`/student/micro-courses/${params.id}/test/${test.id}/start`}
                    >
                        Start Practice Test
                    </Link>
                </Button>
            </div>
        </div>
    );
}
