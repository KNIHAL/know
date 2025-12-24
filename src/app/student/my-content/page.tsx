"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Layers, FileText } from "lucide-react";

function EmptyState({
    icon: Icon,
    title,
    description,
}: {
    icon: any;
    title: string;
    description: string;
}) {
    return (
        <Card className="p-10 text-center bg-[#0f172a]/80 border border-white/10">
            <Icon className="mx-auto mb-4 text-blue-500" size={36} />
            <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
            <p className="text-sm text-slate-400 mb-6">{description}</p>
            <Button variant="secondary">Explore Content</Button>
        </Card>
    );
}

export default function MyContentPage() {
    return (
        <div className="max-w-6xl space-y-8">
            <div>
                <h1 className="text-2xl font-semibold text-white">My Content</h1>
                <p className="text-slate-400 mt-1">
                    Access everything you’ve purchased on KNOW
                </p>
            </div>

            <Tabs defaultValue="micro-courses" className="w-full">
                <TabsList className="bg-[#020617] border border-white/10">
                    <TabsTrigger value="micro-courses" className="gap-2">
                        <Layers size={16} /> Micro-Courses
                    </TabsTrigger>
                    <TabsTrigger value="notes" className="gap-2">
                        <BookOpen size={16} /> Notes
                    </TabsTrigger>
                    <TabsTrigger value="ppts" className="gap-2">
                        <FileText size={16} /> PPTs
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="micro-courses" className="mt-6">
                    <EmptyState
                        icon={Layers}
                        title="No Micro-Courses Yet"
                        description="You haven’t purchased any micro-courses yet."
                    />
                </TabsContent>

                <TabsContent value="notes" className="mt-6">
                    <EmptyState
                        icon={BookOpen}
                        title="No Notes Found"
                        description="Your purchased notes will appear here."
                    />
                </TabsContent>

                <TabsContent value="ppts" className="mt-6">
                    <EmptyState
                        icon={FileText}
                        title="No PPTs Available"
                        description="Your purchased PPTs will be available here."
                    />
                </TabsContent>
            </Tabs>
        </div>
    );
}
