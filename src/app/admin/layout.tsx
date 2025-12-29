import { ReactNode } from "react";
import { requireAdmin } from "@/lib/guards/requireAdmin";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopbar from "@/components/admin/AdminTopbar";
import { redirect } from "next/navigation";

export default async function AdminLayout({
    children,
}: {
    children: ReactNode;
}) {
    const { allowed } = await requireAdmin();

    if (!allowed) {
        redirect("/admin/not-authorized");
    }

    return (
        <div className="flex min-h-screen bg-[#020617] text-white">
            <div className="hidden lg:block">
                <AdminSidebar />
            </div>

            <div className="flex-1 flex flex-col">
                <AdminTopbar />
                <main className="p-4 sm:p-6">{children}</main>
            </div>
        </div>

    );
}
