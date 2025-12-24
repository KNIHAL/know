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

    // Role check
    if (session.user.role !== "student") {
        redirect("/unauthorized");
    }

    return (
        <div className="flex min-h-screen">
            <StudentSidebar />

            {/* MAIN CONTENT AREA */}
            <main
                className="
                    flex-1 px-4 md:px-6 py-6
                    bg-gradient-to-br
                    from-[#f6f4ee]
                    via-[#f1efe9]
                    to-[#ebe7df]
                    dark:from-[#020617]
                    dark:via-[#020617]
                    dark:to-[#020617]
                "
            >
                {children}
            </main>
        </div>
    );
}
