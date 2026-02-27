"use client";

import { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import type { CalendarEvent } from "@/store/slices/workspaceSlice";

const EVENT_COLORS = [
    { name: "blue", class: "bg-blue-500" },
    { name: "green", class: "bg-emerald-500" },
    { name: "red", class: "bg-red-500" },
    { name: "purple", class: "bg-purple-500" },
    { name: "orange", class: "bg-orange-500" },
    { name: "pink", class: "bg-pink-500" },
];

interface EventEditorProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    event?: CalendarEvent | null;
    defaultDate?: Date;
    onSave: (data: {
        title: string;
        description?: string;
        startDate: string;
        endDate?: string;
        allDay: boolean;
        color?: string;
    }) => void;
    onDelete?: (id: string) => void;
}

export function EventEditor({
    open,
    onOpenChange,
    event,
    defaultDate,
    onSave,
    onDelete,
}: EventEditorProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endDate, setEndDate] = useState("");
    const [endTime, setEndTime] = useState("");
    const [allDay, setAllDay] = useState(false);
    const [color, setColor] = useState("blue");

    useEffect(() => {
        if (event) {
            setTitle(event.title);
            setDescription(event.description || "");
            const start = new Date(event.startDate);
            setStartDate(start.toISOString().split("T")[0]);
            setStartTime(start.toTimeString().slice(0, 5));
            if (event.endDate) {
                const end = new Date(event.endDate);
                setEndDate(end.toISOString().split("T")[0]);
                setEndTime(end.toTimeString().slice(0, 5));
            } else {
                setEndDate("");
                setEndTime("");
            }
            setAllDay(event.allDay);
            setColor(event.color || "blue");
        } else {
            setTitle("");
            setDescription("");
            const d = defaultDate || new Date();
            setStartDate(d.toISOString().split("T")[0]);
            setStartTime("09:00");
            setEndDate("");
            setEndTime("");
            setAllDay(false);
            setColor("blue");
        }
    }, [event, defaultDate, open]);

    const handleSave = () => {
        if (!title.trim() || !startDate) return;

        const startISO = allDay
            ? `${startDate}T00:00:00.000Z`
            : `${startDate}T${startTime || "00:00"}:00.000Z`;

        let endISO: string | undefined;
        if (endDate) {
            endISO = allDay
                ? `${endDate}T23:59:59.000Z`
                : `${endDate}T${endTime || "23:59"}:00.000Z`;
        }

        onSave({
            title: title.trim(),
            description: description.trim() || undefined,
            startDate: startISO,
            endDate: endISO,
            allDay,
            color,
        });
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>{event ? "Edit Event" : "New Event"}</DialogTitle>
                </DialogHeader>

                <div className="space-y-4 py-2">
                    <Input
                        placeholder="Event title..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="text-base font-medium"
                        autoFocus
                    />

                    <Textarea
                        placeholder="Description (optional)..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="min-h-[60px] resize-none text-sm"
                    />

                    {/* All day toggle */}
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={allDay}
                            onChange={(e) => setAllDay(e.target.checked)}
                            className="rounded border-input"
                        />
                        <span className="text-sm">All day event</span>
                    </label>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                            <label className="text-xs text-muted-foreground">Start Date</label>
                            <Input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="h-9"
                            />
                        </div>
                        {!allDay && (
                            <div className="space-y-1.5">
                                <label className="text-xs text-muted-foreground">Start Time</label>
                                <Input
                                    type="time"
                                    value={startTime}
                                    onChange={(e) => setStartTime(e.target.value)}
                                    className="h-9"
                                />
                            </div>
                        )}
                        <div className="space-y-1.5">
                            <label className="text-xs text-muted-foreground">End Date</label>
                            <Input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="h-9"
                            />
                        </div>
                        {!allDay && (
                            <div className="space-y-1.5">
                                <label className="text-xs text-muted-foreground">End Time</label>
                                <Input
                                    type="time"
                                    value={endTime}
                                    onChange={(e) => setEndTime(e.target.value)}
                                    className="h-9"
                                />
                            </div>
                        )}
                    </div>

                    {/* Color picker */}
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground mr-1">Color:</span>
                        {EVENT_COLORS.map((c) => (
                            <button
                                key={c.name}
                                onClick={() => setColor(c.name)}
                                className={cn(
                                    "h-6 w-6 rounded-full transition-all",
                                    c.class,
                                    color === c.name
                                        ? "ring-2 ring-primary ring-offset-2 ring-offset-background scale-110"
                                        : "hover:scale-110"
                                )}
                            />
                        ))}
                    </div>
                </div>

                <DialogFooter className="flex justify-between">
                    <div>
                        {event && onDelete && (
                            <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => { onDelete(event.id); onOpenChange(false); }}
                            >
                                Delete
                            </Button>
                        )}
                    </div>
                    <div className="flex gap-2">
                        <Button variant="ghost" onClick={() => onOpenChange(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleSave} disabled={!title.trim() || !startDate}>
                            {event ? "Update" : "Create"}
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
