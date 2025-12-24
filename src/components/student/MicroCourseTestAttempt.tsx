"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function MicroCourseTestAttempt({
    testId,
    questions,
}: any) {
    const { data: session } = useSession();
    const router = useRouter();

    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [submitting, setSubmitting] = useState(false);

    if (!questions.length) {
        return <p>No questions found.</p>;
    }

    const handleSubmit = async () => {
        setSubmitting(true);

        let score = 0;
        questions.forEach((q: any) => {
            if (answers[q.id] === q.correct_option) {
                score += q.marks ?? 1;
            }
        });

        await supabase.from("micro_course_attempts").insert({
            student_id: session!.user.id,
            test_id: testId,
            score,
        });

        setSubmitting(false);
        alert(`Practice test completed. Score: ${score}`);
        router.back();
    };

    return (
        <div className="space-y-6">
            {questions.map((q: any, index: number) => {
                const options =
                    typeof q.options === "string"
                        ? JSON.parse(q.options)
                        : q.options;

                return (
                    <div key={q.id} className="border p-4 rounded">
                        <p className="font-medium">
                            {index + 1}. {q.question}
                        </p>

                        {options.map((opt: string) => (
                            <label key={opt} className="block">
                                <input
                                    type="radio"
                                    name={q.id}
                                    value={opt}
                                    checked={answers[q.id] === opt}
                                    onChange={() =>
                                        setAnswers((a) => ({ ...a, [q.id]: opt }))
                                    }
                                />{" "}
                                {opt}
                            </label>
                        ))}
                    </div>
                );
            })}

            <button
                onClick={handleSubmit}
                disabled={submitting}
                className="bg-black text-white px-6 py-2 rounded"
            >
                {submitting ? "Submitting..." : "Submit Practice Test"}
            </button>
        </div>
    );
}
