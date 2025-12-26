import PlatformMockTestForm from "@/components/admin/PlatformMockTestForm";
import { supabase } from "@/lib/supabase";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/guards/requireAdmin";

export default async function EditPlatformMockTest({
    params,
}: {
    params: { id: string };
}) {
    const { allowed } = await requireAdmin();
    if (!allowed) redirect("/admin/not-authorized");

    const { data } = await supabase
        .from("platform_mock_tests")
        .select("*")
        .eq("id", params.id)
        .single();

    if (!data) {
        return <p className="text-slate-400">Mock test not found</p>;
    }

    async function updateTest(updated: any) {
        "use server";

        await supabase
            .from("platform_mock_tests")
            .update(updated)
            .eq("id", params.id);

        redirect("/admin/platform-mock-tests");
    }

    return (
        <div className="max-w-3xl space-y-4">
            <h1 className="text-xl font-semibold">Edit Platform Mock Test</h1>
            <PlatformMockTestForm initial={data} onSubmit={updateTest} />
        </div>
    );
}
