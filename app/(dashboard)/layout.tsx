import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Header } from "@/components/dashboard/header";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const isAdmin = ["ADMIN", "SUPER_ADMIN"].includes(session.user.role);

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Sidebar - hidden on mobile */}
      <div className="hidden md:block">
        <Sidebar isAdmin={isAdmin} />
      </div>
      
      {/* Main content area */}
      <div className="md:pl-64 transition-all duration-300">
        <Header user={session.user} />
        <main className="p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
