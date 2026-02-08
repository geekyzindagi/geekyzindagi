import { auth } from "@/lib/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, ShieldOff, User, Settings, Link2, Users, ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await auth();
  const isAdmin = ["ADMIN", "SUPER_ADMIN"].includes(session?.user?.role || "");

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back, {session?.user?.name?.split(" ")[0] || "User"}! 👋
        </h1>
        <p className="text-muted-foreground">
          Here&apos;s what&apos;s happening with your account today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Account Status</CardTitle>
            <Badge variant="default" className="bg-green-500">{session?.user?.status}</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold capitalize">
              {session?.user?.role?.toLowerCase().replace("_", " ")}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Your account role
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Two-Factor Auth</CardTitle>
            {session?.user?.mfaEnabled ? (
              <ShieldCheck className="h-5 w-5 text-green-500" />
            ) : (
              <ShieldOff className="h-5 w-5 text-orange-500" />
            )}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {session?.user?.mfaEnabled ? "Enabled" : "Disabled"}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {session?.user?.mfaEnabled
                ? "Your account is protected"
                : "Enable for extra security"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Email</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-medium truncate">
              {session?.user?.email}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Verified email address
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Session</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">Active</div>
            <p className="text-xs text-muted-foreground mt-1">
              Current login session
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Common tasks and settings for your account
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Link
            href="/settings/profile"
            className="group flex flex-col gap-2 rounded-lg border p-4 hover:bg-accent transition-colors"
          >
            <div className="flex items-center justify-between">
              <User className="h-5 w-5 text-primary" />
              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
            </div>
            <div>
              <h3 className="font-medium">Edit Profile</h3>
              <p className="text-sm text-muted-foreground">
                Update your name and photo
              </p>
            </div>
          </Link>

          <Link
            href="/settings/security"
            className="group flex flex-col gap-2 rounded-lg border p-4 hover:bg-accent transition-colors"
          >
            <div className="flex items-center justify-between">
              <ShieldCheck className="h-5 w-5 text-primary" />
              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
            </div>
            <div>
              <h3 className="font-medium">Security Settings</h3>
              <p className="text-sm text-muted-foreground">
                Password and 2FA settings
              </p>
            </div>
          </Link>

          <Link
            href="/settings/accounts"
            className="group flex flex-col gap-2 rounded-lg border p-4 hover:bg-accent transition-colors"
          >
            <div className="flex items-center justify-between">
              <Link2 className="h-5 w-5 text-primary" />
              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
            </div>
            <div>
              <h3 className="font-medium">Connected Accounts</h3>
              <p className="text-sm text-muted-foreground">
                Manage OAuth connections
              </p>
            </div>
          </Link>

          {isAdmin && (
            <Link
              href="/admin/invites"
              className="group flex flex-col gap-2 rounded-lg border p-4 hover:bg-accent transition-colors"
            >
              <div className="flex items-center justify-between">
                <Users className="h-5 w-5 text-primary" />
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
              </div>
              <div>
                <h3 className="font-medium">Send Invites</h3>
                <p className="text-sm text-muted-foreground">
                  Invite new users to join
                </p>
              </div>
            </Link>
          )}
        </CardContent>
      </Card>

      {/* Recent Activity Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            Your latest account activity and actions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="rounded-full bg-muted p-4 mb-4">
              <Settings className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="font-medium">No recent activity</h3>
            <p className="text-sm text-muted-foreground">
              Your recent actions will appear here
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
