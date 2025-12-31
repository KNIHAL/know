import { getServerSession } from "next-auth";
import { authOptions } from "@/app/utils/authOptions";
import { supabase } from "@/lib/supabase";

interface GuardInput {
  contentId: string;
  price?: number | null;
}

export async function canAccessContent({
  contentId,
  price,
}: GuardInput): Promise<{ allowed: boolean }> {
  //  Free content → always allowed
  if (!price || price === 0) {
    return { allowed: true };
  }

  //  Auth required for paid content
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return { allowed: false };
  }

  //  Check if user has purchased this content
  const { data } = await supabase
    .from("student_purchases")
    .select("id")
    .eq("student_id", session.user.id)
    .eq("content_id", contentId)
    .maybeSingle();

  return { allowed: Boolean(data) };
}
