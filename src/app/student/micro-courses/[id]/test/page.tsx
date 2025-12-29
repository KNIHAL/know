import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default async function MicroCourseTests({
    params,
}: {
    params: { id: string };
}) {
    const { data: tests } = await supabase
        .from("micro_course_tests")
        .select("id, title")
        .eq("micro_course_id", params.id);

    if (!tests || tests.length === 0) {
        return (
            <p className="text-slate-400">
                No practice tests available for this course.
            </p>
        );
    }

    return (
        <div className="max-w-4xl space-y-6">
            <h1 className="text-xl font-semibold text-white">
                Practice Tests
            </h1>

            {tests.map((t) => (
                <Card
                    key={t.id}
                    className="p-5 flex items-center justify-between
                     bg-[#0f172a]/80 border border-white/10"
                >
                    <p className="text-white">{t.title}</p>

                    <Link href={`/student/micro-courses/${params.id}/test/${t.id}/start`}>
                        <Button size="sm">Start Test</Button>
                    </Link>
                </Card>
            ))}
        </div>
    );
}
