import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import apiClient from "@/lib/api-client";

// ============ TYPES ============

export type TaskPriority = 0 | 1 | 2;
export type TaskStatusType = "TODO" | "IN_PROGRESS" | "IN_REVIEW" | "DONE";

export interface Note {
    id: string;
    title: string;
    content: string;
    color?: string;
    pinned: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface Task {
    id: string;
    title: string;
    description?: string;
    status: TaskStatusType;
    priority: TaskPriority;
    order: number;
    dueDate?: string;
    labels: string[];
    createdAt: string;
    updatedAt: string;
}

export interface CalendarEvent {
    id: string;
    title: string;
    description?: string;
    startDate: string;
    endDate?: string;
    allDay: boolean;
    color?: string;
    createdAt: string;
    updatedAt: string;
}

interface WorkspaceState {
    // Notes
    notes: Note[];
    notesLoading: boolean;
    notesError: string | null;

    // Tasks
    tasks: Task[];
    tasksLoading: boolean;
    tasksError: string | null;

    // Calendar
    events: CalendarEvent[];
    eventsLoading: boolean;
    eventsError: string | null;
}

const initialState: WorkspaceState = {
    notes: [],
    notesLoading: false,
    notesError: null,
    tasks: [],
    tasksLoading: false,
    tasksError: null,
    events: [],
    eventsLoading: false,
    eventsError: null,
};

// ============ NOTES THUNKS ============

export const fetchNotes = createAsyncThunk("workspace/fetchNotes", async () => {
    const res = await apiClient.get<Note[]>("/workspace/notes");
    return res.data;
});

export const createNote = createAsyncThunk(
    "workspace/createNote",
    async (data: { title: string; content: string; color?: string }) => {
        const res = await apiClient.post<Note>("/workspace/notes", data);
        return res.data;
    }
);

export const updateNote = createAsyncThunk(
    "workspace/updateNote",
    async ({ id, ...data }: { id: string; title?: string; content?: string; color?: string | null; pinned?: boolean }) => {
        const res = await apiClient.patch<Note>(`/workspace/notes/${id}`, data);
        return res.data;
    }
);

export const deleteNote = createAsyncThunk(
    "workspace/deleteNote",
    async (id: string) => {
        await apiClient.delete(`/workspace/notes/${id}`);
        return id;
    }
);

// ============ TASKS THUNKS ============

export const fetchTasks = createAsyncThunk("workspace/fetchTasks", async () => {
    const res = await apiClient.get<{ data: Task[]; grouped: Record<string, Task[]> }>("/workspace/tasks");
    return res.data.data;
});

export const createTask = createAsyncThunk(
    "workspace/createTask",
    async (data: {
        title: string;
        description?: string;
        status: TaskStatusType;
        priority: TaskPriority;
        dueDate?: string;
        labels: string[];
    }) => {
        const res = await apiClient.post<Task>("/workspace/tasks", data);
        return res.data;
    }
);

export const updateTask = createAsyncThunk(
    "workspace/updateTask",
    async ({ id, ...data }: {
        id: string;
        title?: string;
        description?: string;
        status?: TaskStatusType;
        priority?: TaskPriority;
        order?: number;
        dueDate?: string | null;
        labels?: string[];
    }) => {
        const res = await apiClient.patch<Task>(`/workspace/tasks/${id}`, data);
        return res.data;
    }
);

export const deleteTask = createAsyncThunk(
    "workspace/deleteTask",
    async (id: string) => {
        await apiClient.delete(`/workspace/tasks/${id}`);
        return id;
    }
);

// ============ CALENDAR THUNKS ============

export const fetchCalendarEvents = createAsyncThunk(
    "workspace/fetchCalendarEvents",
    async (params?: { startDate?: string; endDate?: string }) => {
        const query = new URLSearchParams();
        if (params?.startDate) query.set("startDate", params.startDate);
        if (params?.endDate) query.set("endDate", params.endDate);
        const url = `/workspace/calendar${query.toString() ? `?${query}` : ""}`;
        const res = await apiClient.get<CalendarEvent[]>(url);
        return res.data;
    }
);

export const createCalendarEvent = createAsyncThunk(
    "workspace/createCalendarEvent",
    async (data: {
        title: string;
        description?: string;
        startDate: string;
        endDate?: string;
        allDay: boolean;
        color?: string;
    }) => {
        const res = await apiClient.post<CalendarEvent>("/workspace/calendar", data);
        return res.data;
    }
);

export const updateCalendarEvent = createAsyncThunk(
    "workspace/updateCalendarEvent",
    async ({ id, ...data }: {
        id: string;
        title?: string;
        description?: string;
        startDate?: string;
        endDate?: string | null;
        allDay?: boolean;
        color?: string | null;
    }) => {
        const res = await apiClient.patch<CalendarEvent>(`/workspace/calendar/${id}`, data);
        return res.data;
    }
);

export const deleteCalendarEvent = createAsyncThunk(
    "workspace/deleteCalendarEvent",
    async (id: string) => {
        await apiClient.delete(`/workspace/calendar/${id}`);
        return id;
    }
);

// ============ SLICE ============

export const workspaceSlice = createSlice({
    name: "workspace",
    initialState,
    reducers: {
        // Optimistic update for task drag-and-drop
        moveTask: (state, action: PayloadAction<{ taskId: string; newStatus: TaskStatusType }>) => {
            const task = state.tasks.find((t) => t.id === action.payload.taskId);
            if (task) {
                task.status = action.payload.newStatus;
            }
        },
        // Optimistic toggle pin
        toggleNotePin: (state, action: PayloadAction<string>) => {
            const note = state.notes.find((n) => n.id === action.payload);
            if (note) {
                note.pinned = !note.pinned;
            }
        },
    },
    extraReducers: (builder) => {
        // Notes
        builder
            .addCase(fetchNotes.pending, (state) => { state.notesLoading = true; state.notesError = null; })
            .addCase(fetchNotes.fulfilled, (state, action) => { state.notesLoading = false; state.notes = action.payload; })
            .addCase(fetchNotes.rejected, (state, action) => { state.notesLoading = false; state.notesError = action.error.message || "Failed to load notes"; })
            .addCase(createNote.fulfilled, (state, action) => { state.notes.unshift(action.payload); })
            .addCase(updateNote.fulfilled, (state, action) => {
                const idx = state.notes.findIndex((n) => n.id === action.payload.id);
                if (idx !== -1) state.notes[idx] = action.payload;
            })
            .addCase(deleteNote.fulfilled, (state, action) => {
                state.notes = state.notes.filter((n) => n.id !== action.payload);
            });

        // Tasks
        builder
            .addCase(fetchTasks.pending, (state) => { state.tasksLoading = true; state.tasksError = null; })
            .addCase(fetchTasks.fulfilled, (state, action) => { state.tasksLoading = false; state.tasks = action.payload; })
            .addCase(fetchTasks.rejected, (state, action) => { state.tasksLoading = false; state.tasksError = action.error.message || "Failed to load tasks"; })
            .addCase(createTask.fulfilled, (state, action) => { state.tasks.push(action.payload); })
            .addCase(updateTask.fulfilled, (state, action) => {
                const idx = state.tasks.findIndex((t) => t.id === action.payload.id);
                if (idx !== -1) state.tasks[idx] = action.payload;
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.tasks = state.tasks.filter((t) => t.id !== action.payload);
            });

        // Calendar
        builder
            .addCase(fetchCalendarEvents.pending, (state) => { state.eventsLoading = true; state.eventsError = null; })
            .addCase(fetchCalendarEvents.fulfilled, (state, action) => { state.eventsLoading = false; state.events = action.payload; })
            .addCase(fetchCalendarEvents.rejected, (state, action) => { state.eventsLoading = false; state.eventsError = action.error.message || "Failed to load events"; })
            .addCase(createCalendarEvent.fulfilled, (state, action) => { state.events.push(action.payload); })
            .addCase(updateCalendarEvent.fulfilled, (state, action) => {
                const idx = state.events.findIndex((e) => e.id === action.payload.id);
                if (idx !== -1) state.events[idx] = action.payload;
            })
            .addCase(deleteCalendarEvent.fulfilled, (state, action) => {
                state.events = state.events.filter((e) => e.id !== action.payload);
            });
    },
});

export const { moveTask, toggleNotePin } = workspaceSlice.actions;
export default workspaceSlice.reducer;
