import MicroCourseForm from "@/components/admin/MicroCourseForm";
import { supabase } from "@/lib/supabase";
import { redirect } from "next/navigation";

export default async function EditMicroCourse({
    params,
}: {
    params: { id: string };
}) {
    const { data } = await supabase
        .from("micro_courses")
        .select("*")
        .eq("id", params.id)
        .single();

    async function updateCourse(updated: any) {
        "use server";
        await supabase
            .from("micro_courses")
            .update(updated)
            .eq("id", params.id);

        redirect("/admin/micro-courses");
    }

    return (
        <div className="max-w-3xl">
            <h1 className="text-xl font-semibold mb-4">Edit Micro-Course</h1>
            <MicroCourseForm initialData={data} onSubmit={updateCourse} />
        </div>
    );
}
