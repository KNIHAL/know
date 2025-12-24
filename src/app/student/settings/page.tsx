"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { LogOut, Moon } from "lucide-react";

export default function StudentSettingsPage() {
    return (
        <div className="max-w-3xl space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-semibold text-white">Settings</h1>
                <p className="text-slate-400 mt-1">
                    Manage your preferences
                </p>
            </div>

            {/* Appearance */}
            <Card className="p-6 bg-[#0f172a]/80 border border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-slate-200">
                        <Moon size={18} />
                        <span>Dark Mode</span>
                    </div>
                    {/* Your sidebar already controls theme — this is UI only */}
                    <Switch disabled />
                </div>

                <p className="text-xs text-slate-400">
                    Theme can be changed from the sidebar
                </p>
            </Card>

            {/* Logout */}
            <Card className="p-6 bg-[#0f172a]/80 border border-white/10">
                <Button
                    variant="destructive"
                    className="w-full flex items-center gap-2"
                    onClick={() => {
                        window.location.href = "/login";
                    }}
                >
                    <LogOut size={16} />
                    Logout
                </Button>
            </Card>
        </div>
    );
}
