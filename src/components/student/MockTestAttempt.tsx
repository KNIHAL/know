"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type Question = {
    id: string;
    question: string;
    options: any; // jsonb from DB
    correct_option: string;
    marks: number;
};

export default function MockTestAttempt({
    mockTestId,
    questions = [],
}: {
    mockTestId: string;
    questions: Question[];
}) {
    const { data: session } = useSession();
    const router = useRouter();

    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [submitting, setSubmitting] = useState(false);

    // Safety: no questions
    if (!questions.length) {
        return <p>No questions available for this test.</p>;
    }

    const handleSubmit = async () => {
        if (!session?.user?.id) return;

        setSubmitting(true);

        let score = 0;
        questions.forEach((q) => {
            if (answers[q.id] === q.correct_option) {
                score += q.marks ?? 1;
            }
        });

        await supabase.from("mock_test_attempts").insert({
            student_id: session.user.id,
            mock_test_id: mockTestId,
            score,
        });

        setSubmitting(false);
        alert(`Test submitted. Score: ${score}`);
        router.replace("/student/results");
    };

    return (
        <div className="space-y-6">
            {questions.map((q, index) => {
                // 🔑 IMPORTANT FIX: parse jsonb options
                const options: string[] =
                    typeof q.options === "string"
                        ? JSON.parse(q.options)
                        : q.options;

                return (
                    <div key={q.id} className="border p-4 rounded">
                        <p className="font-medium">
                            {index + 1}. {q.question}
                        </p>

                        <div className="mt-2 space-y-1">
                            {options.map((opt) => (
                                <label key={opt} className="block cursor-pointer">
                                    <input
                                        type="radio"
                                        name={q.id}
                                        value={opt}
                                        checked={answers[q.id] === opt}
                                        onChange={() =>
                                            setAnswers((prev) => ({
                                                ...prev,
                                                [q.id]: opt,
                                            }))
                                        }
                                    />{" "}
                                    {opt}
                                </label>
                            ))}
                        </div>
                    </div>
                );
            })}

            <button
                onClick={handleSubmit}
                disabled={submitting}
                className="bg-black text-white px-6 py-2 rounded"
            >
                {submitting ? "Submitting..." : "Submit Test"}
            </button>
        </div>
    );
}
