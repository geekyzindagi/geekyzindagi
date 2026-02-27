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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import type { Task, TaskStatusType, TaskPriority } from "@/store/slices/workspaceSlice";

interface TaskEditorProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    task?: Task | null;
    defaultStatus?: TaskStatusType;
    onSave: (data: {
        title: string;
        description?: string;
        status: TaskStatusType;
        priority: TaskPriority;
        dueDate?: string;
        labels: string[];
    }) => void;
}

export function TaskEditor({ open, onOpenChange, task, defaultStatus, onSave }: TaskEditorProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState<TaskStatusType>("TODO");
    const [priority, setPriority] = useState<TaskPriority>(0);
    const [dueDate, setDueDate] = useState("");
    const [labelInput, setLabelInput] = useState("");
    const [labels, setLabels] = useState<string[]>([]);

    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setDescription(task.description || "");
            setStatus(task.status);
            setPriority(task.priority);
            setDueDate(task.dueDate ? task.dueDate.split("T")[0] : "");
            setLabels(task.labels);
        } else {
            setTitle("");
            setDescription("");
            setStatus(defaultStatus || "TODO");
            setPriority(0);
            setDueDate("");
            setLabels([]);
        }
        setLabelInput("");
    }, [task, defaultStatus, open]);

    const handleAddLabel = () => {
        const trimmed = labelInput.trim();
        if (trimmed && !labels.includes(trimmed) && labels.length < 5) {
            setLabels([...labels, trimmed]);
            setLabelInput("");
        }
    };

    const handleSave = () => {
        if (!title.trim()) return;
        onSave({
            title: title.trim(),
            description: description.trim() || undefined,
            status,
            priority,
            dueDate: dueDate || undefined,
            labels,
        });
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>{task ? "Edit Task" : "New Task"}</DialogTitle>
                </DialogHeader>

                <div className="space-y-4 py-2">
                    <Input
                        placeholder="Task title..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="text-base font-medium"
                        autoFocus
                    />

                    <Textarea
                        placeholder="Description (optional)..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="min-h-[80px] resize-none text-sm"
                    />

                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                            <label className="text-xs text-muted-foreground">Status</label>
                            <Select value={status} onValueChange={(v) => setStatus(v as TaskStatusType)}>
                                <SelectTrigger className="h-9">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="TODO">To Do</SelectItem>
                                    <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                                    <SelectItem value="IN_REVIEW">In Review</SelectItem>
                                    <SelectItem value="DONE">Done</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs text-muted-foreground">Priority</label>
                            <Select
                                value={String(priority)}
                                onValueChange={(v) => setPriority(Number(v) as TaskPriority)}
                            >
                                <SelectTrigger className="h-9">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="0">Low</SelectItem>
                                    <SelectItem value="1">Medium</SelectItem>
                                    <SelectItem value="2">High</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs text-muted-foreground">Due Date</label>
                        <Input
                            type="date"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            className="h-9"
                        />
                    </div>

                    {/* Labels */}
                    <div className="space-y-1.5">
                        <label className="text-xs text-muted-foreground">Labels</label>
                        <div className="flex gap-2">
                            <Input
                                placeholder="Add a label..."
                                value={labelInput}
                                onChange={(e) => setLabelInput(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddLabel())}
                                className="h-9 flex-1"
                            />
                            <Button variant="outline" size="sm" onClick={handleAddLabel} className="h-9">
                                Add
                            </Button>
                        </div>
                        {labels.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 pt-1">
                                {labels.map((label) => (
                                    <span
                                        key={label}
                                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs cursor-pointer hover:bg-destructive/10 hover:text-destructive transition-colors"
                                        onClick={() => setLabels(labels.filter((l) => l !== label))}
                                        title="Click to remove"
                                    >
                                        {label} ×
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="ghost" onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button onClick={handleSave} disabled={!title.trim()}>
                        {task ? "Update" : "Create"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
