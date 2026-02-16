"use client";

import { useAuth } from "@/context/AuthContext";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Header } from "@/components/dashboard/header";
import { Loader2 } from "lucide-react";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-slate-500" />
            </div>
        );
    }

    // Fallback for safety, though middleware protects this
    if (!user) {
        return null;
    }

    const isAdmin = ["ADMIN", "SUPER_ADMIN"].includes(user.role || "USER");

    // Adapt user object to match HeaderProps if necessary
    const headerUser = {
        name: user.fullName || user.username,
        email: user.email,
        image: user.avatar,
        role: user.role || "USER"
    };

    return (
        <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-950">
            <Sidebar isAdmin={isAdmin} />
            <div className="flex flex-1 flex-col overflow-hidden">
                <Header user={headerUser} />
                <main className="flex-1 overflow-y-auto p-8 bg-slate-50 dark:bg-slate-950">
                    {children}
                </main>
            </div>
        </div>
    );
}
