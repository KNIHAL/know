"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [msg, setMsg] = useState("");

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/auth/reset-password`,
        });
        setMsg(error ? "Something went wrong" : "Reset link sent to email");
    };

    return (
        <form onSubmit={submit}>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
            />
            <button type="submit">Send Reset Link</button>
            {msg && <p>{msg}</p>}
        </form>
    );
}
