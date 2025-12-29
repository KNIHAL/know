"use server";

import { supabase } from "@/lib/supabase";

export async function toggleMicroCoursePublish(
  courseId: string,
  publish: boolean
) {
  const { error } = await supabase
    .from("micro_courses")
    .update({ is_published: publish })
    .eq("id", courseId);

  if (error) throw new Error(error.message);
}
