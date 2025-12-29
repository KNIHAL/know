"use client";

import { useState, useTransition } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type Course = {
    id: string;
    title: string;
    description: string;
    price: number;
    video_url?: string;
    notes?: string;
    ppt_url?: string;
};

export default function MicroCourseForm({ course }: { course: Course }) {
    const [pending, start] = useTransition();
    const [form, setForm] = useState(course);

    function update<K extends keyof Course>(key: K, value: Course[K]) {
        setForm({ ...form, [key]: value });
    }

    async function save() {
        start(async () => {
            await supabase
                .from("micro_courses")
                .update({
                    title: form.title,
                    description: form.description,
                    price: form.price,
                    video_url: form.video_url,
                    notes: form.notes,
                    ppt_url: form.ppt_url,
                })
                .eq("id", form.id);
        });
    }

    return (
        <div className="space-y-6 max-w-2xl">
            <Input
                placeholder="Course title"
                value={form.title}
                onChange={(e) => update("title", e.target.value)}
            />

            <Textarea
                placeholder="Course description"
                value={form.description}
                onChange={(e) => update("description", e.target.value)}
            />

            <Input
                type="number"
                placeholder="Price"
                value={form.price}
                onChange={(e) => update("price", Number(e.target.value))}
            />

            <Input
                placeholder="YouTube video URL"
                value={form.video_url || ""}
                onChange={(e) => update("video_url", e.target.value)}
            />

            <Textarea
                placeholder="Notes (markdown / text)"
                rows={6}
                value={form.notes || ""}
                onChange={(e) => update("notes", e.target.value)}
            />

            <Input
                placeholder="PPT link (Google Drive / direct URL)"
                value={form.ppt_url || ""}
                onChange={(e) => update("ppt_url", e.target.value)}
            />

            <Button disabled={pending} onClick={save}>
                Save Changes
            </Button>
        </div>
    );
}
