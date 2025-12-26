import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, name, role } = body;

    if (!email || !password || !name || !role) {
      return NextResponse.json(
        { error: "Missing fields" },
        { status: 400 }
      );
    }

    const password_hash = await bcrypt.hash(password, 10);

    const { error } = await supabase.from("users").insert({
      email,
      password_hash,
      name,
      role,
    });

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { error: "Signup failed" },
      { status: 500 }
    );
  }
}
