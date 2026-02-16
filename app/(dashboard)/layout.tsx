"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Header } from "@/components/dashboard/header";
import { Loader2 } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const isAdmin = ["ADMIN", "SUPER_ADMIN", "MODERATOR"].includes(user.role);

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Sidebar - hidden on mobile */}
      <div className="hidden md:block fixed inset-y-0 z-50">
        <Sidebar isAdmin={isAdmin} />
      </div>

      {/* Main content area */}
      <div className="md:pl-64 transition-all duration-300">
        <Header user={{
          id: user.id,
          email: user.email,
          name: user.fullName || user.username,
          image: user.avatar
        } as any} />
        <main className="p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
