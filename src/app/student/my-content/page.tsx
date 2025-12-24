import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { supabase } from "@/lib/supabase";

export default async function MyContentPage() {
    const session = await getServerSession(authOptions);

    const { data } = await supabase
        .from("student_purchases")
        .select(`
      content_id,
      content_type,
      micro_courses ( title )
    `)
        .eq("student_id", session!.user.id);

    return (
        <div>
            <h1 className="text-2xl font-semibold mb-4">My Content</h1>

            {!data || data.length === 0 ? (
                <p>No content purchased yet.</p>
            ) : (
                <ul className="space-y-2">
                    {data.map((c: any, i: number) => (
                        <li key={i} className="border p-3 rounded">
                            {c.micro_courses?.[0]?.title ?? "Content"}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
