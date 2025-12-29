"use server";

import { supabase } from "@/lib/supabase";

export async function togglePlatformMockTestPublish(
  testId: string,
  publish: boolean
) {
  if (publish) {
    const { count } = await supabase
      .from("platform_mock_questions")
      .select("*", { count: "exact", head: true })
      .eq("mock_test_id", testId);

    if (!count || count === 0) {
      throw new Error("Add at least one question before publishing.");
    }
  }

  const { error } = await supabase
    .from("platform_mock_tests")
    .update({ is_published: publish })
    .eq("id", testId);

  if (error) throw new Error(error.message);
}
