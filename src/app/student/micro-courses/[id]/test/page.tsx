import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default async function MicroCourseTestPage({
    params,
}: {
    params: { id: string };
}) {
    const { data: test } = await supabase
        .from("micro_course_tests")
        .select("*")
        .eq("micro_course_id", params.id)
        .single();

    if (!test) return <p>No practice test available.</p>;

    return (
        <div>
            <h1 className="text-2xl font-semibold">{test.title}</h1>

            <Link
                href={`/student/micro-courses/test/${test.id}/start`}
                className="mt-4 inline-block bg-black text-white px-4 py-2 rounded"
            >
                Start Test
            </Link>
        </div>
    );
}
