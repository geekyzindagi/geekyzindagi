"use client";

import { useState, useEffect } from "react";
// import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { Loader2, Link2, Unlink } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { apiClient } from "@/lib/api-client";

interface Account {
  id: string;
  provider: string;
  providerAccountId: string;
}

const providers = [
  {
    id: "google",
    name: "Google",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24">
        <path
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          fill="#4285F4"
        />
        <path
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          fill="#34A853"
        />
        <path
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          fill="#FBBC05"
        />
        <path
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          fill="#EA4335"
        />
      </svg>
    ),
  },
];

export default function ConnectedAccountsPage() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    fetchAccounts();
  }, []);

  async function fetchAccounts() {
    try {
      const { data } = await apiClient.get<{ accounts: Account[] }>("/user/accounts");
      setAccounts(data.accounts);
    } catch {
      toast.error("Failed to load connected accounts");
    } finally {
      setIsLoading(false);
    }
  }

  async function connectAccount(provider: string) {
    setActionLoading(provider);
    try {
      // await signIn(provider, { callbackUrl: "/settings/accounts" });
      toast.error("Social account linking is coming soon!");
    } catch {
      toast.error("Failed to connect account");
    } finally {
      setActionLoading(null);
    }
  }

  async function disconnectAccount(provider: string) {
    setActionLoading(provider);
    try {
      await apiClient.delete(`/user/accounts/${provider}`);
      setAccounts(accounts.filter((a) => a.provider !== provider));
      toast.success(`${provider} account disconnected`);
    } catch (error: unknown) {
      const err = error as { response?: { data?: { error?: string } } };
      toast.error(err.response?.data?.error || "Failed to disconnect account");
    } finally {
      setActionLoading(null);
    }
  }

  function isConnected(providerId: string) {
    return accounts.some((a) => a.provider === providerId);
  }

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Connected Accounts</CardTitle>
          <CardDescription>
            Connect your social accounts for easier sign-in
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {providers.map((provider) => {
            const connected = isConnected(provider.id);
            const loading = actionLoading === provider.id;

            return (
              <div
                key={provider.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="flex items-center gap-4">
                  {provider.icon}
                  <div>
                    <p className="font-medium">{provider.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {connected ? "Connected" : "Not connected"}
                    </p>
                  </div>
                </div>
                {connected ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => disconnectAccount(provider.id)}
                    disabled={loading}
                  >
                    {loading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Unlink className="mr-2 h-4 w-4" />
                    )}
                    Disconnect
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => connectAccount(provider.id)}
                    disabled={loading}
                  >
                    {loading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Link2 className="mr-2 h-4 w-4" />
                    )}
                    Connect
                  </Button>
                )}
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
