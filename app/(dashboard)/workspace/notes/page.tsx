"use client";

import { useEffect, useState } from "react";
import { Plus, Search, StickyNote, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NoteCard } from "@/components/workspace/note-card";
import { NoteEditor } from "@/components/workspace/note-editor";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
    fetchNotes,
    createNote,
    updateNote,
    deleteNote,
    toggleNotePin,
    type Note,
} from "@/store/slices/workspaceSlice";

export default function NotesPage() {
    const dispatch = useAppDispatch();
    const { notes, notesLoading, notesError } = useAppSelector((s) => s.workspace);

    const [search, setSearch] = useState("");
    const [editorOpen, setEditorOpen] = useState(false);
    const [editingNote, setEditingNote] = useState<Note | null>(null);

    useEffect(() => {
        dispatch(fetchNotes());
    }, [dispatch]);

    const filteredNotes = notes.filter(
        (n) =>
            n.title.toLowerCase().includes(search.toLowerCase()) ||
            n.content.toLowerCase().includes(search.toLowerCase())
    );

    const sortedNotes = [...filteredNotes].sort((a, b) => {
        if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });

    const handleSave = (data: { title: string; content: string; color?: string }) => {
        if (editingNote) {
            dispatch(updateNote({ id: editingNote.id, ...data }));
        } else {
            dispatch(createNote(data));
        }
        setEditingNote(null);
    };

    const handleEdit = (note: Note) => {
        setEditingNote(note);
        setEditorOpen(true);
    };

    const handleDelete = (id: string) => {
        dispatch(deleteNote(id));
    };

    const handleTogglePin = (id: string) => {
        dispatch(toggleNotePin(id));
        const note = notes.find((n) => n.id === id);
        if (note) {
            dispatch(updateNote({ id, pinned: !note.pinned }));
        }
    };

    if (notesLoading && notes.length === 0) {
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
                        <StickyNote className="h-6 w-6 text-amber-500" />
                        <h1 className="text-2xl font-bold tracking-tight">Notes</h1>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                        {notes.length} note{notes.length !== 1 ? "s" : ""} · {notes.filter((n) => n.pinned).length} pinned
                    </p>
                </div>
                <Button
                    onClick={() => { setEditingNote(null); setEditorOpen(true); }}
                    className="gap-2"
                >
                    <Plus className="h-4 w-4" />
                    New Note
                </Button>
            </div>

            {/* Error */}
            {notesError && (
                <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
                    {notesError}
                </div>
            )}

            {/* Search */}
            <div className="relative max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search notes..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-9"
                />
            </div>

            {/* Notes Grid */}
            {sortedNotes.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {sortedNotes.map((note) => (
                        <NoteCard
                            key={note.id}
                            note={note}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            onTogglePin={handleTogglePin}
                        />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="rounded-full bg-muted p-4 mb-4">
                        <StickyNote className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="font-medium text-lg">No notes found</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                        {search ? "Try a different search term" : "Create your first note to get started"}
                    </p>
                </div>
            )}

            {/* Editor Dialog */}
            <NoteEditor
                open={editorOpen}
                onOpenChange={setEditorOpen}
                note={editingNote}
                onSave={handleSave}
            />
        </div>
    );
}
