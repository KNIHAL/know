import { getServerSession } from "next-auth";
import { authOptions } from "@/app/utils/authOptions";
import { supabase } from "@/lib/supabase";

export async function requireAdmin() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return { allowed: false };
  }

  const { data: user } = await supabase
    .from("users")
    .select("role")
    .eq("id", session.user.id)
    .single();

  if (!user || user.role !== "admin") {
    return { allowed: false };
  }

  return { allowed: true };
}
