"use client";

import { useEffect, useState } from "react";
import { Plus, KanbanSquare, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { KanbanBoard } from "@/components/workspace/kanban-board";
import { TaskEditor } from "@/components/workspace/task-editor";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    moveTask,
    type Task,
    type TaskStatusType,
    type TaskPriority,
} from "@/store/slices/workspaceSlice";

export default function TasksPage() {
    const dispatch = useAppDispatch();
    const { tasks, tasksLoading, tasksError } = useAppSelector((s) => s.workspace);

    const [editorOpen, setEditorOpen] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [defaultStatus, setDefaultStatus] = useState<TaskStatusType>("TODO");

    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]);

    const handleTaskUpdate = (id: string, updates: Partial<Task>) => {
        if (updates.status) {
            // Optimistic drag-and-drop
            dispatch(moveTask({ taskId: id, newStatus: updates.status }));
            dispatch(updateTask({ id, status: updates.status }));
        } else {
            dispatch(updateTask({ id, ...updates }));
        }
    };

    const handleTaskDelete = (id: string) => {
        dispatch(deleteTask(id));
    };

    const handleTaskEdit = (task: Task) => {
        setEditingTask(task);
        setEditorOpen(true);
    };

    const handleQuickAdd = (status: TaskStatusType) => {
        setEditingTask(null);
        setDefaultStatus(status);
        setEditorOpen(true);
    };

    const handleSave = (data: {
        title: string;
        description?: string;
        status: TaskStatusType;
        priority: TaskPriority;
        dueDate?: string;
        labels: string[];
    }) => {
        if (editingTask) {
            dispatch(updateTask({ id: editingTask.id, ...data }));
        } else {
            dispatch(createTask(data));
        }
        setEditingTask(null);
    };

    const statusCounts = {
        TODO: tasks.filter((t) => t.status === "TODO").length,
        IN_PROGRESS: tasks.filter((t) => t.status === "IN_PROGRESS").length,
        IN_REVIEW: tasks.filter((t) => t.status === "IN_REVIEW").length,
        DONE: tasks.filter((t) => t.status === "DONE").length,
    };

    if (tasksLoading && tasks.length === 0) {
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
                        <KanbanSquare className="h-6 w-6 text-blue-500" />
                        <h1 className="text-2xl font-bold tracking-tight">Tasks</h1>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                        {tasks.length} task{tasks.length !== 1 ? "s" : ""} ·{" "}
                        <span className="text-emerald-500">{statusCounts.DONE} done</span> ·{" "}
                        <span className="text-blue-500">{statusCounts.IN_PROGRESS} in progress</span>
                    </p>
                </div>
                <Button
                    onClick={() => { setEditingTask(null); setDefaultStatus("TODO"); setEditorOpen(true); }}
                    className="gap-2"
                >
                    <Plus className="h-4 w-4" />
                    New Task
                </Button>
            </div>

            {/* Error */}
            {tasksError && (
                <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
                    {tasksError}
                </div>
            )}

            {/* Kanban Board */}
            <KanbanBoard
                tasks={tasks}
                onTaskUpdate={handleTaskUpdate}
                onTaskDelete={handleTaskDelete}
                onTaskEdit={handleTaskEdit}
                onQuickAdd={handleQuickAdd}
            />

            {/* Task Editor Dialog */}
            <TaskEditor
                open={editorOpen}
                onOpenChange={setEditorOpen}
                task={editingTask}
                defaultStatus={defaultStatus}
                onSave={handleSave}
            />
        </div>
    );
}
