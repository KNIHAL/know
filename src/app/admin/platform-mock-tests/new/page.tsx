import PlatformMockTestForm from "@/components/admin/PlatformMockTestForm";
import { supabase } from "@/lib/supabase";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/guards/requireAdmin";

export default async function NewPlatformMockTest() {
    const { allowed } = await requireAdmin();
    if (!allowed) redirect("/admin/not-authorized");

    async function createTest(data: any) {
        "use server";

        await supabase.from("platform_mock_tests").insert({
            ...data,
            is_published: false,
        });

        redirect("/admin/platform-mock-tests");
    }

    return (
        <div className="max-w-3xl space-y-4">
            <h1 className="text-xl font-semibold">Create Platform Mock Test</h1>
            <PlatformMockTestForm onSubmit={createTest} />
        </div>
    );
}
