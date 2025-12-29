import { supabase } from "@/lib/supabase";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function RankingsPage() {
    const { data } = await supabase.rpc("get_platform_mock_rankings");

    if (!data?.length) {
        return (
            <Card className="p-8 text-center text-slate-400 bg-[#0f172a]/80 border border-white/10">
                Rankings will appear after mock test submissions.
            </Card>
        );
    }

    return (
        <div className="max-w-4xl space-y-6">
            <h1 className="text-2xl font-semibold text-white">Rankings</h1>

            <Card className="bg-[#0f172a]/80 border border-white/10">
                {data.map((r: any) => (
                    <div
                        key={r.rank}
                        className={`flex items-center justify-between px-4 py-3 border-b border-white/5 ${r.is_you ? "bg-blue-600/10" : ""
                            }`}
                    >
                        <div className="flex items-center gap-3">
                            <span className="w-6 text-center text-slate-300">
                                {r.rank}
                            </span>
                            <span className="text-white">
                                {r.is_you ? "You" : `Student ${r.rank}`}
                            </span>
                            {r.is_you && <Badge variant="secondary">You</Badge>}
                        </div>

                        <span className="text-slate-300">{r.score}</span>
                    </div>
                ))}
            </Card>
        </div>
    );
}
