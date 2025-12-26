"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useTransition } from "react";

export default function MicroCourseTable({
    courses,
    onToggle,
}: {
    courses: any[];
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
                            <th className="p-3">Price</th>
                            <th className="p-3">Status</th>
                            <th className="p-3">Publish</th>
                            <th className="p-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map((c) => (
                            <tr key={c.id} className="border-t border-white/10">
                                <td className="p-3">{c.title}</td>
                                <td className="p-3">₹{c.price}</td>
                                <td className="p-3">
                                    <Badge>
                                        {c.is_published ? "Published" : "Draft"}
                                    </Badge>
                                </td>
                                <td className="p-3">
                                    <Switch
                                        checked={c.is_published}
                                        disabled={isPending}
                                        onCheckedChange={(val) =>
                                            startTransition(() => onToggle(c.id, val))
                                        }
                                    />
                                </td>
                                <td className="p-3">
                                    <Link href={`/admin/micro-courses/${c.id}/edit`}>
                                        <Button size="sm" variant="outline">
                                            Edit
                                        </Button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile */}
            <div className="md:hidden space-y-3">
                {courses.map((c) => (
                    <div
                        key={c.id}
                        className="border border-white/10 p-4 rounded-lg space-y-2"
                    >
                        <div className="font-semibold">{c.title}</div>
                        <div className="text-sm text-slate-400">₹{c.price}</div>

                        <div className="flex items-center justify-between">
                            <Badge>
                                {c.is_published ? "Published" : "Draft"}
                            </Badge>

                            <Switch
                                checked={c.is_published}
                                disabled={isPending}
                                onCheckedChange={(val) =>
                                    startTransition(() => onToggle(c.id, val))
                                }
                            />
                        </div>

                        <Link href={`/admin/micro-courses/${c.id}/edit`}>
                            <Button size="sm" className="w-full">
                                Edit
                            </Button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
