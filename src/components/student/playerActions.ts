"use server";

import { supabase } from "@/lib/supabase";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/utils/authOptions";

/**
 * Save / update a single answer while test is running
 */
export async function saveAnswer(
  attemptId: string,
  questionId: string,
  selectedOption: string
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  // Get existing answers
  const { data: attempt } = await supabase
    .from("mock_test_attempts")
    .select("answers")
    .eq("id", attemptId)
    .single();

  const updatedAnswers = {
    ...(attempt?.answers || {}),
    [questionId]: selectedOption,
  };

  await supabase
    .from("mock_test_attempts")
    .update({ answers: updatedAnswers })
    .eq("id", attemptId);
}

/**
 * Auto-submit OR manual submit of test
 * Calculates score server-side (secure)
 */
export async function submitAttempt(
  attemptId: string
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  // Get attempt data
  const { data: attempt } = await supabase
    .from("mock_test_attempts")
    .select("mock_test_id, started_at, answers")
    .eq("id", attemptId)
    .single();

  if (!attempt) {
    throw new Error("Attempt not found");
  }

  // Get all questions of this mock test
  const { data: questions } = await supabase
    .from("platform_mock_questions")
    .select("id, correct_option, marks")
    .eq("mock_test_id", attempt.mock_test_id);

  let score = 0;

  for (const q of questions || []) {
    if (attempt.answers?.[q.id] === q.correct_option) {
      score += q.marks;
    }
  }

  const startedAt = new Date(attempt.started_at).getTime();
  const submittedAt = Date.now();

  await supabase
    .from("mock_test_attempts")
    .update({
      score,
      submitted_at: new Date(submittedAt).toISOString(),
      time_taken_seconds: Math.floor(
        (submittedAt - startedAt) / 1000
      ),
    })
    .eq("id", attemptId);
}
