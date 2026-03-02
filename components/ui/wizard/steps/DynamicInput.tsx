'use client';

import { Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface DynamicInputProps {
    title: string;
    description: string;
    value: string;
    onChange: (value: string) => void;
    onNext: () => void;
    placeholder?: string;
    buttonLabel?: string;
    skipLabel?: string;
    onSkip?: () => void;
    icon?: React.ReactNode;
}

export default function DynamicInput({
    title,
    description,
    value,
    onChange,
    onNext,
    placeholder = "your@email.com",
    buttonLabel = "Continue",
    skipLabel = "Skip for now",
    onSkip,
    icon = <Mail size={48} className="text-white" />
}: DynamicInputProps) {
    return (
        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-10 min-h-[400px]">
            <div className="space-y-4">
                <div className="flex justify-center">
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 3 }}
                        className="bg-indigo-600 p-6 rounded-3xl shadow-xl shadow-indigo-500/20"
                    >
                        {icon}
                    </motion.div>
                </div>
                <h2 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter italic">
                    {title}
                </h2>
                <p className="text-gray-500 font-medium max-w-sm mx-auto">
                    {description}
                </p>
            </div>

            <div className="w-full max-w-md space-y-6">
                <Input
                    type="email"
                    placeholder={placeholder}
                    className="bg-white/80 border-gray-200 text-gray-900 placeholder:text-gray-400 h-14 text-xl text-center rounded-2xl focus-visible:ring-indigo-500 shadow-sm"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />
                <Button
                    onClick={onNext}
                    size="lg"
                    className="w-full bg-gray-900 hover:bg-black text-white h-14 text-xl rounded-2xl shadow-xl transition-all hover:scale-[1.02]"
                >
                    {buttonLabel}
                </Button>
                {onSkip && (
                    <button onClick={onSkip} className="text-sm font-bold text-gray-400 hover:text-gray-900 transition-colors uppercase tracking-widest">
                        {skipLabel}
                    </button>
                )}
            </div>
        </div>
    );
}
