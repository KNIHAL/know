"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ResetPasswordPage() {
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { error } = await supabase.auth.updateUser({ password });
        setMsg(error ? "Reset failed" : "Password updated");
    };

    return (
        <form onSubmit={submit}>
            <input
                type="password"
                placeholder="New password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
            />
            <button type="submit">Reset Password</button>
            {msg && <p>{msg}</p>}
        </form>
    );
}
