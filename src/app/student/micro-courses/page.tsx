import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default async function MicroCoursesPage() {
    const { data } = await supabase
        .from("micro_courses")
        .select("*")
        .order("created_at", { ascending: false });

    return (
        <div>
            <h1 className="text-2xl font-semibold mb-4">Micro-Courses</h1>

            <div className="space-y-4">
                {data?.map((c: any) => (
                    <div key={c.id} className="border p-4 rounded">
                        <h2 className="font-medium">{c.title}</h2>
                        <p className="text-sm text-gray-600">{c.description}</p>

                        <Link
                            href={`/student/micro-courses/${c.id}`}
                            className="inline-block mt-2 text-sm underline"
                        >
                            View Course
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
