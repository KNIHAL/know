"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function QuestionList({
    questions,
    onUpdate,
    onDelete,
    onReorder,
}: {
    questions: any[];
    onUpdate: (id: string, q: any) => Promise<void>;
    onDelete: (id: string) => Promise<void>;
    onReorder: (ids: string[]) => Promise<void>;
}) {
    const [items, setItems] = useState(questions);

    function move(index: number, dir: -1 | 1) {
        const copy = [...items];
        const target = index + dir;
        if (target < 0 || target >= copy.length) return;

        [copy[index], copy[target]] = [copy[target], copy[index]];
        setItems(copy);
        onReorder(copy.map((q) => q.id));
    }

    return (
        <div className="space-y-4">
            {items.map((q, i) => (
                <div
                    key={q.id}
                    className="border border-white/10 rounded-lg p-4 space-y-2"
                >
                    <div className="font-medium">
                        Q{i + 1}. {q.question}
                    </div>

                    <ul className="text-sm text-slate-400">
                        {Object.entries(q.options).map(([k, v]: any) => (
                            <li key={k}>
                                {k}. {v}
                            </li>
                        ))}
                    </ul>

                    <div className="text-sm">
                        ✅ Correct: {q.correct_option} | ⭐ Marks: {q.marks}
                    </div>

                    <div className="flex flex-wrap gap-2 pt-2">
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                                onUpdate(q.id, { marks: q.marks + 1 })
                            }
                        >
                            +1 Mark
                        </Button>

                        <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => onDelete(q.id)}
                        >
                            Delete
                        </Button>

                        <Button size="sm" onClick={() => move(i, -1)}>
                            ↑
                        </Button>
                        <Button size="sm" onClick={() => move(i, 1)}>
                            ↓
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    );
}
