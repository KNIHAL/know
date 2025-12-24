"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useSession } from "next-auth/react";

type StudentProfileFormProps = {
    user: {
        id: string;
        name?: string | null;
        email?: string | null;
    };
    profile: {
        full_name?: string | null;
        stream?: string | null;
        class?: string | null;
        exam?: string | null;
        skills?: string | null;
    } | null;
};

export default function StudentProfileForm({
    user,
    profile,
}: StudentProfileFormProps) {
    const { data: session } = useSession();

    const [form, setForm] = useState({
        full_name: profile?.full_name || "",
        stream: profile?.stream || "",
        class: profile?.class || "",
        exam: profile?.exam || "",
        skills: profile?.skills || "",
    });

    const [saving, setSaving] = useState(false);

    // 🔄 If server profile changes (first load)
    useEffect(() => {
        if (!profile) return;

        setForm({
            full_name: profile.full_name || "",
            stream: profile.stream || "",
            class: profile.class || "",
            exam: profile.exam || "",
            skills: profile.skills || "",
        });
    }, [profile]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        if (!session?.user?.id) return;

        setSaving(true);

        await supabase.from("student_profiles").upsert({
            id: session.user.id,
            full_name: form.full_name || null,
            stream: form.stream || null,
            class: form.class || null,
            exam: form.exam || null,
            skills: form.skills || null,
        });

        setSaving(false);

        // 🔥 sidebar refresh trigger
        window.dispatchEvent(new Event("profile-updated"));
        alert("Profile updated");
    };

    return (
        <div className="max-w-xl space-y-4">
            <input
                name="full_name"
                value={form.full_name}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full border p-2 rounded"
            />

            <input
                name="stream"
                value={form.stream}
                onChange={handleChange}
                placeholder="Stream"
                className="w-full border p-2 rounded"
            />

            <input
                name="class"
                value={form.class}
                onChange={handleChange}
                placeholder="Class (optional)"
                className="w-full border p-2 rounded"
            />

            <input
                name="exam"
                value={form.exam}
                onChange={handleChange}
                placeholder="Target Exam (optional)"
                className="w-full border p-2 rounded"
            />

            <textarea
                name="skills"
                value={form.skills}
                onChange={handleChange}
                placeholder="Skills (optional, comma separated)"
                className="w-full border p-2 rounded"
            />

            <button
                onClick={handleSave}
                disabled={saving}
                className="bg-black text-white px-4 py-2 rounded"
            >
                {saving ? "Saving..." : "Save Profile"}
            </button>
        </div>
    );
}
