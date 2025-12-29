"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { supabase } from "@/lib/supabase";

type Asset = {
    id: string;
    type: "video" | "pdf" | "ppt";
    title: string;
    url: string;
};

export default function AssetManager({
    courseId,
    assets,
}: {
    courseId: string;
    assets: Asset[];
}) {
    const [type, setType] = useState<Asset["type"]>("video");
    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");

    async function addAsset() {
        await supabase.from("micro_course_assets").insert({
            course_id: courseId,
            type,
            title,
            url,
        });
        location.reload();
    }

    async function removeAsset(id: string) {
        await supabase.from("micro_course_assets").delete().eq("id", id);
        location.reload();
    }

    return (
        <Card className="p-6 space-y-6 border border-white/10 bg-[#0f172a]/80">
            <h2 className="text-lg font-semibold text-white">Course Assets</h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <select
                    className="bg-black border border-white/10 p-2 rounded text-white"
                    value={type}
                    onChange={(e) => setType(e.target.value as any)}
                >
                    <option value="video">Video</option>
                    <option value="pdf">PDF</option>
                    <option value="ppt">PPT</option>
                </select>

                <Input
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <Input
                    placeholder="URL"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                />

                <Button onClick={addAsset}>Add</Button>
            </div>

            <div className="space-y-3">
                {assets.map((a) => (
                    <div
                        key={a.id}
                        className="flex items-center justify-between border border-white/10 p-3 rounded"
                    >
                        <div>
                            <p className="text-white">{a.title}</p>
                            <p className="text-xs text-slate-400">{a.type}</p>
                        </div>

                        <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => removeAsset(a.id)}
                        >
                            Delete
                        </Button>
                    </div>
                ))}
            </div>
        </Card>
    );
}
