"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { togglePlatformMockTestPublish } from "@/app/admin/platform-mock-tests/actions";
import ConfirmActionButton from "./ConfirmActionButton";

type Test = {
    id: string;
    title: string;
    duration_minutes: number;
    total_marks: number;
    is_published: boolean;
};

export default function PlatformMockTestTable({ tests }: { tests: Test[] }) {
    if (!tests.length) {
        return (
            <div className="p-8 text-slate-400 text-center border border-white/10 rounded-lg">
                No platform mock tests yet.
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {tests.map((t) => (
                <div
                    key={t.id}
                    className="flex items-center justify-between p-4 border border-white/10 rounded-lg"
                >
                    <div>
                        <p className="text-white font-medium">{t.title}</p>
                        <p className="text-sm text-slate-400">
                            {t.duration_minutes} min · {t.total_marks} marks
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <Badge variant={t.is_published ? "default" : "secondary"}>
                            {t.is_published ? "Published" : "Draft"}
                        </Badge>

                        <Link href={`/admin/platform-mock-tests/${t.id}/edit`}>
                            <Button size="sm" variant="outline">Edit</Button>
                        </Link>

                        <Link href={`/admin/platform-mock-tests/${t.id}/questions`}>
                            <Button size="sm" variant="secondary">Questions</Button>
                        </Link>

                        <ConfirmActionButton
                            label={t.is_published ? "Unpublish" : "Publish"}
                            confirmText={
                                t.is_published
                                    ? "This test will be hidden from students."
                                    : "This test will be visible to students."
                            }
                            onConfirm={() =>
                                togglePlatformMockTestPublish(t.id, !t.is_published)
                            }
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}
