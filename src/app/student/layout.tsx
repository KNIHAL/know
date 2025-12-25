import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import StudentSidebar from "@/components/student/StudentSidebar";
import { authOptions } from "@/app/utils/authOptions";

export default async function StudentLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession(authOptions);

    if (!session) redirect("/login");
    if (session.user.role !== "student") redirect("/unauthorized");

    return (
        <div className="flex min-h-screen bg-gradient-to-br
      from-[#0b1220] via-[#0b1220] to-[#020617]
      dark:from-[#020617] dark:via-[#020617] dark:to-black">
            <StudentSidebar />
            <main className="flex-1 p-6 md:p-10">{children}</main>
        </div>
    );
}
