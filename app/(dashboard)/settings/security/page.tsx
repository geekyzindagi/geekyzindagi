"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2, ShieldCheck, ShieldOff, Copy, Download, Eye, EyeOff } from "lucide-react";

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
import {
  changePasswordSchema,
  mfaSetupSchema,
  type ChangePasswordInput,
  type MfaSetupInput,
} from "@/lib/validations/auth";
import { apiClient } from "@/lib/axios";

export default function SecuritySettingsPage() {
  const { data: session, update } = useSession();
  const [isPasswordLoading, setIsPasswordLoading] = useState(false);
  const [isMfaLoading, setIsMfaLoading] = useState(false);

  // MFA Setup State
  const [showMfaSetup, setShowMfaSetup] = useState(false);
  const [mfaSetupData, setMfaSetupData] = useState<{
    secret: string;
    qrCode: string;
  } | null>(null);
  const [backupCodes, setBackupCodes] = useState<string[] | null>(null);
  const [showDisableMfa, setShowDisableMfa] = useState(false);
  const [disablePassword, setDisablePassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const passwordForm = useForm<ChangePasswordInput>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const mfaForm = useForm<MfaSetupInput>({
    resolver: zodResolver(mfaSetupSchema),
    defaultValues: {
      token: "",
    },
  });

  async function onPasswordSubmit(data: ChangePasswordInput) {
    setIsPasswordLoading(true);
    try {
      await apiClient.post("/auth/change-password", data);
      toast.success("Password changed successfully");
      passwordForm.reset();
    } catch (error: unknown) {
      const err = error as { response?: { data?: { error?: string } } };
      toast.error(err.response?.data?.error || "Failed to change password");
    } finally {
      setIsPasswordLoading(false);
    }
  }

  async function initiateMfaSetup() {
    setIsMfaLoading(true);
    try {
      const { data } = await apiClient.post<{ secret: string; qrCode: string }>("/auth/mfa/setup");
      setMfaSetupData(data);
      setShowMfaSetup(true);
    } catch (error: unknown) {
      const err = error as { response?: { data?: { error?: string } } };
      toast.error(err.response?.data?.error || "Failed to setup MFA");
    } finally {
      setIsMfaLoading(false);
    }
  }

  async function onMfaSetupSubmit(data: MfaSetupInput) {
    setIsMfaLoading(true);
    try {
      const response = await apiClient.post<{ backupCodes: string[] }>("/auth/mfa/verify-setup", data);
      setBackupCodes(response.data.backupCodes);
      await update({ mfaEnabled: true });
      mfaForm.reset();
      toast.success("MFA enabled successfully!");
    } catch (error: unknown) {
      const err = error as { response?: { data?: { error?: string } } };
      toast.error(err.response?.data?.error || "Invalid code");
    } finally {
      setIsMfaLoading(false);
    }
  }

  async function disableMfa() {
    setIsMfaLoading(true);
    try {
      await apiClient.post("/auth/mfa/disable", { password: disablePassword });
      await update({ mfaEnabled: false });
      setShowDisableMfa(false);
      setDisablePassword("");
      toast.success("MFA disabled successfully");
    } catch (error: unknown) {
      const err = error as { response?: { data?: { error?: string } } };
      toast.error(err.response?.data?.error || "Failed to disable MFA");
    } finally {
      setIsMfaLoading(false);
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
    mfaForm.reset();
  }

  return (
    <div className="space-y-6">
      {/* Password Change Card */}
      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>
            Update your password to keep your account secure
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...passwordForm}>
            <form
              onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
              className="space-y-4"
            >
              <FormField
                control={passwordForm.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showCurrentPassword ? "text" : "password"}
                          placeholder="••••••••"
                          {...field}
                          disabled={isPasswordLoading}
                          className="pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          disabled={isPasswordLoading}
                        >
                          {showCurrentPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={passwordForm.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showNewPassword ? "text" : "password"}
                          placeholder="••••••••••••"
                          {...field}
                          disabled={isPasswordLoading}
                          className="pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          disabled={isPasswordLoading}
                        >
                          {showNewPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={passwordForm.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm New Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="••••••••••••"
                          {...field}
                          disabled={isPasswordLoading}
                          className="pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          disabled={isPasswordLoading}
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="text-xs text-muted-foreground">
                Password must be at least 12 characters with uppercase,
                lowercase, number, and special character.
              </div>
              <Button type="submit" disabled={isPasswordLoading}>
                {isPasswordLoading && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Update Password
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* MFA Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Two-Factor Authentication
            {session?.user?.mfaEnabled ? (
              <ShieldCheck className="h-5 w-5 text-green-500" />
            ) : (
              <ShieldOff className="h-5 w-5 text-yellow-500" />
            )}
          </CardTitle>
          <CardDescription>
            Add an extra layer of security to your account using an
            authenticator app
          </CardDescription>
        </CardHeader>
        <CardContent>
          {session?.user?.mfaEnabled ? (
            <div className="space-y-4">
              <Alert>
                <ShieldCheck className="h-4 w-4" />
                <AlertTitle>Two-factor authentication is enabled</AlertTitle>
                <AlertDescription>
                  Your account is protected with an authenticator app.
                </AlertDescription>
              </Alert>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowDisableMfa(true)}
                  disabled={isMfaLoading}
                >
                  Disable 2FA
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Use an authenticator app like Google Authenticator, Authy, or
                1Password to generate one-time codes.
              </p>
              <Button onClick={initiateMfaSetup} disabled={isMfaLoading}>
                {isMfaLoading && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
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
                  <Form {...mfaForm}>
                    <form
                      onSubmit={mfaForm.handleSubmit(onMfaSetupSubmit)}
                      className="space-y-4"
                    >
                      <FormField
                        control={mfaForm.control}
                        name="token"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Verification Code</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="000000"
                                maxLength={6}
                                {...field}
                                disabled={isMfaLoading}
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
                        disabled={isMfaLoading}
                      >
                        {isMfaLoading && (
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
            <Input
              type="password"
              placeholder="Enter your password"
              value={disablePassword}
              onChange={(e) => setDisablePassword(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDisableMfa(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={disableMfa}
              disabled={!disablePassword || isMfaLoading}
            >
              {isMfaLoading && (
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
