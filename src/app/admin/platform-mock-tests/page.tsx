import { requireAdmin } from "@/lib/guards/requireAdmin";
import { supabase } from "@/lib/supabase";
import PlatformMockTestTable from "@/components/admin/PlatformMockTestTable";
import { redirect } from "next/navigation";

export default async function AdminPlatformMockTests() {
    const { allowed } = await requireAdmin();
    if (!allowed) redirect("/admin/not-authorized");

    const { data } = await supabase
        .from("platform_mock_tests")
        .select("*")
        .order("created_at", { ascending: false });

    async function togglePublish(id: string, value: boolean) {
        "use server";
        await supabase
            .from("platform_mock_tests")
            .update({ is_published: value })
            .eq("id", id);
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Platform Mock Tests</h1>
                <a
                    href="/admin/platform-mock-tests/new"
                    className="rounded-md bg-white text-black px-4 py-2 text-sm"
                >
                    + New Mock Test
                </a>
            </div>

            <PlatformMockTestTable
                tests={data || []}
                onToggle={togglePublish}
            />
        </div>
    );
}
