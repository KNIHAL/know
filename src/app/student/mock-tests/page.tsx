import { supabase } from "@/lib/supabase";

export default async function MockTestsPage() {
    const { data: tests } = await supabase
        .from("platform_mock_tests")
        .select("*")
        .order("start_time", { ascending: true });

    const now = new Date();

    return (
        <div>
            <h1 className="text-2xl font-semibold mb-4">
                Platform Mock Tests
            </h1>

            <div className="space-y-4">
                {tests?.map((test) => {
                    const start = new Date(test.start_time);
                    const end = new Date(test.end_time);

                    let status = "Upcoming";
                    if (now >= start && now <= end) status = "Live";
                    if (now > end) status = "Ended";

                    return (
                        <div
                            key={test.id}
                            className="border p-4 rounded bg-white"
                        >
                            <h2 className="text-lg font-medium">{test.title}</h2>
                            <p className="text-sm text-gray-600">
                                Duration: {test.duration_minutes} mins · Marks: {test.total_marks}
                            </p>

                            <p className="mt-2">
                                Status:{" "}
                                <span
                                    className={
                                        status === "Live"
                                            ? "text-green-600"
                                            : status === "Upcoming"
                                                ? "text-blue-600"
                                                : "text-gray-500"
                                    }
                                >
                                    {status}
                                </span>
                            </p>

                            {status === "Live" && (
                                <button className="mt-3 px-4 py-2 bg-black text-white rounded">
                                    Start Test
                                </button>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
