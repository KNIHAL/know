"use client";

import { Button } from "@/components/ui/button";

declare global {
    interface Window {
        Razorpay: any;
    }
}

function loadRazorpay(): Promise<boolean> {
    return new Promise((resolve) => {
        if (window.Razorpay) return resolve(true);

        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
}

export default function BuyNowButton({
    price,
    contentId,
}: {
    price: number;
    contentId: string;
}) {
    async function buyNow() {
        const loaded = await loadRazorpay();
        if (!loaded) {
            alert("Razorpay failed to load");
            return;
        }

        const res = await fetch("/api/payments/create-order", {
            method: "POST",
            body: JSON.stringify({
                amount: price,
                contentId,
            }),
        });

        const order = await res.json();

        const rzp = new window.Razorpay({
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
            order_id: order.id,
            handler: () => {
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
