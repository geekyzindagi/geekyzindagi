"use client";

import { Pin, PinOff, Trash2, Edit3 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Note } from "@/store/slices/workspaceSlice";

const colorMap: Record<string, string> = {
  yellow: "bg-yellow-500/10 border-yellow-500/30 hover:border-yellow-500/50",
  blue: "bg-blue-500/10 border-blue-500/30 hover:border-blue-500/50",
  green: "bg-green-500/10 border-green-500/30 hover:border-green-500/50",
  pink: "bg-pink-500/10 border-pink-500/30 hover:border-pink-500/50",
  purple: "bg-purple-500/10 border-purple-500/30 hover:border-purple-500/50",
  orange: "bg-orange-500/10 border-orange-500/30 hover:border-orange-500/50",
};

interface NoteCardProps {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
  onTogglePin: (id: string) => void;
}

export function NoteCard({ note, onEdit, onDelete, onTogglePin }: NoteCardProps) {
  const colorClass = note.color ? colorMap[note.color] || "" : "";

  return (
    <div
      className={cn(
        "group relative rounded-xl border p-4 transition-all duration-200 hover:shadow-lg cursor-pointer",
        colorClass || "bg-card border-border hover:border-primary/30"
      )}
      onClick={() => onEdit(note)}
    >
      {/* Pin & Actions */}
      <div className="absolute top-3 right-3 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={(e) => { e.stopPropagation(); onTogglePin(note.id); }}
          className="p-1.5 rounded-lg hover:bg-background/80 transition-colors"
          title={note.pinned ? "Unpin" : "Pin"}
        >
          {note.pinned ? (
            <PinOff className="h-3.5 w-3.5 text-muted-foreground" />
          ) : (
            <Pin className="h-3.5 w-3.5 text-muted-foreground" />
          )}
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onDelete(note.id); }}
          className="p-1.5 rounded-lg hover:bg-destructive/10 transition-colors"
          title="Delete"
        >
          <Trash2 className="h-3.5 w-3.5 text-destructive/70" />
        </button>
      </div>

      {/* Pin indicator */}
      {note.pinned && (
        <Pin className="absolute top-3 right-3 h-3.5 w-3.5 text-primary group-hover:opacity-0 transition-opacity" />
      )}

      {/* Content */}
      <div className="space-y-2">
        <h3 className="font-semibold text-sm leading-tight pr-8 line-clamp-2">
          {note.title}
        </h3>
        <p className="text-xs text-muted-foreground line-clamp-4 whitespace-pre-wrap">
          {note.content}
        </p>
      </div>

      {/* Footer */}
      <div className="mt-3 flex items-center justify-between">
        <span className="text-[10px] text-muted-foreground/60">
          {new Date(note.updatedAt).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
          })}
        </span>
        <Edit3 className="h-3 w-3 text-muted-foreground/40 group-hover:text-primary transition-colors" />
      </div>
    </div>
  );
}
