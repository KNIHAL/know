"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useTransition } from "react";

export default function PlatformMockTestTable({
    tests,
    onToggle,
}: {
    tests: any[];
    onToggle: (id: string, value: boolean) => Promise<void>;
}) {
    const [isPending, startTransition] = useTransition();

    return (
        <div className="space-y-4">
            {/* Desktop */}
            <div className="hidden md:block">
                <table className="w-full text-sm border border-white/10">
                    <thead className="bg-white/5">
                        <tr>
                            <th className="p-3 text-left">Title</th>
                            <th className="p-3">Duration</th>
                            <th className="p-3">Marks</th>
                            <th className="p-3">Status</th>
                            <th className="p-3">Publish</th>
                            <th className="p-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tests.map((t) => (
                            <tr key={t.id} className="border-t border-white/10">
                                <td className="p-3">{t.title}</td>
                                <td className="p-3">{t.duration_minutes} min</td>
                                <td className="p-3">{t.total_marks}</td>
                                <td className="p-3">
                                    <Badge>{t.is_published ? "Published" : "Draft"}</Badge>
                                </td>
                                <td className="p-3">
                                    <Switch
                                        checked={t.is_published}
                                        disabled={isPending}
                                        onCheckedChange={(v) =>
                                            startTransition(() => onToggle(t.id, v))
                                        }
                                    />
                                </td>
                                <td className="p-3 space-x-2">
                                    <Link href={`/admin/platform-mock-tests/${t.id}/edit`}>
                                        <Button size="sm" variant="outline">Edit</Button>
                                    </Link>
                                    <Link href={`/admin/platform-mock-tests/${t.id}/questions`}>
                                        <Button size="sm">Questions</Button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile */}
            <div className="md:hidden space-y-3">
                {tests.map((t) => (
                    <div key={t.id} className="border border-white/10 p-4 rounded-lg">
                        <div className="font-semibold">{t.title}</div>
                        <div className="text-sm text-slate-400">
                            {t.duration_minutes} min • {t.total_marks} marks
                        </div>

                        <div className="flex items-center justify-between mt-2">
                            <Badge>{t.is_published ? "Published" : "Draft"}</Badge>
                            <Switch
                                checked={t.is_published}
                                disabled={isPending}
                                onCheckedChange={(v) =>
                                    startTransition(() => onToggle(t.id, v))
                                }
                            />
                        </div>

                        <div className="mt-3 grid grid-cols-2 gap-2">
                            <Link href={`/admin/platform-mock-tests/${t.id}/edit`}>
                                <Button size="sm" variant="outline" className="w-full">
                                    Edit
                                </Button>
                            </Link>
                            <Link href={`/admin/platform-mock-tests/${t.id}/questions`}>
                                <Button size="sm" className="w-full">
                                    Questions
                                </Button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
