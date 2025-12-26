"use client";

import { Button } from "@/components/ui/button";

export default function BuyNowButton({
    price,
    contentId,
    contentType,
}: {
    price: number;
    contentId: string;
    contentType: "micro_course" | "platform_mock_test";
}) {
    async function buyNow() {
        const res = await fetch("/api/payments/create-order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                amount: price,
                contentId,
                contentType,
            }),
        });

        const order = await res.json();

        const rzp = new (window as any).Razorpay({
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
            order_id: order.id,
            handler: function () {
                alert("Payment successful. Access unlocked.");
                window.location.reload();
            },
        });

        rzp.open();
    }

    return (
        <Button size="lg" className="rounded-xl" onClick={buyNow}>
            Buy for ₹{price}
        </Button>
    );
}
