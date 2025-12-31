import crypto from "crypto";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("x-razorpay-signature");

  if (!signature) {
    return new Response("Missing signature", { status: 400 });
  }

  const expected = crypto
    .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
    .update(body)
    .digest("hex");

  if (expected !== signature) {
    return new Response("Invalid signature", { status: 400 });
  }

  const event = JSON.parse(body);

  if (event.event === "payment.captured") {
    const payment = event.payload.payment.entity;

    // receipt format: micro_course_<contentId>
    const contentId = payment.receipt.split("_")[2];

    await supabase.from("student_purchases").insert({
      user_id: payment.notes.user_id, // ensure this is sent during order creation
      content_id: contentId,
    });
  }

  return new Response("OK");
}
