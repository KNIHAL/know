"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function PlatformMockQuestionForm({
    onSubmit,
}: {
    onSubmit: (data: any) => Promise<void>;
}) {
    const [q, setQ] = useState({
        question: "",
        optionA: "",
        optionB: "",
        optionC: "",
        optionD: "",
        correct_option: "A",
        marks: 1,
    });

    return (
        <form
            className="space-y-4 border border-white/10 p-4 rounded-lg"
            onSubmit={(e) => {
                e.preventDefault();

                onSubmit({
                    question: q.question,
                    options: {
                        A: q.optionA,
                        B: q.optionB,
                        C: q.optionC,
                        D: q.optionD,
                    },
                    correct_option: q.correct_option,
                    marks: q.marks,
                });

                setQ({
                    question: "",
                    optionA: "",
                    optionB: "",
                    optionC: "",
                    optionD: "",
                    correct_option: "A",
                    marks: 1,
                });
            }}
        >
            <Textarea
                placeholder="Question"
                value={q.question}
                onChange={(e) => setQ({ ...q, question: e.target.value })}
            />

            <Input
                placeholder="Option A"
                value={q.optionA}
                onChange={(e) => setQ({ ...q, optionA: e.target.value })}
            />
            <Input
                placeholder="Option B"
                value={q.optionB}
                onChange={(e) => setQ({ ...q, optionB: e.target.value })}
            />
            <Input
                placeholder="Option C"
                value={q.optionC}
                onChange={(e) => setQ({ ...q, optionC: e.target.value })}
            />
            <Input
                placeholder="Option D"
                value={q.optionD}
                onChange={(e) => setQ({ ...q, optionD: e.target.value })}
            />

            <Input
                placeholder="Correct Option (A/B/C/D)"
                value={q.correct_option}
                onChange={(e) =>
                    setQ({ ...q, correct_option: e.target.value.toUpperCase() })
                }
            />

            <Input
                type="number"
                placeholder="Marks"
                value={q.marks}
                onChange={(e) =>
                    setQ({ ...q, marks: Number(e.target.value) })
                }
            />

            <Button type="submit">Add Question</Button>
        </form>
    );
}
