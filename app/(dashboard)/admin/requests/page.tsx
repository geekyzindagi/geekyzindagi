"use client";

import { useEffect, useState } from "react";
import { 
  Calendar, 
  Users, 
  Mail, 
  ExternalLink, 
  MessageSquare, 
  CheckCircle2, 
  Clock,
  Trash2,
  ChevronRight,
  Filter
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { format } from "date-fns";

type RequestStatus = "PENDING" | "REVIEWED" | "ACCEPTED" | "REJECTED";

interface BaseRequest {
  id: string;
  name: string;
  email: string;
  message: string;
  status: RequestStatus;
  createdAt: string;
}

interface EventRequest extends BaseRequest {
  eventType: string;
  expectedDate?: string;
  location?: string;
}

interface MentorshipRequest extends BaseRequest {
  role: string;
  portfolio?: string;
}

export default function AdminRequestsPage() {
  const [events, setEvents] = useState<EventRequest[]>([]);
  const [mentorship, setMentorship] = useState<MentorshipRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchRequests() {
    try {
      const res = await fetch("/api/admin/requests");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setEvents(data.events);
      setMentorship(data.mentorship);
    } catch (error) {
      toast.error("Failed to load community requests.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchRequests();
  }, []);

  const StatusBadge = ({ status }: { status: RequestStatus }) => {
    const variants: Record<RequestStatus, string> = {
      PENDING: "bg-yellow-100 text-yellow-700 hover:bg-yellow-100",
      REVIEWED: "bg-blue-100 text-blue-700 hover:bg-blue-100",
      ACCEPTED: "bg-green-100 text-green-700 hover:bg-green-100",
      REJECTED: "bg-red-100 text-red-700 hover:bg-red-100",
    };
    return (
      <Badge variant="secondary" className={variants[status]}>
        {status}
      </Badge>
    );
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Community Requests</h1>
        <p className="text-muted-foreground">
          Manage event proposals and mentorship applications from the community.
        </p>
      </div>

      <Tabs defaultValue="events" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-[400px]">
          <TabsTrigger value="events" className="flex gap-2">
            <Calendar className="w-4 h-4" />
            Events ({events.length})
          </TabsTrigger>
          <TabsTrigger value="mentorship" className="flex gap-2">
            <Users className="w-4 h-4" />
            Mentorship ({mentorship.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="events" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {events.length > 0 ? (
              events.map((request) => (
                <Card key={request.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                    <div className="space-y-1">
                      <CardTitle className="text-xl">{request.name}</CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        <Mail className="w-3 h-3" />
                        {request.email}
                      </CardDescription>
                    </div>
                    <StatusBadge status={request.status} />
                  </CardHeader>
                  <CardContent className="space-y-4 pt-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="space-y-1">
                        <p className="font-semibold text-muted-foreground">Type</p>
                        <Badge variant="outline">{request.eventType}</Badge>
                      </div>
                      <div className="space-y-1">
                        <p className="font-semibold text-muted-foreground">Date</p>
                        <p>{request.expectedDate ? format(new Date(request.expectedDate), "PPP") : "TBD"}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-muted-foreground">Message</p>
                      <p className="text-sm border rounded-lg p-3 bg-muted/50 leading-relaxed italic">
                        &quot;{request.message}&quot;
                      </p>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground pt-2">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Received {format(new Date(request.createdAt), "MMM d, h:mm a")}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Review</Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-2 py-20 text-center border-2 border-dashed rounded-3xl">
                <Calendar className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-muted-foreground">No event requests yet.</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="mentorship" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {mentorship.length > 0 ? (
              mentorship.map((request) => (
                <Card key={request.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                    <div className="space-y-1">
                      <CardTitle className="text-xl">{request.name}</CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        <Mail className="w-3 h-3" />
                        {request.email}
                      </CardDescription>
                    </div>
                    <StatusBadge status={request.status} />
                  </CardHeader>
                  <CardContent className="space-y-4 pt-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="space-y-1">
                        <p className="font-semibold text-muted-foreground">Applied Role</p>
                        <Badge variant="outline" className="capitalize">{request.role}</Badge>
                      </div>
                      <div className="space-y-1">
                        <p className="font-semibold text-muted-foreground">Portfolio</p>
                        {request.portfolio ? (
                          <a href={request.portfolio} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-blue-600 hover:underline">
                            View Work <ExternalLink className="w-3 h-3" />
                          </a>
                        ) : (
                          <span className="text-muted-foreground italic">None provided</span>
                        )}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-muted-foreground">Pitch</p>
                      <p className="text-sm border rounded-lg p-3 bg-muted/50 leading-relaxed italic">
                        &quot;{request.message}&quot;
                      </p>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground pt-2">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Received {format(new Date(request.createdAt), "MMM d, h:mm a")}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Approve</Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-2 py-20 text-center border-2 border-dashed rounded-3xl">
                <Users className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-muted-foreground">No mentorship applications yet.</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
