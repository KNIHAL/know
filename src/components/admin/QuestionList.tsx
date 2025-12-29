"use client";

import { useState, useTransition } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type Question = {
    id: string;
    question: string;
    options: Record<string, string>;
    correct_option: string;
    marks: number;
};

export default function QuestionList({
    mockTestId,
    questions,
}: {
    mockTestId: string;
    questions: Question[];
}) {
    const [list, setList] = useState<Question[]>(questions);
    const [pending, start] = useTransition();
    const [form, setForm] = useState({
        question: "",
        options: { A: "", B: "", C: "", D: "" },
        correct_option: "A",
        marks: 1,
    });

    function updateOption(key: string, value: string) {
        setForm({
            ...form,
            options: { ...form.options, [key]: value },
        });
    }

    function addQuestion() {
        start(async () => {
            const { data } = await supabase
                .from("platform_mock_questions")
                .insert({
                    mock_test_id: mockTestId,
                    question: form.question,
                    options: form.options,
                    correct_option: form.correct_option,
                    marks: form.marks,
                })
                .select()
                .single();

            if (data) {
                setList([...list, data]);
                setForm({
                    question: "",
                    options: { A: "", B: "", C: "", D: "" },
                    correct_option: "A",
                    marks: 1,
                });
            }
        });
    }

    async function deleteQuestion(id: string) {
        await supabase
            .from("platform_mock_questions")
            .delete()
            .eq("id", id);

        setList(list.filter((q) => q.id !== id));
    }

    return (
        <div className="space-y-8">
            {/* Add Question */}
            <div className="space-y-4 p-6 border border-white/10 rounded-lg">
                <h2 className="font-semibold">Add Question</h2>

                <Textarea
                    placeholder="Question text"
                    value={form.question}
                    onChange={(e) =>
                        setForm({ ...form, question: e.target.value })
                    }
                />

                {Object.entries(form.options).map(([k, v]) => (
                    <Input
                        key={k}
                        placeholder={`Option ${k}`}
                        value={v}
                        onChange={(e) => updateOption(k, e.target.value)}
                    />
                ))}

                <div className="flex gap-4">
                    <Input
                        placeholder="Correct Option (A/B/C/D)"
                        value={form.correct_option}
                        onChange={(e) =>
                            setForm({ ...form, correct_option: e.target.value })
                        }
                    />

                    <Input
                        type="number"
                        placeholder="Marks"
                        value={form.marks}
                        onChange={(e) =>
                            setForm({ ...form, marks: Number(e.target.value) })
                        }
                    />
                </div>

                <Button disabled={pending} onClick={addQuestion}>
                    Add Question
                </Button>
            </div>

            {/* Existing Questions */}
            <div className="space-y-4">
                {list.map((q, i) => (
                    <div
                        key={q.id}
                        className="p-4 border border-white/10 rounded-lg"
                    >
                        <p className="font-medium">
                            {i + 1}. {q.question}
                        </p>

                        <ul className="text-sm text-slate-300 mt-2 space-y-1">
                            {Object.entries(q.options).map(([k, v]) => (
                                <li key={k}>
                                    {k}. {v}
                                    {q.correct_option === k && " ✅"}
                                </li>
                            ))}
                        </ul>

                        <Button
                            size="sm"
                            variant="outline"
                            className="mt-3"
                            onClick={() => deleteQuestion(q.id)}
                        >
                            Delete
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
}
