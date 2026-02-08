"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Loader2, Search, MoreHorizontal, Shield, ShieldOff, Mail, Calendar, CheckCircle, XCircle, UserPlus, Copy, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { apiClient } from "@/lib/axios";

interface User {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  role: string;
  mfaEnabled: boolean;
  emailVerified: Date | null;
  createdAt: string;
}

interface Invite {
  id: string;
  email: string;
  token: string;
  status: "PENDING" | "ACCEPTED" | "EXPIRED";
  expires: string;
  createdAt: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [invites, setInvites] = useState<Invite[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Invite state
  const [showInviteDialog, setShowInviteDialog] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [isInviting, setIsInviting] = useState(false);
  const [inviteLink, setInviteLink] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setIsLoading(true);
    try {
      const [usersRes, invitesRes] = await Promise.all([
        apiClient.get<User[]>("/admin/users"),
        apiClient.get<Invite[]>("/admin/invites")
      ]);
      setUsers(usersRes.data);
      setInvites(invitesRes.data.filter(i => i.status === "PENDING"));
    } catch (error: unknown) {
      toast.error("Failed to load data");
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchUsers() {
    try {
      const { data } = await apiClient.get<User[]>("/admin/users");
      setUsers(data);
    } catch (error: unknown) {
      toast.error("Failed to fetch users");
    }
  }

  async function toggleUserRole(userId: string, currentRole: string) {
    const newRole = currentRole === "ADMIN" ? "USER" : "ADMIN";
    try {
      await apiClient.patch(`/admin/users/${userId}`, { role: newRole });
      setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
      toast.success(`User role updated to ${newRole}`);
    } catch (error: unknown) {
      const err = error as { response?: { data?: { error?: string } } };
      toast.error(err.response?.data?.error || "Failed to update user role");
    }
  }

  async function sendInvite() {
    if (!inviteEmail) return;
    
    setIsInviting(true);
    try {
      const { data } = await apiClient.post<Invite>("/admin/invites", { email: inviteEmail });
      const link = `${window.location.origin}/register?token=${data.token}`;
      setInviteLink(link);
      toast.success("Invite created successfully!");
    } catch (error: unknown) {
      const err = error as { response?: { data?: { error?: string } } };
      toast.error(err.response?.data?.error || "Failed to send invite");
    } finally {
      setIsInviting(false);
    }
  }

  function copyInviteLink() {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    toast.success("Link copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  }

  function closeInviteDialog() {
    setShowInviteDialog(false);
    setInviteEmail("");
    setInviteLink("");
    setCopied(false);
    fetchData(); // Refresh both lists
  }

  const filteredUsers = users.filter(user => 
    user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredInvites = invites.filter(invite => 
    invite.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getInitials = (name: string | null, email: string) => {
    if (name) {
      return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
    }
    return email[0].toUpperCase();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Users</h1>
          <p className="text-sm text-muted-foreground">
            Manage all users in your application
          </p>
        </div>
        <Button onClick={() => setShowInviteDialog(true)}>
          <UserPlus className="h-4 w-4 mr-2" />
          Invite User
        </Button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList>
          <TabsTrigger value="active">Active Users ({users.length})</TabsTrigger>
          <TabsTrigger value="invited">Pending Invites ({invites.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="mt-6 space-y-4">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground border rounded-md">
              {searchQuery ? "No users found matching your search" : "No users found"}
            </div>
          ) : (
            <>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>MFA</TableHead>
                      <TableHead>Verified</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={user.image || undefined} />
                              <AvatarFallback className="text-xs">
                                {getInitials(user.name, user.email)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{user.name || "No name"}</div>
                              <div className="text-sm text-muted-foreground">{user.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={user.role === "ADMIN" || user.role === "SUPER_ADMIN" ? "default" : "secondary"}>
                            {(user.role === "ADMIN" || user.role === "SUPER_ADMIN") && <Shield className="h-3 w-3 mr-1" />}
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {user.mfaEnabled ? (
                            <Badge className="bg-green-100 text-green-700 hover:bg-green-200">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              On
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="text-muted-foreground">
                              <XCircle className="h-3 w-3 mr-1" />
                              Off
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          {user.emailVerified ? (
                            <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200">
                              <Mail className="h-3 w-3 mr-1" />
                              Yes
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="text-muted-foreground">
                              No
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            {new Date(user.createdAt).toLocaleDateString()}
                          </div>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => toggleUserRole(user.id, user.role)}>
                                {user.role === "ADMIN" || user.role === "SUPER_ADMIN" ? (
                                  <>
                                    <ShieldOff className="h-4 w-4 mr-2" />
                                    Remove Admin
                                  </>
                                ) : (
                                  <>
                                    <Shield className="h-4 w-4 mr-2" />
                                    Make Admin
                                  </>
                                )}
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="text-sm text-muted-foreground">
                Showing {filteredUsers.length} of {users.length} users
              </div>
            </>
          )}
        </TabsContent>

        <TabsContent value="invited" className="mt-6 space-y-4">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : filteredInvites.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground border rounded-md">
              {searchQuery ? "No invites found matching your search" : "No pending invites found"}
            </div>
          ) : (
            <>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Email Address</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Expires</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead className="w-[50px] text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredInvites.map((invite) => (
                      <TableRow key={invite.id}>
                        <TableCell>
                          <div className="font-medium">{invite.email}</div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">
                            {invite.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm text-muted-foreground">
                            {new Date(invite.expires).toLocaleDateString()}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm text-muted-foreground">
                            {new Date(invite.createdAt).toLocaleDateString()}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => {
                              const link = `${window.location.origin}/register?token=${invite.token}`;
                              navigator.clipboard.writeText(link);
                              toast.success("Invite link copied!");
                            }}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="text-sm text-muted-foreground">
                Showing {filteredInvites.length} of {invites.length} pending invites
              </div>
            </>
          )}
        </TabsContent>
      </Tabs>

      <Dialog open={showInviteDialog} onOpenChange={closeInviteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite New User</DialogTitle>
            <DialogDescription>
              Send an invitation to allow someone to register on the platform.
            </DialogDescription>
          </DialogHeader>
          
          {!inviteLink ? (
            <div className="space-y-4">
              <div>
                <Input
                  placeholder="Enter email address"
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                />
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={closeInviteDialog}>
                  Cancel
                </Button>
                <Button onClick={sendInvite} disabled={!inviteEmail || isInviting}>
                  {isInviting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                  Create Invite
                </Button>
              </DialogFooter>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-3 bg-muted rounded-md">
                <p className="text-sm font-medium mb-2">Invitation Link:</p>
                <div className="flex gap-2">
                  <Input value={inviteLink} readOnly className="text-xs" />
                  <Button size="icon" variant="outline" onClick={copyInviteLink}>
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Share this link with <strong>{inviteEmail}</strong> to let them register.
              </p>
              <DialogFooter>
                <Button onClick={closeInviteDialog}>Done</Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
