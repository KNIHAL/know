"use server";

import { supabase } from "@/lib/supabase";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/utils/authOptions";

export async function startAttempt(mockTestId: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("Unauthorized");

  // prevent duplicate active attempt
  const { data: existing } = await supabase
    .from("mock_test_attempts")
    .select("id")
    .eq("student_id", session.user.id)
    .eq("mock_test_id", mockTestId)
    .is("submitted_at", null)
    .maybeSingle();

  if (existing) return existing;

  const { data } = await supabase
    .from("mock_test_attempts")
    .insert({
      student_id: session.user.id,
      mock_test_id: mockTestId,
      started_at: new Date().toISOString(),
      answers: {},
    })
    .select("id")
    .single();

  return data;
}
