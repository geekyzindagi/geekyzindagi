'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface SelectionGridProps {
    groups: {
        id: string;
        label: string;
        icon: LucideIcon;
        textClass?: string;
        items: string[];
    }[];
    selectedItems: string[];
    onToggle: (item: string) => void;
    title: string;
    description?: string;
}

export default function SelectionGrid({
    groups,
    selectedItems,
    onToggle,
    title,
    description
}: SelectionGridProps) {
    return (
        <div className="space-y-10">
            <div className="text-center space-y-3">
                <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tighter leading-none">
                    {title}
                </h2>
                {description && (
                    <p className="text-gray-500 text-sm md:text-lg font-medium max-w-xl mx-auto">
                        {description}
                    </p>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {groups.map(group => (
                    <div key={group.id} className="space-y-4">
                        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 border-b border-gray-100 pb-2">
                            <group.icon size={14} className={group.textClass} />
                            {group.label}
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {group.items.map((item) => {
                                const isSelected = selectedItems.includes(item);
                                return (
                                    <button
                                        key={item}
                                        onClick={() => onToggle(item)}
                                        className={cn(
                                            "px-3 py-2 rounded-xl border transition-all duration-300 text-xs md:text-sm font-semibold",
                                            isSelected
                                                ? `bg-gray-900 border-gray-900 text-white shadow-lg scale-105`
                                                : "bg-white/50 border-gray-200 text-gray-500 hover:border-gray-400 hover:text-gray-900 hover:bg-white"
                                        )}
                                    >
                                        {item}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
