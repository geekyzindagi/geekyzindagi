"use client";

import Link from "next/link";
import { User, KeyRound, Smartphone, Link2, ChevronRight } from "lucide-react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const settingsOptions = [
  {
    href: "/settings/profile",
    title: "Profile",
    description: "Manage your personal information and preferences",
    icon: User,
  },
  {
    href: "/settings/password",
    title: "Password",
    description: "Update your password to keep your account secure",
    icon: KeyRound,
  },
  {
    href: "/settings/mfa",
    title: "Two-Factor Authentication",
    description: "Add an extra layer of security with 2FA",
    icon: Smartphone,
  },
  {
    href: "/settings/accounts",
    title: "Connected Accounts",
    description: "Manage linked social accounts and OAuth providers",
    icon: Link2,
  },
];

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {settingsOptions.map((option) => (
          <Link key={option.href} href={option.href}>
            <Card className="hover:bg-accent/50 transition-colors cursor-pointer h-full">
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <option.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-lg flex items-center justify-between">
                    {option.title}
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </CardTitle>
                  <CardDescription>{option.description}</CardDescription>
                </div>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
