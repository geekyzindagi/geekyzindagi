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
import type { Note } from "@/store/slices/workspaceSlice";

const COLORS = [
    { name: "none", class: "bg-background border-2" },
    { name: "yellow", class: "bg-yellow-500" },
    { name: "blue", class: "bg-blue-500" },
    { name: "green", class: "bg-green-500" },
    { name: "pink", class: "bg-pink-500" },
    { name: "purple", class: "bg-purple-500" },
    { name: "orange", class: "bg-orange-500" },
];

interface NoteEditorProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    note?: Note | null;
    onSave: (data: { title: string; content: string; color?: string }) => void;
}

export function NoteEditor({ open, onOpenChange, note, onSave }: NoteEditorProps) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [color, setColor] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (note) {
            setTitle(note.title);
            setContent(note.content);
            setColor(note.color);
        } else {
            setTitle("");
            setContent("");
            setColor(undefined);
        }
    }, [note, open]);

    const handleSave = () => {
        if (!title.trim()) return;
        onSave({ title: title.trim(), content: content.trim(), color });
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>{note ? "Edit Note" : "New Note"}</DialogTitle>
                </DialogHeader>

                <div className="space-y-4 py-2">
                    <Input
                        placeholder="Note title..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="text-base font-medium"
                        autoFocus
                    />

                    <Textarea
                        placeholder="Write your thoughts..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="min-h-[200px] resize-none text-sm"
                    />

                    {/* Color picker */}
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground mr-1">Color:</span>
                        {COLORS.map((c) => (
                            <button
                                key={c.name}
                                onClick={() => setColor(c.name === "none" ? undefined : c.name)}
                                className={cn(
                                    "h-6 w-6 rounded-full transition-all",
                                    c.class,
                                    (color === c.name || (!color && c.name === "none"))
                                        ? "ring-2 ring-primary ring-offset-2 ring-offset-background scale-110"
                                        : "hover:scale-110"
                                )}
                            />
                        ))}
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="ghost" onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button onClick={handleSave} disabled={!title.trim()}>
                        {note ? "Update" : "Create"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
