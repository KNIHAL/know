import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

export default function PurchaseCard({ price }: { price?: number | null }) {
    return (
        <Card className="max-w-sm w-full">
            <CardContent className="p-6 text-center space-y-4">
                <Lock className="mx-auto text-muted-foreground" />
                <h3 className="text-lg font-semibold">Paid Content</h3>
                <p className="text-sm text-muted-foreground">
                    Unlock this content to continue
                </p>

                <div className="text-2xl font-bold">₹{price}</div>

                <Button disabled className="w-full">
                    Buy (Coming Soon)
                </Button>
            </CardContent>
        </Card>
    );
}
