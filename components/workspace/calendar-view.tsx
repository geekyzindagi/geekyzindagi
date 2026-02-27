"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import {
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    eachDayOfInterval,
    format,
    isSameMonth,
    isSameDay,
    addMonths,
    subMonths,
    isToday,
    parseISO,
} from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { CalendarEvent } from "@/store/slices/workspaceSlice";

const eventColorMap: Record<string, string> = {
    blue: "bg-blue-500",
    green: "bg-emerald-500",
    red: "bg-red-500",
    purple: "bg-purple-500",
    orange: "bg-orange-500",
    pink: "bg-pink-500",
};

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface CalendarViewProps {
    events: CalendarEvent[];
    onDayClick: (date: Date) => void;
    onEventClick: (event: CalendarEvent) => void;
}

export function CalendarView({ events, onDayClick, onEventClick }: CalendarViewProps) {
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const calendarStart = startOfWeek(monthStart);
    const calendarEnd = endOfWeek(monthEnd);
    const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

    const getEventsForDay = (day: Date) =>
        events.filter((event) => isSameDay(parseISO(event.startDate), day));

    return (
        <div className="rounded-xl border bg-card overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b bg-muted/30">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>

                <div className="flex items-center gap-3">
                    <h2 className="text-lg font-semibold">
                        {format(currentMonth, "MMMM yyyy")}
                    </h2>
                    <Button
                        variant="outline"
                        size="sm"
                        className="h-7 text-xs"
                        onClick={() => setCurrentMonth(new Date())}
                    >
                        Today
                    </Button>
                </div>

                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>

            {/* Weekday headers */}
            <div className="grid grid-cols-7 border-b">
                {WEEKDAYS.map((day) => (
                    <div
                        key={day}
                        className="py-2 text-center text-xs font-medium text-muted-foreground"
                    >
                        {day}
                    </div>
                ))}
            </div>

            {/* Days grid */}
            <div className="grid grid-cols-7">
                {days.map((day, idx) => {
                    const dayEvents = getEventsForDay(day);
                    const isCurrentMonth = isSameMonth(day, currentMonth);
                    const today = isToday(day);

                    return (
                        <div
                            key={idx}
                            onClick={() => onDayClick(day)}
                            className={cn(
                                "min-h-[100px] border-b border-r p-1.5 cursor-pointer transition-colors hover:bg-accent/50",
                                !isCurrentMonth && "bg-muted/20",
                                (idx + 1) % 7 === 0 && "border-r-0"
                            )}
                        >
                            {/* Day number */}
                            <div className="flex items-center justify-between mb-1">
                                <span
                                    className={cn(
                                        "text-xs font-medium h-6 w-6 flex items-center justify-center rounded-full",
                                        today && "bg-primary text-primary-foreground",
                                        !isCurrentMonth && "text-muted-foreground/40"
                                    )}
                                >
                                    {format(day, "d")}
                                </span>
                                {dayEvents.length > 0 && isCurrentMonth && (
                                    <span className="text-[10px] text-muted-foreground">
                                        {dayEvents.length}
                                    </span>
                                )}
                            </div>

                            {/* Events */}
                            <div className="space-y-0.5">
                                {dayEvents.slice(0, 3).map((event) => (
                                    <button
                                        key={event.id}
                                        onClick={(e) => { e.stopPropagation(); onEventClick(event); }}
                                        className={cn(
                                            "w-full text-left px-1.5 py-0.5 rounded text-[10px] font-medium truncate transition-opacity hover:opacity-80",
                                            "text-white",
                                            eventColorMap[event.color || "blue"] || "bg-blue-500"
                                        )}
                                    >
                                        {event.title}
                                    </button>
                                ))}
                                {dayEvents.length > 3 && (
                                    <span className="text-[10px] text-muted-foreground pl-1">
                                        +{dayEvents.length - 3} more
                                    </span>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
