import React from "react";

type Props = {
    allowed: boolean;
    children: React.ReactNode;
    fallback?: React.ReactNode;
};

export default function PaidContentGuard({
    allowed,
    children,
    fallback,
}: Props) {
    if (!allowed) {
        return <>{fallback ?? null}</>;
    }

    return <>{children}</>;
}
