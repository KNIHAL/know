import MicroCourseForm from "@/components/admin/MicroCourseForm";
import { supabase } from "@/lib/supabase";
import { redirect } from "next/navigation";

export default function NewMicroCourse() {
    async function createCourse(data: any) {
        "use server";
        await supabase.from("micro_courses").insert(data);
        redirect("/admin/micro-courses");
    }

    return (
        <div className="max-w-3xl">
            <h1 className="text-xl font-semibold mb-4">Create Micro-Course</h1>
            <MicroCourseForm onSubmit={createCourse} />
        </div>
    );
}
