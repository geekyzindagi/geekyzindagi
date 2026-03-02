'use client';

import { motion } from 'framer-motion';
import { Sparkles, Download, Share2, Rocket } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface IdentityCardProps {
    title: string;
    subtitle: string;
    tags: string[];
    colorClass: string;
    bgClass: string;
    icon?: React.ReactNode;
    onExport?: () => void;
    onShare?: () => void;
}

export default function IdentityCard({
    title,
    subtitle,
    tags,
    colorClass,
    bgClass,
    icon = <Rocket size={24} />,
    onExport,
    onShare
}: IdentityCardProps) {
    return (
        <div className="flex-1 flex flex-col items-center justify-center py-10">
            <div className="w-full bg-white/80 backdrop-blur-2xl border-2 border-white/50 p-10 rounded-[2.5rem] relative overflow-hidden max-w-sm shadow-[0_30px_100px_rgba(0,0,0,0.15)] group">
                {/* Shimmer Effect Layer */}
                <motion.div
                    animate={{ x: ['100%', '-100%'] }}
                    transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 pointer-events-none"
                />

                <div className={cn("absolute top-0 right-0 w-80 h-80 bg-gradient-to-br opacity-20 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2", bgClass.replace("bg-", "from-"))} />

                <div className="relative z-10 text-center space-y-8">
                    <div className="flex justify-center mb-[-1rem]">
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-950 text-white rounded-full text-[9px] font-black uppercase tracking-[0.2em] shadow-xl"
                        >
                            <Sparkles size={10} className="text-yellow-400" />
                            Identity Verified
                        </motion.div>
                    </div>

                    <div className="space-y-2 pt-4">
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">{subtitle}</p>
                        <h2 className={cn("text-4xl md:text-5xl font-black uppercase italic tracking-tighter leading-none break-words", colorClass)}>
                            {title}
                        </h2>
                    </div>

                    <div className="flex flex-wrap justify-center gap-1.5">
                        {tags.map(tag => (
                            <span key={tag} className="text-[10px] font-bold px-2 py-1 rounded-lg bg-white/50 border border-white/40 text-gray-600 uppercase shadow-sm">
                                {tag}
                            </span>
                        ))}
                    </div>

                    <div className="pt-8 border-t border-gray-100/50 flex justify-between items-end">
                        <div className="text-left">
                            <p className="text-[10px] text-gray-400 font-black tracking-widest uppercase">Verified by</p>
                            <p className="text-xl font-black text-gray-900 tracking-tighter">geekyZindagi</p>
                        </div>
                        <div className={cn("p-2.5 rounded-2xl text-white shadow-lg", bgClass)}>
                            {icon}
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-12 flex flex-col md:flex-row gap-4 w-full max-w-sm">
                <Button
                    variant="outline"
                    className="flex-1 rounded-2xl border-2 border-gray-900 text-gray-900 hover:bg-gray-50 h-14 font-black text-lg shadow-sm"
                    onClick={onExport}
                >
                    <Download size={20} className="mr-2" /> Export
                </Button>
                <Button
                    className="flex-1 rounded-2xl bg-gray-900 text-white hover:bg-black shadow-2xl shadow-gray-900/40 h-14 font-black text-lg"
                    onClick={onShare}
                >
                    <Share2 size={20} className="mr-2" /> Share
                </Button>
            </div>
        </div>
    );
}
