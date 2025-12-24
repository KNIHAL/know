import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import StudentSidebar from "@/components/student/StudentSidebar";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function StudentLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession(authOptions);

    // Not logged in
    if (!session) {
        redirect("/login");
    }

    // Role check (VERY IMPORTANT)
    if (session.user.role !== "student") {
        redirect("/unauthorized");
    }

    return (
        <div className="flex min-h-screen">
            <StudentSidebar />
            <main className="flex-1 bg-gray-50 p-6">{children}</main>
        </div>
    );
}
