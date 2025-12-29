import { supabase } from "@/lib/supabase";
import MicroCourseTable from "@/components/admin/MicroCourseTable";

export default async function AdminMicroCoursesPage() {
    const { data } = await supabase
        .from("micro_courses")
        .select("id, title, price, is_published")
        .order("created_at", { ascending: false });

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

            <MicroCourseTable courses={data || []} />
        </div>
    );
}
