export default function NotAuthorized() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#020617] text-white">
            <div className="text-center space-y-3">
                <h1 className="text-xl font-semibold">Access Denied</h1>
                <p className="text-slate-400">
                    You are not authorized to access admin panel.
                </p>
            </div>
        </div>
    );
}
