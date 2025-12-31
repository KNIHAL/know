"use client";

import { useRouter } from "next/navigation";
import MicroCourseForm from "@/components/admin/MicroCourseForm";

export default function NewMicroCourse() {
    const router = useRouter();

    return (
        <div className="max-w-3xl space-y-4">
            <h1 className="text-xl font-semibold">Create Micro-Course</h1>

            <MicroCourseForm
                onSuccess={() => router.push("/admin/micro-courses")}
            />
        </div>
    );
}
