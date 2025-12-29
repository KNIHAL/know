"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from "@/components/ui/alert-dialog";

export default function ConfirmActionButton({
    label,
    confirmText,
    onConfirm,
    variant = "default",
}: {
    label: string;
    confirmText: string;
    onConfirm: () => Promise<void>;
    variant?: "default" | "secondary" | "destructive" | "outline";
}) {
    const [pending, start] = useTransition();

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button size="sm" variant={variant} disabled={pending}>
                    {label}
                </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        {confirmText}
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={() => start(onConfirm)}
                    >
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
