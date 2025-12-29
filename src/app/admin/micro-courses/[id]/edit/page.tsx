import { supabase } from "@/lib/supabase";
import { redirect } from "next/navigation";
import MicroCourseForm from "@/components/admin/MicroCourseForm";
import AssetManager from "@/components/admin/AssetManager";

export default async function EditMicroCourse({
    params,
}: {
    params: { id: string };
}) {
    const { data: course } = await supabase
        .from("micro_courses")
        .select("*")
        .eq("id", params.id)
        .single();

    if (!course) redirect("/admin/micro-courses");

    const { data: assets } = await supabase
        .from("micro_course_assets")
        .select("*")
        .eq("course_id", params.id)
        .order("created_at", { ascending: true });

    return (
        <div className="space-y-10">
            <MicroCourseForm course={course} />

            <AssetManager
                courseId={params.id}
                assets={assets || []}
            />
        </div>
    );
}
