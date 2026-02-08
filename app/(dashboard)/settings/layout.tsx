"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, KeyRound, Smartphone, Link2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  const navItems = [
    { href: "/settings/profile", label: "Profile", icon: User },
    { href: "/settings/password", label: "Password", icon: KeyRound },
    { href: "/settings/mfa", label: "2FA", icon: Smartphone },
    { href: "/settings/accounts", label: "Accounts", icon: Link2 },
  ];

  // Don't show tabs on the main settings page
  const isMainSettings = pathname === "/settings";

  if (isMainSettings) {
    return <>{children}</>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground">
          Manage your account settings
        </p>
      </div>

      <div className="border-b">
        <nav className="flex gap-1 -mb-px">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 transition-colors",
                pathname === item.href
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground/30"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="max-w-2xl">{children}</div>
    </div>
  );
}
