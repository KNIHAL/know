import { supabase } from "@/lib/supabase";
import PlatformMockTestTable from "@/components/admin/PlatformMockTestTable";
import { requireAdmin } from "@/lib/guards/requireAdmin";
import { redirect } from "next/navigation";

export default async function AdminPlatformMockTestsPage() {
    const { allowed } = await requireAdmin();
    if (!allowed) redirect("/admin/not-authorized");

    const { data } = await supabase
        .from("platform_mock_tests")
        .select("id, title, duration_minutes, total_marks, is_published")
        .order("created_at", { ascending: false });

    if (!data) {
        return <p className="text-slate-400">Loading…</p>;
    }

    return (
        <div className="space-y-6">
            <h1 className="text-xl font-semibold">Platform Mock Tests</h1>
            <PlatformMockTestTable tests={data} />
        </div>
    );
}
