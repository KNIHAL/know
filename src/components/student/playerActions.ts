"use server";

import { supabase } from "@/lib/supabase";

export async function saveAnswer(
  attemptId: string,
  questionId: string,
  option: string
) {
  await supabase.from("mock_test_answers").upsert({
    attempt_id: attemptId,
    question_id: questionId,
    selected_option: option,
  });
}

export async function submitAttempt(
  mockTestId: string,
  answers: Record<string, string>
) {
  const { data: qs } = await supabase
    .from("platform_mock_questions")
    .select("id, correct_option, marks")
    .eq("mock_test_id", mockTestId);

  let score = 0;
  qs?.forEach((q) => {
    if (answers[q.id] === q.correct_option) score += q.marks;
  });

  await supabase.from("mock_test_attempts").insert({
    mock_test_id: mockTestId,
    score,
  });
}
