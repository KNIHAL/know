import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default async function MicroCourseDetail({
    params,
}: {
    params: { id: string };
}) {
    const { data } = await supabase
        .from("micro_courses")
        .select("*")
        .eq("id", params.id)
        .single();

    if (!data) return <p>Course not found.</p>;

    return (
        <div>
            <h1 className="text-2xl font-semibold">{data.title}</h1>
            <p className="mt-2 text-gray-600">{data.description}</p>

            <div className="mt-6 space-y-2">
                <p>📄 Notes (PDF)</p>
                <p>📊 PPT Slides</p>
                <p>🧪 Quiz</p>
                <p>📝 Internal Practice Test (Teacher)</p>
            </div>


            <Link
                href={`/student/micro-courses/${params.id}/test`}
                className="inline-block mt-4 bg-black text-white px-4 py-2 rounded"
            >
                Start Practice Test
            </Link>
        </div>
    );
}
