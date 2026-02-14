"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2, ShieldCheck, ShieldOff, Copy, Download, Smartphone, Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  mfaSetupSchema,
  type MfaSetupInput,
} from "@/lib/validations/auth";
import { apiClient } from "@/lib/api-client";

export default function MfaSettingsPage() {
  const { user, updateUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  // MFA Setup State
  const [showMfaSetup, setShowMfaSetup] = useState(false);
  const [mfaSetupData, setMfaSetupData] = useState<{
    secret: string;
    qrCode: string;
  } | null>(null);
  const [backupCodes, setBackupCodes] = useState<string[] | null>(null);
  const [showDisableMfa, setShowDisableMfa] = useState(false);
  const [disablePassword, setDisablePassword] = useState("");
  const [showDisablePassword, setShowDisablePassword] = useState(false);

  const form = useForm<MfaSetupInput>({
    resolver: zodResolver(mfaSetupSchema),
    defaultValues: {
      token: "",
    },
  });

  async function initiateMfaSetup() {
    setIsLoading(true);
    try {
      const { data } = await apiClient.post<{ secret: string; qrCode: string }>("/auth/mfa/setup");
      setMfaSetupData(data);
      setShowMfaSetup(true);
    } catch (error: unknown) {
      const err = error as { response?: { data?: { error?: string } } };
      toast.error(err.response?.data?.error || "Failed to setup MFA");
    } finally {
      setIsLoading(false);
    }
  }

  async function onMfaSetupSubmit(data: MfaSetupInput) {
    setIsLoading(true);
    try {
      const response = await apiClient.post<{ backupCodes: string[] }>("/auth/mfa/verify-setup", data);
      setBackupCodes(response.data.backupCodes);
      updateUser({ mfaEnabled: true });
      form.reset();
      toast.success("MFA enabled successfully!");
    } catch (error: unknown) {
      const err = error as { response?: { data?: { error?: string } } };
      toast.error(err.response?.data?.error || "Invalid code");
    } finally {
      setIsLoading(false);
    }
  }

  async function disableMfa() {
    setIsLoading(true);
    try {
      await apiClient.post("/auth/mfa/disable", { password: disablePassword });
      updateUser({ mfaEnabled: false });
      setShowDisableMfa(false);
      setDisablePassword("");
      toast.success("MFA disabled successfully");
    } catch (error: unknown) {
      const err = error as { response?: { data?: { error?: string } } };
      toast.error(err.response?.data?.error || "Failed to disable MFA");
    } finally {
      setIsLoading(false);
    }
  }

  function copyBackupCodes() {
    if (backupCodes) {
      navigator.clipboard.writeText(backupCodes.join("\n"));
      toast.success("Backup codes copied to clipboard");
    }
  }

  function downloadBackupCodes() {
    if (backupCodes) {
      const blob = new Blob([backupCodes.join("\n")], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "geekyzindagi-backup-codes.txt";
      a.click();
      URL.revokeObjectURL(url);
    }
  }

  function closeMfaSetup() {
    setShowMfaSetup(false);
    setMfaSetupData(null);
    setBackupCodes(null);
    form.reset();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Two-Factor Authentication</h1>
        <p className="text-muted-foreground">
          Add an extra layer of security to your account
        </p>
      </div>

      {/* Status Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Smartphone className="h-5 w-5" />
              Authentication Status
            </span>
            {user?.mfaEnabled ? (
              <Badge className="bg-green-500 hover:bg-green-600">
                <ShieldCheck className="h-3 w-3 mr-1" />
                Enabled
              </Badge>
            ) : (
              <Badge variant="secondary" className="bg-yellow-100 text-yellow-700 hover:bg-yellow-200">
                <ShieldOff className="h-3 w-3 mr-1" />
                Disabled
              </Badge>
            )}
          </CardTitle>
          <CardDescription>
            Two-factor authentication adds an extra layer of security by requiring a code from your authenticator app when signing in.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {user?.mfaEnabled ? (
            <div className="space-y-4">
              <Alert className="border-green-200 bg-green-50">
                <ShieldCheck className="h-4 w-4 text-green-600" />
                <AlertTitle className="text-green-800">Your account is protected</AlertTitle>
                <AlertDescription className="text-green-700">
                  Two-factor authentication is currently enabled on your account. You&apos;ll need to enter a code from your authenticator app when signing in.
                </AlertDescription>
              </Alert>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowDisableMfa(true)}
                  disabled={isLoading}
                  className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                >
                  <ShieldOff className="mr-2 h-4 w-4" />
                  Disable 2FA
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <Alert className="border-yellow-200 bg-yellow-50">
                <ShieldOff className="h-4 w-4 text-yellow-600" />
                <AlertTitle className="text-yellow-800">Recommended</AlertTitle>
                <AlertDescription className="text-yellow-700">
                  Enable two-factor authentication to add an extra layer of security to your account.
                </AlertDescription>
              </Alert>
              <div className="space-y-2">
                <h4 className="font-medium">How it works:</h4>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li>Download an authenticator app (Google Authenticator, Authy, 1Password)</li>
                  <li>Scan the QR code to link your account</li>
                  <li>Enter codes from the app when signing in</li>
                  <li>Save backup codes in case you lose access to your device</li>
                </ul>
              </div>
              <Button onClick={initiateMfaSetup} disabled={isLoading}>
                {isLoading && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                <ShieldCheck className="mr-2 h-4 w-4" />
                Enable Two-Factor Auth
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* MFA Setup Dialog */}
      <Dialog open={showMfaSetup} onOpenChange={closeMfaSetup}>
        <DialogContent className="max-w-md">
          {!backupCodes ? (
            <>
              <DialogHeader>
                <DialogTitle>Set Up Two-Factor Authentication</DialogTitle>
                <DialogDescription>
                  Scan the QR code with your authenticator app, then enter the
                  6-digit code to verify.
                </DialogDescription>
              </DialogHeader>
              {mfaSetupData && (
                <div className="space-y-4">
                  <div className="flex justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={mfaSetupData.qrCode}
                      alt="QR Code"
                      className="rounded-lg border"
                    />
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground mb-1">
                      Can&apos;t scan? Enter this code manually:
                    </p>
                    <code className="text-sm bg-muted px-2 py-1 rounded">
                      {mfaSetupData.secret}
                    </code>
                  </div>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onMfaSetupSubmit)}
                      className="space-y-4"
                    >
                      <FormField
                        control={form.control}
                        name="token"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Verification Code</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="000000"
                                maxLength={6}
                                {...field}
                                disabled={isLoading}
                                className="text-center text-2xl tracking-widest"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="submit"
                        className="w-full"
                        disabled={isLoading}
                      >
                        {isLoading && (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Verify and Enable
                      </Button>
                    </form>
                  </Form>
                </div>
              )}
            </>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>Save Your Backup Codes</DialogTitle>
                <DialogDescription>
                  Store these codes safely. You can use them to access your
                  account if you lose your authenticator device.
                </DialogDescription>
              </DialogHeader>
              <Alert variant="destructive">
                <AlertTitle>Important!</AlertTitle>
                <AlertDescription>
                  These codes will only be shown once. Save them now!
                </AlertDescription>
              </Alert>
              <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                <div className="grid grid-cols-2 gap-2">
                  {backupCodes.map((code, i) => (
                    <div key={i} className="text-center">
                      {code}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={copyBackupCodes}>
                  <Copy className="mr-2 h-4 w-4" />
                  Copy
                </Button>
                <Button variant="outline" className="flex-1" onClick={downloadBackupCodes}>
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </div>
              <DialogFooter>
                <Button onClick={closeMfaSetup} className="w-full">
                  I&apos;ve Saved My Codes
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Disable MFA Dialog */}
      <Dialog open={showDisableMfa} onOpenChange={setShowDisableMfa}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Disable Two-Factor Authentication</DialogTitle>
            <DialogDescription>
              Enter your password to disable two-factor authentication. This
              will make your account less secure.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="relative">
              <Input
                type={showDisablePassword ? "text" : "password"}
                placeholder="Enter your password"
                value={disablePassword}
                onChange={(e) => setDisablePassword(e.target.value)}
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowDisablePassword(!showDisablePassword)}
              >
                {showDisablePassword ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDisableMfa(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={disableMfa}
              disabled={!disablePassword || isLoading}
            >
              {isLoading && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Disable 2FA
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
