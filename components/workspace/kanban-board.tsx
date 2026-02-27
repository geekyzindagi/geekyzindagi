"use client";

import { useState } from "react";
import { KanbanColumn } from "./kanban-column";
import type { Task, TaskStatusType } from "@/store/slices/workspaceSlice";

const COLUMNS: TaskStatusType[] = ["TODO", "IN_PROGRESS", "IN_REVIEW", "DONE"];

interface KanbanBoardProps {
    tasks: Task[];
    onTaskUpdate: (id: string, updates: Partial<Task>) => void;
    onTaskDelete: (id: string) => void;
    onTaskEdit: (task: Task) => void;
    onQuickAdd: (status: TaskStatusType) => void;
}

export function KanbanBoard({ tasks, onTaskUpdate, onTaskDelete, onTaskEdit, onQuickAdd }: KanbanBoardProps) {
    const handleDrop = (taskId: string, newStatus: TaskStatusType) => {
        const task = tasks.find((t) => t.id === taskId);
        if (!task || task.status === newStatus) return;
        onTaskUpdate(taskId, { status: newStatus });
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {COLUMNS.map((status) => (
                <KanbanColumn
                    key={status}
                    status={status}
                    tasks={tasks.filter((t) => t.status === status)}
                    onEdit={onTaskEdit}
                    onDelete={onTaskDelete}
                    onDrop={handleDrop}
                    onQuickAdd={onQuickAdd}
                />
            ))}
        </div>
    );
}
