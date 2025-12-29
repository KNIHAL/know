"use client";

import { useTransition } from "react";
import Link from "next/link";
import { toggleMicroCoursePublish } from "@/app/admin/micro-courses/actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ConfirmActionButton from "./ConfirmActionButton";

type Course = {
    id: string;
    title: string;
    price: number;
    is_published: boolean;
};

export default function MicroCourseTable({ courses }: { courses: Course[] }) {
    const [pending, start] = useTransition();

    if (!courses.length) {
        return (
            <div className="p-8 text-slate-400 text-center border border-white/10 rounded-lg">
                No micro-courses yet.
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {courses.map((c) => (
                <div
                    key={c.id}
                    className="flex items-center justify-between p-4 border border-white/10 rounded-lg"
                >
                    <div>
                        <p className="text-white font-medium">{c.title}</p>
                        <p className="text-sm text-slate-400">₹{c.price}</p>
                    </div>

                    <div className="flex items-center gap-3 text-black">
                        <Badge variant={c.is_published ? "default" : "secondary"}>
                            {c.is_published ? "Published" : "Draft"}
                        </Badge>

                        <Link href={`/admin/micro-courses/${c.id}/edit`}>
                            <Button size="sm" variant="outline">Edit</Button>
                        </Link>

                        <ConfirmActionButton
                            label={c.is_published ? "Unpublish" : "Publish"}
                            confirmText={
                                c.is_published
                                    ? "This course will be hidden from students."
                                    : "This course will be visible to students."
                            }
                            onConfirm={async () =>
                                toggleMicroCoursePublish(c.id, !c.is_published)
                            }
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}
