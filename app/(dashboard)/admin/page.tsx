"use client";

import Link from "next/link";
import { Users, UserPlus, ChevronRight, Lightbulb } from "lucide-react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const userOptions = [
  {
    href: "/admin/users",
    title: "All Users",
    description: "View and manage all registered users",
    icon: Users,
  },
  {
    href: "/admin/invites",
    title: "Invitations",
    description: "Manage user invitations and access control",
    icon: UserPlus,
  },
  {
    href: "/admin/ideas",
    title: "Idea Submissions",
    description: "Review ideas submitted by potential Explorers",
    icon: Lightbulb,
  },
];

export default function AdminPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">User Management</h1>
        <p className="text-muted-foreground">
          Manage users and invitations
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {userOptions.map((option) => (
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
