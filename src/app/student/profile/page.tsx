import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { supabase } from "@/lib/supabase";
import StudentProfileForm from "@/components/student/StudentProfileForm";

export default async function StudentProfilePage() {
    const session = await getServerSession(authOptions);

    const { data: profile } = await supabase
        .from("student_profiles")
        .select("*")
        .eq("id", session!.user.id)
        .maybeSingle(); // 🔥 FIX

    return (
        <div className="max-w-xl">
            <h1 className="text-2xl font-semibold mb-4">My Profile</h1>

            <StudentProfileForm
                user={session!.user}
                profile={profile}
            />
        </div>
    );
}
