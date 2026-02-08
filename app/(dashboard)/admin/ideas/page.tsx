"use client";

import { useEffect, useState } from "react";
import { 
  Lightbulb, 
  Calendar, 
  User, 
  Mail, 
  Code, 
  Target, 
  Search,
  CheckCircle2,
  Clock,
  MessageSquare,
  ChevronRight
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { apiClient } from "@/lib/axios";

interface Idea {
  id: string;
  name: string;
  email: string | null;
  title: string;
  description: string;
  techStack: string[];
  nextSteps: string;
  lookingFor: string;
  status: string;
  createdAt: string;
}

export default function AdminIdeasPage() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isInviting, setIsInviting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIdea, setSelectedIdea] = useState<Idea | null>(null);

  useEffect(() => {
    fetchIdeas();
  }, []);

  async function fetchIdeas() {
    try {
      const { data } = await apiClient.get<Idea[]>("/ideas");
      // Sort by newest first
      setIdeas(data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    } catch (error) {
      toast.error("Failed to fetch ideas");
    } finally {
      setIsLoading(false);
    }
  }

  const handleInvite = async (id: string) => {
    try {
      setIsInviting(true);
      const { data } = await apiClient.post<{ message: string }>(`/ideas/${id}/invite`);
      toast.success(data.message || "Invite sent successfully!");
      setSelectedIdea(null);
      fetchIdeas(); // Refresh the list
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to send invite");
    } finally {
      setIsInviting(false);
    }
  };

  const filteredIdeas = ideas.filter(
    (idea) =>
      idea.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      idea.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      idea.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PENDING":
        return <Badge variant="secondary" className="bg-amber-100 text-amber-700">Pending</Badge>;
      case "REVIEWED":
        return <Badge variant="secondary" className="bg-blue-100 text-blue-700">Reviewed</Badge>;
      case "CONTACTED":
        return <Badge variant="secondary" className="bg-green-100 text-green-700">Invited</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Idea Explorers</h1>
          <p className="text-muted-foreground">
            Review and manage ideas submitted by potential Explorers
          </p>
        </div>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search ideas..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Idea & Submitter</TableHead>
                <TableHead>Tech Stack</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    Loading ideas...
                  </TableCell>
                </TableRow>
              ) : filteredIdeas.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    No ideas found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredIdeas.map((idea) => (
                  <TableRow key={idea.id} className="group cursor-pointer hover:bg-muted/50" onClick={() => setSelectedIdea(idea)}>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium">{idea.title}</span>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <User className="w-3 h-3" />
                          {idea.name}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {idea.techStack.slice(0, 3).map((tech) => (
                          <Badge key={tech} variant="outline" className="text-[10px] px-1 py-0 h-4">
                            {tech}
                          </Badge>
                        ))}
                        {idea.techStack.length > 3 && (
                          <span className="text-[10px] text-muted-foreground">+{idea.techStack.length - 3}</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">
                      {format(new Date(idea.createdAt), "MMM d, yyyy")}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(idea.status)}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => setSelectedIdea(idea)}>
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Idea Detail Dialog */}
      <Dialog open={!!selectedIdea} onOpenChange={(open) => !open && setSelectedIdea(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedIdea && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb className="w-5 h-5 text-amber-500" />
                  <span className="text-sm font-medium text-amber-500 uppercase tracking-wider">New Submission</span>
                </div>
                <DialogTitle className="text-2xl font-bold">{selectedIdea.title}</DialogTitle>
                <DialogDescription>
                  Submitted on {format(new Date(selectedIdea.createdAt), "PPPP")}
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-6 py-4">
                {/* Contact Info */}
                <div className="grid grid-cols-2 gap-4 border-y py-4">
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground uppercase">Submitter</p>
                      <p className="font-medium">{selectedIdea.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground uppercase">Email</p>
                      <p className="font-medium truncate">{selectedIdea.email || "No email"}</p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h4 className="font-semibold flex items-center gap-2 mb-2 italic">
                    <MessageSquare className="w-4 h-4" /> The Concept
                  </h4>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed bg-muted/30 p-4 rounded-lg border">
                    {selectedIdea.description}
                  </p>
                </div>

                {/* Tech Stack */}
                <div>
                  <h4 className="font-semibold flex items-center gap-2 mb-2 italic">
                    <Code className="w-4 h-4" /> Intended Tech Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedIdea.techStack.map((tech) => (
                      <Badge key={tech} variant="secondary">{tech}</Badge>
                    ))}
                  </div>
                </div>

                {/* Next Steps & Looking For */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold flex items-center gap-2 mb-2 italic">
                      <ChevronRight className="w-4 h-4" /> Next Steps
                    </h4>
                    <p className="text-sm text-muted-foreground bg-muted/30 p-3 rounded-lg border">
                      {selectedIdea.nextSteps}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold flex items-center gap-2 mb-2 italic">
                      <Target className="w-4 h-4" /> Seeking
                    </h4>
                    <p className="text-sm text-muted-foreground bg-muted/30 p-3 rounded-lg border">
                      {selectedIdea.lookingFor === 'feedback' ? 'Feedback & Validation' :
                       selectedIdea.lookingFor === 'collaborators' ? 'Co-founders / Team' :
                       selectedIdea.lookingFor === 'mentorship' ? 'Mentorship' :
                       selectedIdea.lookingFor === 'resources' ? 'Learning Resources' :
                       selectedIdea.lookingFor === 'accountability' ? 'Accountability' : 'Just Sharing'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-6">
                <Button variant="outline" onClick={() => setSelectedIdea(null)}>Close</Button>
                <div className="space-x-2">
                   <Button 
                    disabled={isInviting || selectedIdea.status === 'CONTACTED'} 
                    onClick={() => handleInvite(selectedIdea.id)}
                   >
                     {isInviting ? "Inviting..." : selectedIdea.status === 'CONTACTED' ? "Already Invited" : "Invite as Builder"}
                   </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
