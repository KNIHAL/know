import { ReactNode } from "react";
import PurchaseCard from "./PurchaseCard";

interface Props {
    allowed: boolean;
    price?: number | null;
    children: ReactNode;
}

export default function PaidContentGuard({
    allowed,
    price,
    children,
}: Props) {
    if (allowed) return <>{children}</>;

    return (
        <div className="flex justify-center mt-10">
            <PurchaseCard price={price} />
        </div>
    );
}
