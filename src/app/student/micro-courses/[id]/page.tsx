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
    const { data: course } = await supabase
        .from("micro_courses")
        .select("*")
        .eq("id", params.id)
        .eq("is_published", true)
        .single();

    if (!course) {
        return <p className="text-slate-400">This micro-course is not available.</p>;
    }

    const { allowed } = await canAccessContent({
        contentId: course.id,
        price: course.price,
    });

    const { data: assets } = await supabase
        .from("micro_course_assets")
        .select("id, type, title, url")
        .eq("course_id", course.id)
        .order("created_at", { ascending: true });

    return (
        <PaidContentGuard
            allowed={allowed}
            fallback={
                <BuyNowButton
                    price={course.price}
                    contentId={course.id}
                />
            }
        >
            <div className="max-w-4xl space-y-10">
                {/* Header */}
                <div>
                    <Badge className="mb-3">Micro-Course</Badge>
                    <h1 className="text-2xl font-semibold text-white">{course.title}</h1>
                    <p className="mt-2 text-slate-400">{course.description}</p>
                </div>

                {/* Assets */}
                <Card className="p-6 bg-[#0f172a]/80 border border-white/10 space-y-4">
                    <h2 className="text-lg font-semibold text-white">Course Content</h2>

                    {!assets?.length && (
                        <p className="text-slate-400 text-sm">
                            Content will be added soon.
                        </p>
                    )}

                    {assets?.map((a) => (
                        <div
                            key={a.id}
                            className="flex items-center justify-between p-3 border border-white/10 rounded"
                        >
                            <div>
                                <p className="text-white text-sm">{a.title}</p>
                                <p className="text-xs text-slate-400 uppercase">{a.type}</p>
                            </div>

                            <a
                                href={a.url}
                                target="_blank"
                                className="text-blue-400 text-sm hover:underline"
                            >
                                Open
                            </a>
                        </div>
                    ))}
                </Card>

            </div>
        </PaidContentGuard>
    );
}
