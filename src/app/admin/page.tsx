import { supabase } from "@/lib/supabase";
import MicroCourseTable from "@/components/admin/MicroCourseTable";

export default async function AdminMicroCoursesPage() {
    const { data } = await supabase
        .from("micro_courses")
        .select("id, title, price, is_published")
        .order("created_at", { ascending: false });

    return (
        <div className="space-y-6">
            <h1 className="text-xl font-semibold">Micro-Courses</h1>
            <MicroCourseTable courses={data || []} />
        </div>
    );
}
