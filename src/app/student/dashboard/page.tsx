import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

export default function StudentDashboardPage() {
    return (
        <div className="space-y-8 max-w-6xl">
            {/* 🔍 Search */}
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" size={18} />
                <Input
                    placeholder="Search courses, notes, teachers..."
                    className="pl-11 h-12 bg-background/80 backdrop-blur"
                />
            </div>

            {/* 🔎 Filters */}
            <Card className="bg-background/70 backdrop-blur border-muted">
                <CardHeader>
                    <CardTitle className="text-base">Filters</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-6 text-sm">
                    {/* Content Type */}
                    <div className="space-y-2">
                        <p className="font-medium">Content Type</p>
                        <label className="flex items-center gap-2">
                            <Checkbox /> Micro-Courses
                        </label>
                        <label className="flex items-center gap-2">
                            <Checkbox /> Notes
                        </label>
                        <label className="flex items-center gap-2">
                            <Checkbox /> PPTs
                        </label>
                    </div>

                    {/* Stream */}
                    <div className="space-y-2">
                        <p className="font-medium">Stream</p>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="All" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                <SelectItem value="science">Science</SelectItem>
                                <SelectItem value="commerce">Commerce</SelectItem>
                                <SelectItem value="arts">Arts</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Exam */}
                    <div className="space-y-2">
                        <p className="font-medium">Exam</p>
                        <Input placeholder="JEE / NEET / CUET" />
                    </div>

                    {/* Price */}
                    <div className="space-y-2">
                        <p className="font-medium">Price</p>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="All" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                <SelectItem value="free">Free</SelectItem>
                                <SelectItem value="paid">Paid</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            {/* 🔥 Practice */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold">Practice & Validate Skills</h2>
                <div className="flex flex-col sm:flex-row gap-4">
                    <Button className="h-12" asChild>
                        <a href="/student/mock-tests">Take Platform Mock Test</a>
                    </Button>
                    <Button variant="secondary" className="h-12" asChild>
                        <a href="/student/rankings">View Rankings</a>
                    </Button>
                </div>
            </section>
        </div>
    );
}
