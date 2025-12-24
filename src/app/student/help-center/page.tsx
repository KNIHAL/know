"use client";

import { Card } from "@/components/ui/card";

export default function HelpCenterPage() {
    return (
        <div className="max-w-4xl space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-semibold text-white">Help Center</h1>
                <p className="text-slate-400 mt-1">
                    Everything you need to know about KNOW
                </p>
            </div>

            <div className="space-y-4">
                <Card className="p-6 bg-[#0f172a]/80 border border-white/10">
                    <h2 className="font-semibold text-white mb-2">
                        How do platform mock tests work?
                    </h2>
                    <p className="text-slate-400 text-sm">
                        Platform mock tests are official exams created by KNOW.
                        Your score and rank are calculated only from these tests.
                    </p>
                </Card>

                <Card className="p-6 bg-[#0f172a]/80 border border-white/10">
                    <h2 className="font-semibold text-white mb-2">
                        How are rankings calculated?
                    </h2>
                    <p className="text-slate-400 text-sm">
                        Rankings are based on your performance in official platform
                        mock tests. Practice tests inside micro-courses do not affect rankings.
                    </p>
                </Card>

                <Card className="p-6 bg-[#0f172a]/80 border border-white/10">
                    <h2 className="font-semibold text-white mb-2">
                        Need support?
                    </h2>
                    <p className="text-slate-400 text-sm">
                        Email us at{" "}
                        <span className="text-blue-400">support@know.app</span>
                    </p>
                </Card>
            </div>
        </div>
    );
}
