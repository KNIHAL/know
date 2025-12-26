import crypto from "crypto";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("x-razorpay-signature")!;

  const expected = crypto
    .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
    .update(body)
    .digest("hex");

  if (expected !== signature) {
    return new Response("Invalid signature", { status: 400 });
  }

  const event = JSON.parse(body);

  if (event.event === "payment.captured") {
    const receipt = event.payload.payment.entity.notes.receipt;
    const [type, contentId] = receipt.split("_");

    await supabase.from("student_purchases").insert({
      student_id: event.payload.payment.entity.notes.student_id,
      content_id: contentId,
      content_type: type,
    });
  }

  return new Response("OK");
}
