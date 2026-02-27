'use client';

import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface DynamicQuestionProps {
    title: string;
    description: string;
    value: any;
    onChange: (value: any) => void;
    onNext: () => void;
    type?: 'text' | 'textarea' | 'select';
    placeholder?: string;
    options?: { label: string; value: string }[];
    buttonLabel?: string;
    icon?: React.ReactNode;
}

export default function DynamicQuestion({
    title,
    description,
    value,
    onChange,
    onNext,
    type = 'text',
    placeholder,
    options = [],
    buttonLabel = "Continue",
    icon
}: DynamicQuestionProps) {
    return (
        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-10 min-h-[400px]">
            <div className="space-y-4">
                {icon && (
                    <div className="flex justify-center">
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 3 }}
                            className="bg-indigo-600 p-6 rounded-3xl shadow-xl shadow-indigo-500/20"
                        >
                            {icon}
                        </motion.div>
                    </div>
                )}
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter italic max-w-2xl mx-auto">
                    {title}
                </h2>
                <p className="text-gray-500 font-medium max-w-md mx-auto">
                    {description}
                </p>
            </div>

            <div className="w-full max-w-md space-y-6">
                {type === 'text' && (
                    <Input
                        placeholder={placeholder}
                        className="bg-white/80 border-gray-200 text-gray-900 placeholder:text-gray-400 h-14 text-xl text-center rounded-2xl focus-visible:ring-indigo-500 shadow-sm"
                        value={value || ''}
                        onChange={(e) => onChange(e.target.value)}
                    />
                )}

                {type === 'textarea' && (
                    <Textarea
                        placeholder={placeholder}
                        className="bg-white/80 border-gray-200 text-gray-900 placeholder:text-gray-400 min-h-[120px] text-lg rounded-2xl focus-visible:ring-indigo-500 shadow-sm p-4"
                        value={value || ''}
                        onChange={(e) => onChange(e.target.value)}
                    />
                )}

                {type === 'select' && (
                    <Select onValueChange={onChange} value={value}>
                        <SelectTrigger className="bg-white/80 border-gray-200 text-gray-900 h-14 text-xl rounded-2xl focus:ring-indigo-500 shadow-sm">
                            <SelectValue placeholder={placeholder} />
                        </SelectTrigger>
                        <SelectContent className="rounded-2xl border-gray-100 shadow-2xl">
                            {options.map((opt) => (
                                <SelectItem key={opt.value} value={opt.value} className="text-lg rounded-xl">
                                    {opt.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                )}

                <Button
                    onClick={onNext}
                    size="lg"
                    disabled={!value}
                    className="w-full bg-gray-900 hover:bg-black text-white h-14 text-xl rounded-2xl shadow-xl transition-all hover:scale-[1.02] disabled:opacity-50"
                >
                    {buttonLabel}
                </Button>
            </div>
        </div>
    );
}
