export default function StudentDashboardPage() {
    return (
        <div className="space-y-10">
            {/* 🔍 Search bar (logic baad mein) */}
            <div>
                <input
                    type="text"
                    placeholder="Search courses, notes, teachers..."
                    className="w-full border px-4 py-3 rounded"
                />
            </div>
            {/* 🔎 Search Filters (UI only) */}
            <div className="border rounded p-4 space-y-4">
                <div className="flex flex-wrap gap-6 text-sm">
                    {/* Content Type */}
                    <div>
                        <p className="font-medium mb-1">Content Type</p>
                        <label className="block">
                            <input type="checkbox" /> Micro-Courses
                        </label>
                        <label className="block">
                            <input type="checkbox" /> Notes
                        </label>
                        <label className="block">
                            <input type="checkbox" /> PPTs
                        </label>
                    </div>

                    {/* Stream */}
                    <div>
                        <p className="font-medium mb-1">Stream</p>
                        <select className="border px-2 py-1 rounded">
                            <option>All</option>
                            <option>Science</option>
                            <option>Commerce</option>
                            <option>Arts</option>
                        </select>
                    </div>

                    {/* Exam */}
                    <div>
                        <p className="font-medium mb-1">Exam</p>
                        <input
                            type="text"
                            placeholder="JEE / NEET / CUET"
                            className="border px-2 py-1 rounded"
                        />
                    </div>

                    {/* Price */}
                    <div>
                        <p className="font-medium mb-1">Price</p>
                        <select className="border px-2 py-1 rounded">
                            <option>All</option>
                            <option>Free</option>
                            <option>Paid</option>
                        </select>
                    </div>
                </div>
            </div>


            {/* ⭐ Recommended for You */}
            <section>
                <h2 className="text-xl font-semibold mb-4">
                    Recommended for you
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border p-4 rounded">
                        <p className="font-medium">Micro-Course</p>
                        <p className="text-sm text-gray-600">
                            Based on your stream & exam
                        </p>
                    </div>

                    <div className="border p-4 rounded">
                        <p className="font-medium">Notes</p>
                        <p className="text-sm text-gray-600">
                            Popular among similar students
                        </p>
                    </div>

                    <div className="border p-4 rounded">
                        <p className="font-medium">PPT</p>
                        <p className="text-sm text-gray-600">
                            Quick revision material
                        </p>
                    </div>
                </div>
            </section>

            {/* 🔥 Practice & Validate */}
            <section>
                <h2 className="text-xl font-semibold mb-4">
                    Practice & Validate Skills
                </h2>

                <div className="flex gap-6">
                    <a
                        href="/student/mock-tests"
                        className="underline"
                    >
                        Take Platform Mock Test
                    </a>

                    <a
                        href="/student/rankings"
                        className="underline"
                    >
                        View Rankings
                    </a>
                </div>
            </section>
        </div>
    );
}
