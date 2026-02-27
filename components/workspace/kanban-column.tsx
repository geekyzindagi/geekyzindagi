"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { KanbanCard } from "./kanban-card";
import type { Task, TaskStatusType } from "@/store/slices/workspaceSlice";

const columnConfig: Record<TaskStatusType, { label: string; accent: string; bg: string }> = {
    TODO: {
        label: "To Do",
        accent: "bg-slate-500",
        bg: "bg-slate-500/5",
    },
    IN_PROGRESS: {
        label: "In Progress",
        accent: "bg-blue-500",
        bg: "bg-blue-500/5",
    },
    IN_REVIEW: {
        label: "In Review",
        accent: "bg-amber-500",
        bg: "bg-amber-500/5",
    },
    DONE: {
        label: "Done",
        accent: "bg-emerald-500",
        bg: "bg-emerald-500/5",
    },
};

interface KanbanColumnProps {
    status: TaskStatusType;
    tasks: Task[];
    onEdit: (task: Task) => void;
    onDelete: (id: string) => void;
    onDrop: (taskId: string, newStatus: TaskStatusType) => void;
    onQuickAdd: (status: TaskStatusType) => void;
}

export function KanbanColumn({ status, tasks, onEdit, onDelete, onDrop, onQuickAdd }: KanbanColumnProps) {
    const [isDragOver, setIsDragOver] = useState(false);
    const config = columnConfig[status];

    return (
        <div
            className={cn(
                "flex flex-col min-h-[400px] rounded-xl border transition-all duration-200",
                config.bg,
                isDragOver && "ring-2 ring-primary/30 border-primary/40"
            )}
            onDragOver={(e) => {
                e.preventDefault();
                e.dataTransfer.dropEffect = "move";
                setIsDragOver(true);
            }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={(e) => {
                e.preventDefault();
                setIsDragOver(false);
                const taskId = e.dataTransfer.getData("taskId");
                if (taskId) onDrop(taskId, status);
            }}
        >
            {/* Column Header */}
            <div className="flex items-center justify-between p-3 pb-2">
                <div className="flex items-center gap-2">
                    <div className={cn("h-2.5 w-2.5 rounded-full", config.accent)} />
                    <h3 className="text-sm font-semibold">{config.label}</h3>
                    <span className="text-xs text-muted-foreground bg-muted rounded-full px-2 py-0.5">
                        {tasks.length}
                    </span>
                </div>
                <button
                    onClick={() => onQuickAdd(status)}
                    className="p-1 rounded-md hover:bg-accent transition-colors"
                    title={`Add task to ${config.label}`}
                >
                    <Plus className="h-4 w-4 text-muted-foreground" />
                </button>
            </div>

            {/* Cards */}
            <div className="flex-1 p-2 pt-0 space-y-2 overflow-y-auto">
                {tasks
                    .sort((a, b) => a.order - b.order)
                    .map((task) => (
                        <KanbanCard
                            key={task.id}
                            task={task}
                            onEdit={onEdit}
                            onDelete={onDelete}
                        />
                    ))}

                {/* Empty state */}
                {tasks.length === 0 && (
                    <div className="flex items-center justify-center h-24 border-2 border-dashed rounded-lg text-xs text-muted-foreground/50">
                        Drop tasks here
                    </div>
                )}
            </div>
        </div>
    );
}
