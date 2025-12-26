import Link from "next/link";

export default function AdminSidebar() {
    return (
        <aside className="w-64 hidden md:block border-r border-white/10 bg-[#020617]">
            <div className="p-6 font-bold text-lg">KNOW Admin</div>

            <nav className="space-y-2 px-4 text-sm">
                <Link href="/admin" className="block p-2 rounded hover:bg-white/5">
                    Dashboard
                </Link>
                <Link href="#" className="block p-2 rounded hover:bg-white/5">
                    Micro-Courses
                </Link>
                <Link href="#" className="block p-2 rounded hover:bg-white/5">
                    Mock Tests
                </Link>
            </nav>
        </aside>
    );
}
