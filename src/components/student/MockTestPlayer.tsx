"use client";

import { useEffect, useRef, useState } from "react";
import { submitAttempt, saveAnswer } from "./playerActions";

export default function MockTestPlayer({
    attemptId,
    durationMinutes,
    questions,
}: {
    attemptId: string;
    durationMinutes: number;
    questions: any[];
}) {
    const totalSeconds = durationMinutes * 60;
    const [left, setLeft] = useState(totalSeconds);
    const [answers, setAnswers] = useState<Record<string, string>>({});

    // 🔒 prevent multiple submits
    const submittedRef = useRef(false);

    const safeSubmit = () => {
        if (submittedRef.current) return;
        submittedRef.current = true;
        submitAttempt(attemptId);
    };

    /* ⏱ TIMER + AUTO SUBMIT */
    useEffect(() => {
        const timer = setInterval(() => {
            setLeft((s) => {
                if (s <= 1) {
                    clearInterval(timer);
                    safeSubmit();
                    return 0;
                }
                return s - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [attemptId]);

    /* 🚫 TAB SWITCH / WINDOW BLUR */
    useEffect(() => {
        const handleBlur = () => {
            alert("Warning: Tab switching detected. Test will be submitted.");
            safeSubmit();
        };

        window.addEventListener("blur", handleBlur);
        return () => window.removeEventListener("blur", handleBlur);
    }, [attemptId]);

    /* 🔄 REFRESH / CLOSE / BACK BUTTON */
    useEffect(() => {
        const beforeUnload = (e: BeforeUnloadEvent) => {
            e.preventDefault();
            e.returnValue = "";
            safeSubmit();
        };

        window.addEventListener("beforeunload", beforeUnload);
        return () => window.removeEventListener("beforeunload", beforeUnload);
    }, [attemptId]);

    return (
        <div className="space-y-6">
            {/* Timer */}
            <div className="text-sm text-slate-300">
                Time Left: {Math.floor(left / 60)}:
                {String(left % 60).padStart(2, "0")}
            </div>

            {/* Questions */}
            {questions.map((q: any) => (
                <div key={q.id} className="border border-white/10 p-4 rounded-lg">
                    <div className="font-medium text-white mb-2">
                        {q.question}
                    </div>

                    {Object.entries(q.options).map(([k, v]: any) => (
                        <label
                            key={k}
                            className="block mt-2 text-sm text-slate-300 cursor-pointer"
                        >
                            <input
                                type="radio"
                                name={q.id}
                                className="mr-2"
                                checked={answers[q.id] === k}
                                onChange={() => {
                                    setAnswers((a) => ({ ...a, [q.id]: k }));
                                    saveAnswer(attemptId, q.id, k);
                                }}
                            />
                            {k}. {v}
                        </label>
                    ))}
                </div>
            ))}
        </div>
    );
}
