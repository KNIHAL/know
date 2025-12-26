import { requireAdmin } from "@/lib/guards/requireAdmin";
import { supabase } from "@/lib/supabase";
import MicroCourseTable from "@/components/admin/MicroCourseTable";
import { redirect } from "next/navigation";

export default async function AdminMicroCourses() {
    const { allowed } = await requireAdmin();
    if (!allowed) redirect("/admin/not-authorized");

    const { data } = await supabase
        .from("micro_courses")
        .select("*")
        .order("created_at", { ascending: false });

    async function togglePublish(id: string, value: boolean) {
        "use server";
        await supabase
            .from("micro_courses")
            .update({ is_published: value })
            .eq("id", id);
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Micro-Courses</h1>
                <a
                    href="/admin/micro-courses/new"
                    className="rounded-md bg-white text-black px-4 py-2 text-sm"
                >
                    + New Course
                </a>
            </div>

            <MicroCourseTable
                courses={data || []}
                onToggle={togglePublish}
            />
        </div>
    );
}
