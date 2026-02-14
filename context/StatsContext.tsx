
"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type StatsContextType = {
    refreshKey: number;
    triggerRefresh: () => void;
};

const StatsContext = createContext<StatsContextType | undefined>(undefined);

export function StatsProvider({ children }: { children: ReactNode }) {
    const [refreshKey, setRefreshKey] = useState(0);

    const triggerRefresh = () => {
        setRefreshKey((prev) => prev + 1);
    };

    return (
        <StatsContext.Provider value={{ refreshKey, triggerRefresh }}>
            {children}
        </StatsContext.Provider>
    );
}

export const useStats = () => {
    const context = useContext(StatsContext);
    // Optional: return partial/dummy context if not wrapped, to avoid breaking other usages?
    // But for now, let's assume it should be wrapped if used.
    // Actually, CommunityStats might be used elsewhere. Let's make it safe.
    if (!context) {
        return { refreshKey: 0, triggerRefresh: () => { } };
    }
    return context;
};
