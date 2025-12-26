"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function MicroCourseForm({
    initialData,
    onSubmit,
}: {
    initialData?: any;
    onSubmit: (data: any) => Promise<void>;
}) {
    const [form, setForm] = useState({
        title: initialData?.title || "",
        description: initialData?.description || "",
        stream: initialData?.stream || "",
        exam: initialData?.exam || "",
        price: initialData?.price || 0,
    });

    return (
        <form
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit(form);
            }}
        >
            <Input
                placeholder="Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
            />

            <Input
                placeholder="Stream"
                value={form.stream}
                onChange={(e) => setForm({ ...form, stream: e.target.value })}
            />

            <Input
                placeholder="Exam"
                value={form.exam}
                onChange={(e) => setForm({ ...form, exam: e.target.value })}
            />

            <Input
                type="number"
                placeholder="Price"
                value={form.price}
                onChange={(e) =>
                    setForm({ ...form, price: Number(e.target.value) })
                }
            />

            <div className="md:col-span-2">
                <Textarea
                    placeholder="Description"
                    value={form.description}
                    onChange={(e) =>
                        setForm({ ...form, description: e.target.value })
                    }
                />
            </div>

            <div className="md:col-span-2">
                <Button type="submit" className="w-full md:w-auto">
                    Save Course
                </Button>
            </div>
        </form>
    );
}
