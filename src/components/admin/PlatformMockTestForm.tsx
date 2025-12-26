"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function PlatformMockTestForm({
    initial,
    onSubmit,
}: {
    initial?: any;
    onSubmit: (data: any) => Promise<void>;
}) {
    const [f, setF] = useState({
        title: initial?.title || "",
        description: initial?.description || "",
        duration_minutes: initial?.duration_minutes || 60,
        total_marks: initial?.total_marks || 100,
    });

    return (
        <form
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit(f);
            }}
        >
            <Input
                placeholder="Title"
                value={f.title}
                onChange={(e) => setF({ ...f, title: e.target.value })}
            />

            <Input
                type="number"
                placeholder="Duration (minutes)"
                value={f.duration_minutes}
                onChange={(e) =>
                    setF({ ...f, duration_minutes: Number(e.target.value) })
                }
            />

            <Input
                type="number"
                placeholder="Total Marks"
                value={f.total_marks}
                onChange={(e) =>
                    setF({ ...f, total_marks: Number(e.target.value) })
                }
            />

            <div className="md:col-span-2">
                <Textarea
                    placeholder="Description"
                    value={f.description}
                    onChange={(e) => setF({ ...f, description: e.target.value })}
                />
            </div>

            <div className="md:col-span-2">
                <Button type="submit">Save</Button>
            </div>
        </form>
    );
}
