"use client";

import { useEffect, useState } from "react";
import { Plus, CalendarDays, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CalendarView } from "@/components/workspace/calendar-view";
import { EventEditor } from "@/components/workspace/event-editor";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
    fetchCalendarEvents,
    createCalendarEvent,
    updateCalendarEvent,
    deleteCalendarEvent,
    type CalendarEvent,
} from "@/store/slices/workspaceSlice";

export default function CalendarPage() {
    const dispatch = useAppDispatch();
    const { events, eventsLoading, eventsError } = useAppSelector((s) => s.workspace);

    const [editorOpen, setEditorOpen] = useState(false);
    const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

    useEffect(() => {
        dispatch(fetchCalendarEvents());
    }, [dispatch]);

    const handleDayClick = (date: Date) => {
        setEditingEvent(null);
        setSelectedDate(date);
        setEditorOpen(true);
    };

    const handleEventClick = (event: CalendarEvent) => {
        setEditingEvent(event);
        setSelectedDate(undefined);
        setEditorOpen(true);
    };

    const handleSave = (data: {
        title: string;
        description?: string;
        startDate: string;
        endDate?: string;
        allDay: boolean;
        color?: string;
    }) => {
        if (editingEvent) {
            dispatch(updateCalendarEvent({ id: editingEvent.id, ...data }));
        } else {
            dispatch(createCalendarEvent(data));
        }
        setEditingEvent(null);
    };

    const handleDelete = (id: string) => {
        dispatch(deleteCalendarEvent(id));
    };

    if (eventsLoading && events.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2">
                        <CalendarDays className="h-6 w-6 text-emerald-500" />
                        <h1 className="text-2xl font-bold tracking-tight">Calendar</h1>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                        {events.length} event{events.length !== 1 ? "s" : ""} scheduled
                    </p>
                </div>
                <Button
                    onClick={() => {
                        setEditingEvent(null);
                        setSelectedDate(new Date());
                        setEditorOpen(true);
                    }}
                    className="gap-2"
                >
                    <Plus className="h-4 w-4" />
                    New Event
                </Button>
            </div>

            {/* Error */}
            {eventsError && (
                <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
                    {eventsError}
                </div>
            )}

            {/* Calendar */}
            <CalendarView
                events={events}
                onDayClick={handleDayClick}
                onEventClick={handleEventClick}
            />

            {/* Event Editor Dialog */}
            <EventEditor
                open={editorOpen}
                onOpenChange={setEditorOpen}
                event={editingEvent}
                defaultDate={selectedDate}
                onSave={handleSave}
                onDelete={handleDelete}
            />
        </div>
    );
}
