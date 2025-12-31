"use client";

import { useState, useTransition } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type Course = {
    id?: string;
    title: string;
    description: string;
    price: number;
    video_url?: string;
    notes?: string;
    ppt_url?: string;
    is_published?: boolean;
};

export default function MicroCourseForm({
    course,
    onSuccess,
}: {
    course?: Course;
    onSuccess?: () => void;
}) {
    const [pending, start] = useTransition();
    const [form, setForm] = useState<Course>({
        title: course?.title || "",
        description: course?.description || "",
        price: course?.price || 0,
        video_url: course?.video_url || "",
        notes: course?.notes || "",
        ppt_url: course?.ppt_url || "",
        is_published: course?.is_published || false,
    });

    function update<K extends keyof Course>(key: K, value: Course[K]) {
        setForm({ ...form, [key]: value });
    }

    async function save() {
        start(async () => {
            if (course?.id) {
                await supabase.from("micro_courses").update(form).eq("id", course.id);
            } else {
                await supabase.from("micro_courses").insert(form);
            }
            onSuccess?.();
        });
    }

    return (
        <div className="space-y-5 max-w-2xl">
            <Input
                placeholder="Course title"
                value={form.title}
                onChange={(e) => update("title", e.target.value)}
            />

            <Textarea
                placeholder="Course description"
                rows={4}
                value={form.description}
                onChange={(e) => update("description", e.target.value)}
            />

            <Input
                type="number"
                placeholder="Price (₹)"
                value={form.price}
                onChange={(e) => update("price", Number(e.target.value))}
            />

            <Input
                placeholder="YouTube / Video URL"
                value={form.video_url}
                onChange={(e) => update("video_url", e.target.value)}
            />

            <Input
                placeholder="Notes PDF URL (read-only)"
                value={form.notes}
                onChange={(e) => update("notes", e.target.value)}
            />

            <Input
                placeholder="PPT PDF URL (read-only)"
                value={form.ppt_url}
                onChange={(e) => update("ppt_url", e.target.value)}
            />

            <Button disabled={pending} onClick={save}>
                {course?.id ? "Update Course" : "Create Course"}
            </Button>
        </div>
    );
}
