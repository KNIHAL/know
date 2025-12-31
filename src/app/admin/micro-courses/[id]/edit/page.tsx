import { supabase } from "@/lib/supabase";
import { redirect } from "next/navigation";
import PaidContentGuard from "@/components/student/PaidContentGuard";
import BuyNowButton from "@/components/student/BuyNowButton";
import { canAccessContent } from "@/lib/guards/canAccessContent";

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

    if (!course) redirect("/student/micro-courses");

    const { allowed } = await canAccessContent({
        contentId: course.id,
        contentType: "micro_course",
        price: course.price,
    });

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
            <div className="max-w-4xl space-y-6">
                <h1 className="text-2xl font-semibold text-white">
                    {course.title}
                </h1>

                <p className="text-slate-400">
                    {course.description}
                </p>

                {course.video_url && (
                    <a
                        href={course.video_url}
                        target="_blank"
                        className="text-blue-400 underline"
                    >
                        Watch Video
                    </a>
                )}

                {course.notes && (
                    <a
                        href={course.notes}
                        target="_blank"
                        className="text-blue-400 underline"
                    >
                        Open Notes
                    </a>
                )}

                {course.ppt_url && (
                    <a
                        href={course.ppt_url}
                        target="_blank"
                        className="text-blue-400 underline"
                    >
                        Open PPT
                    </a>
                )}
            </div>
        </PaidContentGuard>
    );
}
