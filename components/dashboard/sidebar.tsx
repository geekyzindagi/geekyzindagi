"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  ChevronLeft,
  ChevronRight,
  Settings,
  Lightbulb,
  Bell,
  BarChart3,
  Compass,
  Milestone,
  Briefcase,
  StickyNote,
  KanbanSquare,
  CalendarDays,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Logo } from "@/components/ui/logo";

interface SidebarProps {
  isAdmin: boolean;
}

export function Sidebar({ isAdmin }: SidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      href: "/progress",
      label: "Progress",
      icon: Milestone,
    },
  ];

  const workspaceItems = [
    {
      href: "/workspace",
      label: "Workspace",
      icon: Briefcase,
    },
    {
      href: "/workspace/notes",
      label: "Notes",
      icon: StickyNote,
    },
    {
      href: "/workspace/tasks",
      label: "Tasks",
      icon: KanbanSquare,
    },
    {
      href: "/workspace/calendar",
      label: "Calendar",
      icon: CalendarDays,
    },
  ];

  const adminNavItems = [
    {
      href: "/admin/users",
      label: "Users",
      icon: Users,
    },
    {
      href: "/admin/ideas",
      label: "Ideas",
      icon: Lightbulb,
    },
    {
      href: "/admin/requests",
      label: "Requests",
      icon: Bell,
    },
    {
      href: "/admin/analytics",
      label: "Analytics",
      icon: BarChart3,
    },
    {
      href: "/admin/wizard",
      label: "Explorers",
      icon: Compass,
    },
  ];

  const bottomNavItems = [
    {
      href: "/settings",
      label: "Settings",
      icon: Settings,
    },
  ];

  const NavItem = ({
    href,
    label,
    icon: Icon,
  }: {
    href: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
  }) => {
    const isActive = pathname === href || pathname.startsWith(href + "/");
    return (
      <Link
        href={href}
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent",
          isActive
            ? "bg-accent text-accent-foreground font-medium"
            : "text-muted-foreground hover:text-foreground",
          collapsed && "justify-center px-2"
        )}
        title={collapsed ? label : undefined}
      >
        <Icon className="h-4 w-4 shrink-0" />
        {!collapsed && <span>{label}</span>}
      </Link>
    );
  };

  return (
    <aside
      className={cn(
        "hidden md:block h-screen border-r bg-background transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className={cn(
          "flex h-16 items-center border-b px-4",
          collapsed ? "justify-center" : "justify-between"
        )}>
          {!collapsed && (
            <Logo href="/dashboard" />
          )}
          {collapsed && (
            <Link href="/dashboard" className="text-xl font-black bg-gradient-to-br from-indigo-500 to-pink-500 bg-clip-text text-transparent">
              GZ
            </Link>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-4 overflow-y-auto">
          {navItems.map((item) => (
            <NavItem key={item.href} {...item} />
          ))}

          {/* Workspace Section */}
          {!collapsed && (
            <div className="pt-4 pb-1">
              <span className="px-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/50">
                Workspace
              </span>
            </div>
          )}
          {collapsed && <div className="my-2 border-t" />}
          {workspaceItems.map((item) => (
            <NavItem key={item.href} {...item} />
          ))}

          {isAdmin && (
            <>
              {!collapsed && (
                <div className="pt-4 pb-1">
                  <span className="px-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/50">
                    Admin
                  </span>
                </div>
              )}
              {collapsed && <div className="my-2 border-t" />}
              {adminNavItems.map((item) => (
                <NavItem key={item.href} {...item} />
              ))}
            </>
          )}
        </nav>

        {/* Bottom Navigation */}
        <div className="border-t p-4 space-y-1">
          {bottomNavItems.map((item) => (
            <NavItem key={item.href} {...item} />
          ))}
          <Button
            variant="ghost"
            size="sm"
            className={cn("w-full", collapsed ? "px-2" : "")}
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <>
                <ChevronLeft className="h-4 w-4 mr-2" />
                <span>Collapse</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </aside>
  );
}
