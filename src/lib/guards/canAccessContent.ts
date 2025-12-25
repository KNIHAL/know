import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { supabase } from "@/lib/supabase";

type ContentType = "micro_course" | "platform_mock_test";

interface GuardInput {
  contentId: string;
  contentType: ContentType;
  price?: number | null;
}

export async function canAccessContent({
  contentId,
  contentType,
  price,
}: GuardInput): Promise<{ allowed: boolean }> {
  // Free content → always allowed
  if (!price || price === 0) {
    return { allowed: true };
  }

  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return { allowed: false };
  }

  const { data } = await supabase
    .from("student_purchases")
    .select("id")
    .eq("student_id", session.user.id)
    .eq("content_id", contentId)
    .eq("content_type", contentType)
    .maybeSingle();

  return { allowed: !!data };
}
