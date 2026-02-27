"use client";

import { Calendar, Trash2, GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import type { Task, TaskPriority, TaskStatusType } from "@/store/slices/workspaceSlice";

const priorityConfig: Record<TaskPriority, { label: string; class: string }> = {
    0: { label: "Low", class: "bg-slate-500/10 text-slate-400 border-slate-500/20" },
    1: { label: "Med", class: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
    2: { label: "High", class: "bg-red-500/10 text-red-400 border-red-500/20" },
};

const labelColors = [
    "bg-blue-500/20 text-blue-300",
    "bg-emerald-500/20 text-emerald-300",
    "bg-violet-500/20 text-violet-300",
    "bg-pink-500/20 text-pink-300",
    "bg-cyan-500/20 text-cyan-300",
];

interface KanbanCardProps {
    task: Task;
    onEdit: (task: Task) => void;
    onDelete: (id: string) => void;
}

export function KanbanCard({ task, onEdit, onDelete }: KanbanCardProps) {
    const priority = priorityConfig[task.priority];

    return (
        <div
            draggable
            onDragStart={(e) => {
                e.dataTransfer.setData("taskId", task.id);
                e.dataTransfer.effectAllowed = "move";
                (e.target as HTMLElement).classList.add("opacity-40", "scale-95");
            }}
            onDragEnd={(e) => {
                (e.target as HTMLElement).classList.remove("opacity-40", "scale-95");
            }}
            onClick={() => onEdit(task)}
            className={cn(
                "group relative bg-card border rounded-lg p-3 cursor-grab active:cursor-grabbing",
                "hover:border-primary/30 hover:shadow-md transition-all duration-200",
                task.status === "DONE" && "opacity-60"
            )}
        >
            {/* Drag handle */}
            <GripVertical className="absolute top-3 left-1 h-3.5 w-3.5 text-muted-foreground/30 opacity-0 group-hover:opacity-100 transition-opacity" />

            {/* Delete button */}
            <button
                onClick={(e) => { e.stopPropagation(); onDelete(task.id); }}
                className="absolute top-2 right-2 p-1 rounded opacity-0 group-hover:opacity-100 hover:bg-destructive/10 transition-all"
            >
                <Trash2 className="h-3 w-3 text-destructive/60" />
            </button>

            <div className="pl-3 space-y-2">
                {/* Title */}
                <p className={cn(
                    "text-sm font-medium leading-tight pr-6",
                    task.status === "DONE" && "line-through"
                )}>
                    {task.title}
                </p>

                {/* Labels */}
                {task.labels.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                        {task.labels.map((label, i) => (
                            <span
                                key={label}
                                className={cn(
                                    "px-1.5 py-0.5 rounded text-[10px] font-medium",
                                    labelColors[i % labelColors.length]
                                )}
                            >
                                {label}
                            </span>
                        ))}
                    </div>
                )}

                {/* Footer: priority + due date */}
                <div className="flex items-center justify-between pt-1">
                    <Badge
                        variant="outline"
                        className={cn("text-[10px] px-1.5 py-0", priority.class)}
                    >
                        {priority.label}
                    </Badge>

                    {task.dueDate && (
                        <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                            <Calendar className="h-2.5 w-2.5" />
                            {new Date(task.dueDate).toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "short",
                            })}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}
