"use client";

import { useEffect, useState } from "react";
import { submitAttempt, saveAnswer } from "./playerActions";

type Question = {
    id: string;
    question: string;
    options: Record<string, string>;
};

export default function MockTestPlayer({
    mockTestId,
    durationMinutes,
    questions,
}: {
    mockTestId: string;
    durationMinutes: number;
    questions: Question[];
}) {
    const totalSeconds = durationMinutes * 60;
    const [timeLeft, setTimeLeft] = useState(totalSeconds);
    const [answers, setAnswers] = useState<Record<string, string>>({});

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((t) => {
                if (t <= 1) {
                    clearInterval(timer);
                    submitAttempt(mockTestId, answers);
                    return 0;
                }
                return t - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [mockTestId, answers]);

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="text-sm text-slate-300">
                Time Left: {Math.floor(timeLeft / 60)}:
                {String(timeLeft % 60).padStart(2, "0")}
            </div>

            {questions.map((q, idx) => (
                <div key={q.id} className="border border-white/10 p-4 rounded">
                    <p className="text-white font-medium mb-2">
                        Q{idx + 1}. {q.question}
                    </p>

                    {Object.entries(q.options).map(([k, v]) => (
                        <label key={k} className="block text-slate-300 mt-1">
                            <input
                                type="radio"
                                name={q.id}
                                checked={answers[q.id] === k}
                                onChange={() => {
                                    setAnswers((a) => ({ ...a, [q.id]: k }));
                                    saveAnswer(mockTestId, q.id, k);
                                }}
                            />{" "}
                            {k}. {v}
                        </label>
                    ))}
                </div>
            ))}
        </div>
    );
}
