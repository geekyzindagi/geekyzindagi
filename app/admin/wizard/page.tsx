'use client';

import { useState, useEffect } from 'react';
import apiClient from '@/lib/api-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Loader2 } from 'lucide-react';

interface WizardSubmission {
    id: string;
    email?: string;
    realms: string[];
    interests: string[];
    lastStep: string;
    completed: boolean;
    archetype?: string;
    userAgent?: string;
    createdAt: string;
}

export default function WizardAdminPage() {
    const [submissions, setSubmissions] = useState<WizardSubmission[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSubmissions();
    }, []);

    const fetchSubmissions = async () => {
        try {
            const { data } = await apiClient.get<WizardSubmission[]>('/wizard/list');
            setSubmissions(data);
        } catch (error) {
            console.error('Failed to fetch wizard submissions:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex h-[50vh] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Geek Explorer Submissions</h1>
                <div className="text-sm text-muted-foreground">
                    Total: {submissions.length}
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Submissions List</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Email</TableHead>
                                <TableHead>Realms</TableHead>
                                <TableHead>Archetype</TableHead>
                                <TableHead>Interests</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Step</TableHead>
                                <TableHead>Date</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {submissions.map((submission) => (
                                <TableRow key={submission.id}>
                                    <TableCell className="font-medium">
                                        {submission.email || <span className="text-muted-foreground italic">Anonymous</span>}
                                    </TableCell>
                                    <TableCell className="max-w-[150px]">
                                        <div className="flex flex-wrap gap-1">
                                            {submission.realms.slice(0, 3).map((realm) => (
                                                <Badge key={realm} variant="secondary" className="text-[10px] px-1.5 py-0">
                                                    {realm}
                                                </Badge>
                                            ))}
                                            {submission.realms.length > 3 && (
                                                <span className="text-[10px] text-muted-foreground">+{submission.realms.length - 3}</span>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {submission.archetype && (
                                            <Badge variant="outline" className="border-indigo-500 text-indigo-400 text-xs">
                                                {submission.archetype}
                                            </Badge>
                                        )}
                                    </TableCell>
                                    <TableCell className="max-w-[250px]">
                                        <div className="flex flex-wrap gap-1">
                                            {submission.interests.slice(0, 4).map((interest) => (
                                                <Badge key={interest} variant="outline" className="text-[10px] px-1.5 py-0">
                                                    {interest}
                                                </Badge>
                                            ))}
                                            {submission.interests.length > 4 && (
                                                <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                                                    +{submission.interests.length - 4} more
                                                </span>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {submission.completed ? (
                                            <Badge className="bg-green-500 hover:bg-green-600">Completed</Badge>
                                        ) : (
                                            <Badge variant="secondary">In Progress</Badge>
                                        )}
                                    </TableCell>
                                    <TableCell className="capitalize text-muted-foreground">
                                        {submission.lastStep}
                                    </TableCell>
                                    <TableCell className="text-muted-foreground">
                                        {format(new Date(submission.createdAt), 'MMM d, h:mm a')}
                                    </TableCell>
                                </TableRow>
                            ))}
                            {submissions.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={6} className="h-24 text-center">
                                        No submissions found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card >
        </div >
    );
}
