'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

import { Laptop, Palette, Tent, Dice5, Film, Users, Check, ArrowRight, Sparkles, Mail, Share2, Download, Atom, Activity, Coffee, Rocket } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import apiClient from '@/lib/api-client';
import { Card, CardContent } from '@/components/ui/card';

// 1. Data Structure
const STEPS = [
    { id: 'interests', title: "Refine Interests" },
    { id: 'contact', title: "Stay in the Loop" },
    { id: 'result', title: "Your Geek Card" }
];

const REALMS = [
    { id: 'tech', label: 'Builders', icon: Laptop, color: 'border-blue-500', bg: 'bg-blue-500', text: 'text-blue-500', archetype: 'Technomancer' },
    { id: 'art', label: 'Creatives', icon: Palette, color: 'border-pink-500', bg: 'bg-pink-500', text: 'text-pink-500', archetype: 'Digital Artisan' },
    { id: 'science', label: 'Thinkers', icon: Atom, color: 'border-cyan-500', bg: 'bg-cyan-500', text: 'text-cyan-500', archetype: 'Scientist' },
    { id: 'wellness', label: 'Zen Masters', icon: Activity, color: 'border-emerald-500', bg: 'bg-emerald-500', text: 'text-emerald-500', archetype: 'Guardian' },
    { id: 'lifestyle', label: 'Explorers', icon: Coffee, color: 'border-yellow-500', bg: 'bg-yellow-500', text: 'text-yellow-500', archetype: 'Nomad' },
    { id: 'business', label: 'Founders', icon: Rocket, color: 'border-orange-500', bg: 'bg-orange-500', text: 'text-orange-500', archetype: 'Visionary' },
    { id: 'game', label: 'Players', icon: Dice5, color: 'border-purple-500', bg: 'bg-purple-500', text: 'text-purple-500', archetype: 'Grandmaster' },
    { id: 'media', label: 'Watchers', icon: Film, color: 'border-red-500', bg: 'bg-red-500', text: 'text-red-500', archetype: 'Lorekeeper' },
];

const INTERESTS_BY_REALM: Record<string, string[]> = {
    tech: [
        'AI & ML', 'Backend', 'System Design', 'DevOps', 'IoT', 'Web3',
        'React', 'Mobile Dev', 'Cybersecurity', 'Cloud', 'Data Science',
        'Hardware', 'Linux', 'Tools'
    ],
    art: [
        'Art & Design', 'Music', 'Photography', 'Writing', 'Dance',
        'UI/UX Design', 'Fashion', 'Animation', 'Filmmaking',
        'Generative Art', 'Architecture'
    ],
    science: [
        'Neuroscience', 'Quantum Computing', 'Consciousness', 'Psychology',
        'Astronomy', 'Physics', 'Biology', 'Chemistry', 'Mathematics'
    ],
    wellness: [
        'Fitness', 'Running', 'Calisthenics', 'Meditation', 'Indoor Sports',
        'Outdoor Sports', 'Yoga', 'Nutrition', 'Mental Health'
    ],
    lifestyle: [
        'Culinary', 'Foodie', 'Travel', 'Gardening', 'Van Life',
        'Minimalism', 'DIY', 'Pet Care'
    ],
    business: [
        'Startup', 'Entrepreneurship', 'Leadership', 'Productivity',
        'Marketing', 'Economics', 'Investing', 'Strategy'
    ],
    game: [
        'Gaming', 'FPS', 'RPG', 'Indie Games', 'Tabletop', 'Esports',
        'VR/AR', 'Game Dev', 'Retro Gaming', 'Speedrunning'
    ],
    media: [
        'Reading', 'Books', 'Movies', 'Anime', 'Podcasts', 'Streaming',
        'YouTube', 'Comics', 'Documentaries', 'Sci-Fi'
    ],
};

import { NeuralDomainBackground } from '@/components/landing/NeuralDomainBackground';

export default function WizardForm() {
    const [currentStep, setCurrentStep] = useState(0);
    const [submissionId, setSubmissionId] = useState<string | null>(null);
    const [formData, setFormData] = useState<{ realms: string[], interests: string[], email: string }>({
        realms: REALMS.map(r => r.id),
        interests: [],
        email: ''
    });
    const [customInterest, setCustomInterest] = useState('');
    const cardRef = useRef<HTMLDivElement>(null);
    const hasStartedRef = useRef(false);

    // Determine Archetype
    const getArchetype = () => {
        const realmCounts: Record<string, number> = {};
        formData.interests.forEach(interest => {
            for (const [realmId, interests] of Object.entries(INTERESTS_BY_REALM)) {
                if (interests.includes(interest)) {
                    realmCounts[realmId] = (realmCounts[realmId] || 0) + 1;
                }
            }
        });

        let topRealmId = REALMS[0].id;
        let maxCount = -1;
        for (const [realmId, count] of Object.entries(realmCounts)) {
            if (count > maxCount) {
                maxCount = count;
                topRealmId = realmId;
            }
        }

        const realm = REALMS.find(r => r.id === topRealmId);
        return {
            id: topRealmId,
            title: realm?.archetype || "Explorer",
            color: realm?.text || "text-slate-400",
            bg: realm?.bg || "bg-slate-800",
            border: realm?.color || "border-slate-800",
            glow: realm?.color.replace('border-', 'shadow-') || "shadow-indigo-500"
        };
    };

    // Analytics: Start session on mount immediately
    useEffect(() => {
        const initSession = async () => {
            if (!submissionId && !hasStartedRef.current) {
                hasStartedRef.current = true;
                try {
                    const res = await apiClient.post<{ id: string }>('/wizard/start');
                    setSubmissionId(res.data.id);
                    console.log('Wizard session started:', res.data.id);
                } catch (error) {
                    console.error('Failed to start wizard session:', error);
                    hasStartedRef.current = false;
                }
            }
        };
        initSession();
    }, []);

    // Analytics: Update session
    const updateSession = async (stepId: string, data: any = {}) => {
        try {
            if (submissionId) {
                await apiClient.patch(`/wizard/${submissionId}`, {
                    step: stepId,
                    ...data
                });
            }
        } catch (error) {
            console.error('Failed to update wizard session:', error);
        }
    };

    const toggleInterest = (interest: string) => {
        setFormData(prev => ({
            ...prev,
            interests: prev.interests.includes(interest)
                ? prev.interests.filter(i => i !== interest)
                : [...prev.interests, interest]
        }));
    };

    const addCustomInterest = () => {
        if (!customInterest.trim()) return;
        const interest = customInterest.trim();

        if (!formData.interests.includes(interest)) {
            setFormData(prev => ({
                ...prev,
                interests: [...prev.interests, interest]
            }));
        }
        setCustomInterest('');
    };

    const handleCustomInterestKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addCustomInterest();
        }
    };

    const nextStep = async () => {
        const nextIdx = currentStep + 1;

        if (nextIdx < STEPS.length) {
            setCurrentStep(nextIdx);

            const stepId = STEPS[nextIdx].id;

            // If moving to result, mark as completed
            if (stepId === 'result') {
                try {
                    const finalArchetype = getArchetype();
                    await updateSession('completed', {
                        email: formData.email,
                        completed: true,
                        archetype: finalArchetype.title
                    });
                    toast.success("Profile created! Here's your Geek Card. 🃏");
                } catch (e) {
                    console.error(e);
                }
            } else {
                // Track intermediate steps
                updateSession(stepId, {
                    realms: formData.realms,
                    interests: formData.interests,
                    email: formData.email
                });
            }
        }
    };

    const prevStep = () => setCurrentStep(prev => prev - 1);

    const archetype = getArchetype();

    // Sync with Background
    const activeDomainId = formData.interests.length > 0 ? archetype.id : "all";

    return (
        <div className="relative min-h-screen bg-[#FFFCF8] flex flex-col items-center justify-center p-4 overflow-hidden">
            {/* Immersive Neural Background */}
            <NeuralDomainBackground activeDomainId={activeDomainId} />

            {/* Progress Bar (Skip on Intro & Result) */}
            {currentStep < STEPS.length - 1 && (
                <div className="w-full max-w-xl mb-12 flex gap-3 relative z-10 px-4">
                    {STEPS.map((step, idx) => {
                        if (idx === STEPS.length - 1) return null;
                        return (
                            <div key={step.id} className={cn(
                                "h-1 flex-1 rounded-full transition-all duration-700",
                                idx <= currentStep ? "bg-indigo-600 shadow-[0_0_10px_rgba(79,70,229,0.5)]" : "bg-gray-200"
                            )} />
                        );
                    })}
                </div>
            )}

            <motion.div
                layout
                className={cn(
                    "w-full max-w-4xl relative z-10 transition-all duration-700",
                    currentStep === STEPS.length - 1 ? "max-w-md" : "max-w-4xl"
                )}
            >
                {/* Glassmorphic Container */}
                <div className={cn(
                    "bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl overflow-hidden relative flex flex-col transition-all duration-700",
                    "shadow-[0_20px_50px_rgba(0,0,0,0.1)]",
                    // Dynamic Archetype Glow
                    formData.interests.length > 0 && `shadow-[0_0_40px_-5px_rgba(0,0,0,0.1),0_0_80px_-10px_${archetype.glow.replace('shadow-', '')}]`,
                    "h-[85vh] md:h-auto md:min-h-[550px] md:max-h-[85vh]"
                )}>

                    {/* Content Area */}
                    <div className="flex-1 overflow-y-auto overflow-x-hidden p-8 md:p-12 custom-scrollbar">
                        <AnimatePresence mode="wait">
                            {/* STEP 0: INTERESTS */}
                            {currentStep === 0 && (
                                <motion.div
                                    key="interests"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.5 }}
                                    className="space-y-10"
                                >
                                    <div className="text-center space-y-3">
                                        <motion.div
                                            initial={{ scale: 0.9 }}
                                            animate={{ scale: 1 }}
                                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-bold uppercase tracking-widest mb-2"
                                        >
                                            <Sparkles size={12} /> The Implementation Quiz
                                        </motion.div>
                                        <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tighter leading-none">
                                            What drives your curiosity?
                                        </h2>
                                        <p className="text-gray-500 text-sm md:text-lg font-medium max-w-xl mx-auto">
                                            Select the realms that define your journey. Your background network will evolve with you.
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                        {formData.realms.map(realmId => {
                                            const realm = REALMS.find(r => r.id === realmId);
                                            const interests = INTERESTS_BY_REALM[realmId] || [];
                                            if (!realm) return null;

                                            return (
                                                <div key={realmId} className="space-y-4">
                                                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 border-b border-gray-100 pb-2">
                                                        <realm.icon size={14} className={realm.text} />
                                                        {realm.label}
                                                    </div>
                                                    <div className="flex flex-wrap gap-2">
                                                        {interests.map((interest) => {
                                                            const isSelected = formData.interests.includes(interest);
                                                            return (
                                                                <button
                                                                    key={interest}
                                                                    onClick={() => toggleInterest(interest)}
                                                                    className={cn(
                                                                        "px-3 py-2 rounded-xl border transition-all duration-300 text-xs md:text-sm font-semibold",
                                                                        isSelected
                                                                            ? `bg-gray-900 border-gray-900 text-white shadow-lg scale-105`
                                                                            : "bg-white/50 border-gray-200 text-gray-500 hover:border-gray-400 hover:text-gray-900 hover:bg-white"
                                                                    )}
                                                                >
                                                                    {interest}
                                                                </button>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>

                                    {/* Custom Interests */}
                                    <div className="pt-8">
                                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
                                            <Atom size={14} className="text-indigo-500" />
                                            Something Unique?
                                        </div>
                                        <div className="flex gap-2 max-w-md">
                                            <Input
                                                placeholder="Add a custom interest..."
                                                value={customInterest}
                                                onChange={(e) => setCustomInterest(e.target.value)}
                                                onKeyDown={handleCustomInterestKeyDown}
                                                className="bg-white/50 border-gray-200 rounded-xl focus-visible:ring-indigo-500 h-10"
                                            />
                                            <Button onClick={addCustomInterest} className="bg-gray-900 text-white rounded-xl h-10 px-6 hover:bg-gray-800">
                                                Add
                                            </Button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* STEP 1: CONTACT */}
                            {currentStep === 1 && (
                                <motion.div
                                    key="contact"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, x: -50 }}
                                    transition={{ duration: 0.5 }}
                                    className="flex-1 flex flex-col items-center justify-center text-center space-y-10 min-h-[400px]"
                                >
                                    <div className="space-y-4">
                                        <div className="flex justify-center">
                                            <motion.div
                                                animate={{ y: [0, -10, 0] }}
                                                transition={{ repeat: Infinity, duration: 3 }}
                                                className="bg-indigo-600 p-6 rounded-3xl shadow-xl shadow-indigo-500/20"
                                            >
                                                <Mail size={48} className="text-white" />
                                            </motion.div>
                                        </div>
                                        <h2 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter italic">
                                            Almost there.
                                        </h2>
                                        <p className="text-gray-500 font-medium max-w-sm mx-auto">
                                            Join the waitlist to get your customized dashboard and implementation guides.
                                        </p>
                                    </div>

                                    <div className="w-full max-w-md space-y-6">
                                        <Input
                                            type="email"
                                            placeholder="your@email.com"
                                            className="bg-white/80 border-gray-200 text-gray-900 placeholder:text-gray-400 h-14 text-xl text-center rounded-2xl focus-visible:ring-indigo-500 shadow-sm"
                                            value={formData.email}
                                            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                        />
                                        <Button
                                            onClick={nextStep}
                                            size="lg"
                                            className="w-full bg-gray-900 hover:bg-black text-white h-14 text-xl rounded-2xl shadow-xl transition-all hover:scale-[1.02]"
                                        >
                                            Reveal My Identity
                                        </Button>
                                        <button onClick={nextStep} className="text-sm font-bold text-gray-400 hover:text-gray-900 transition-colors uppercase tracking-widest">
                                            Skip for now
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            {/* STEP 2: GEEK CARD */}

                            {currentStep === 2 && (
                                <motion.div
                                    key="result"
                                    initial={{ opacity: 0, scale: 0.8, rotateY: 30 }}
                                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                                    transition={{ type: "spring", stiffness: 100, damping: 15 }}
                                    className="flex-1 flex flex-col items-center justify-center py-10"
                                >
                                    <div ref={cardRef} className="w-full bg-white/80 backdrop-blur-2xl border-2 border-white/50 p-10 rounded-[2.5rem] relative overflow-hidden max-w-sm shadow-[0_30px_100px_rgba(0,0,0,0.15)] group">
                                        {/* Shimmer Effect Layer */}
                                        <motion.div
                                            animate={{ x: ['100%', '-100%'] }}
                                            transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
                                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 pointer-events-none"
                                        />

                                        <div className={cn("absolute top-0 right-0 w-80 h-80 bg-gradient-to-br opacity-20 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2", archetype.bg.replace("bg-", "from-"))} />

                                        <div className="relative z-10 text-center space-y-8">
                                            {/* Badge Section */}
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
                                                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Validated Archetype</p>
                                                <h2 className={cn("text-4xl md:text-5xl font-black uppercase italic tracking-tighter leading-none break-words", archetype.color)}>
                                                    {archetype.title}
                                                </h2>
                                            </div>

                                            <div className="flex flex-wrap justify-center gap-1.5">
                                                {formData.interests.map(tag => (
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
                                                <div className={cn("p-2.5 rounded-2xl text-white shadow-lg", archetype.bg)}>
                                                    <Rocket size={24} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-12 flex flex-col md:flex-row gap-4 w-full max-w-sm">
                                        <Button variant="outline" className="flex-1 rounded-2xl border-2 border-gray-900 text-gray-900 hover:bg-gray-50 h-14 font-black text-lg shadow-sm" onClick={() => window.print()}>
                                            <Download size={20} className="mr-2" /> Export
                                        </Button>
                                        <Button className="flex-1 rounded-2xl bg-gray-900 text-white hover:bg-black shadow-2xl shadow-gray-900/40 h-14 font-black text-lg">
                                            <Share2 size={20} className="mr-2" /> Share
                                        </Button>
                                    </div>

                                    <p className="mt-8 text-gray-500 font-medium text-center">
                                        Already a member? <Link href="/login" className="text-indigo-600 font-black hover:underline underline-offset-4">Sign in here</Link>
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Navigation Footer */}
                    {currentStep < STEPS.length - 1 && (
                        <div className="border-t border-gray-100 p-6 md:p-8 bg-white/50 backdrop-blur flex justify-between items-center relative z-20">
                            {currentStep > 0 ? (
                                <button
                                    onClick={prevStep}
                                    className="text-gray-400 hover:text-gray-900 transition-colors flex items-center gap-2 font-bold uppercase tracking-widest text-xs"
                                >
                                    <ArrowRight className="rotate-180 w-4 h-4" />
                                    Back
                                </button>
                            ) : <div />}

                            <Button
                                onClick={nextStep}
                                disabled={currentStep === 0 && formData.interests.length === 0}
                                className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl px-10 py-7 shadow-xl shadow-indigo-600/20 transition-all hover:scale-105 group disabled:opacity-50 disabled:hover:scale-100"
                            >
                                <span className="text-xl font-black tracking-tight italic">
                                    {currentStep === 1 ? "Forge Profile" : "Continue"}
                                </span>
                                <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
}
