'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

export default function WizardForm() {
    const [currentStep, setCurrentStep] = useState(0);
    const [submissionId, setSubmissionId] = useState<string | null>(null);
    // Initialize realms with ALL IDs by default
    const [formData, setFormData] = useState<{ realms: string[], interests: string[], email: string }>({
        realms: REALMS.map(r => r.id),
        interests: [],
        email: ''
    });
    const [customInterest, setCustomInterest] = useState('');
    const cardRef = useRef<HTMLDivElement>(null);
    const hasStartedRef = useRef(false);

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

    // Determine Archetype
    const getArchetype = () => {
        // Find realm with most selected interests
        const realmCounts: Record<string, number> = {};

        formData.interests.forEach(interest => {
            for (const [realmId, interests] of Object.entries(INTERESTS_BY_REALM)) {
                if (interests.includes(interest)) {
                    realmCounts[realmId] = (realmCounts[realmId] || 0) + 1;
                }
            }
        });

        // Get realm with max count, defaulting to first realm of no interests
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
            title: realm?.archetype || "Explorer",
            color: realm?.text || "text-slate-400",
            bg: realm?.bg || "bg-slate-800",
            border: realm?.color || "border-slate-800"
        };
    };

    const archetype = getArchetype();

    // Helper to identify custom interests
    const allKnownInterests = Object.values(INTERESTS_BY_REALM).flat();
    const customInterests = formData.interests.filter(i => !allKnownInterests.includes(i));

    return (
        <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-4">

            {/* Progress Bar (Skip on Intro & Result) */}
            {currentStep < STEPS.length - 1 && (
                <div className="w-full max-w-xl mb-6 flex gap-2">
                    {STEPS.map((step, idx) => {
                        if (idx === STEPS.length - 1) return null;
                        return (
                            <div key={step.id} className={cn(
                                "h-1.5 flex-1 rounded-full transition-all duration-500",
                                idx <= currentStep ? "bg-indigo-500" : "bg-slate-800"
                            )} />
                        );
                    })}
                </div>
            )}

            <div className={cn(
                "w-full bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden relative flex flex-col transition-all duration-500",
                // Responsive height: Takes up mostly full screen on mobile, adaptable on desktop
                "h-[85vh] md:h-auto md:min-h-[600px] md:max-h-[80vh]",
                currentStep === STEPS.length - 1 ? "max-w-md border-2 border-indigo-500/50 shadow-indigo-500/10" : "max-w-4xl" // Wider container for interests
            )}>

                {/* Scrollable Content Area - Key for Responsiveness */}
                <div className="flex-1 overflow-y-auto overflow-x-hidden p-6 md:p-8 custom-scrollbar relative">
                    <AnimatePresence mode="wait" initial={false}>

                        {/* STEP 0: INTERESTS (EXTENSIVE & GROUPED) */}
                        {currentStep === 0 && (
                            <motion.div
                                key="interests"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-6 pb-20" // Extra padding for footer
                            >
                                <div className="text-center space-y-2 pb-4 pt-2">
                                    <h2 className="text-2xl md:text-3xl font-bold">Select Your Interests</h2>
                                    <p className="text-slate-400 text-sm md:text-base">What makes you tick? Pick as many as you like.</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {formData.realms.map(realmId => {
                                        const realm = REALMS.find(r => r.id === realmId);
                                        const interests = INTERESTS_BY_REALM[realmId] || [];
                                        if (!realm) return null;

                                        return (
                                            <div key={realmId} className="space-y-3 break-inside-avoid">
                                                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 border-b border-slate-800 pb-1 mb-2">
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
                                                                    "px-2.5 py-1.5 rounded-md border transition-all duration-200 text-xs md:text-sm font-medium",
                                                                    isSelected
                                                                        ? `bg-slate-800 ${realm.color} text-white shadow-sm ring-1 ring-offset-1 ring-offset-slate-900 ${realm.text.replace('text-', 'ring-')}`
                                                                        : "bg-slate-900/50 border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-200"
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

                                {/* Custom Interests Section */}
                                <div className="space-y-4 pt-6 mt-6 border-t border-slate-800">
                                    <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-500">
                                        <Sparkles size={16} className="text-amber-500" />
                                        My Unique Interests
                                    </div>

                                    <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800 space-y-3">
                                        {customInterests.length > 0 && (
                                            <div className="flex flex-wrap gap-2">
                                                {customInterests.map((interest) => (
                                                    <button
                                                        key={interest}
                                                        onClick={() => toggleInterest(interest)}
                                                        className="px-3 py-1.5 rounded-lg border border-amber-500/50 bg-amber-500/10 text-amber-200 shadow-sm text-sm flex items-center gap-2 hover:bg-amber-500/20 transition-colors"
                                                    >
                                                        {interest}
                                                        <span className="opacity-70 text-xs hover:opacity-100">×</span>
                                                    </button>
                                                ))}
                                            </div>
                                        )}

                                        <div className="flex gap-2">
                                            <Input
                                                placeholder="Add something else..."
                                                value={customInterest}
                                                onChange={(e) => setCustomInterest(e.target.value)}
                                                onKeyDown={handleCustomInterestKeyDown}
                                                className="bg-slate-900 border-slate-700 text-sm h-10 focus-visible:ring-amber-500"
                                            />
                                            <Button size="sm" onClick={addCustomInterest} className="bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 h-10 px-4">
                                                Add
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* STEP 1: CONTACT */}
                        {currentStep === 1 && (
                            <motion.div
                                key="contact"
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.3 }}
                                className="flex-1 flex flex-col items-center justify-center text-center space-y-8 min-h-[400px]"
                            >
                                <div className="space-y-2">
                                    <div className="flex justify-center mb-4">
                                        <div className="bg-slate-800 p-4 rounded-full animate-pulse-slow">
                                            <Mail size={40} className="text-indigo-400" />
                                        </div>
                                    </div>
                                    <h2 className="text-3xl font-bold">Stay in the Loop</h2>
                                    <p className="text-slate-400 max-w-sm mx-auto">
                                        Get updates on your chosen realms and personalized recommendations.
                                    </p>
                                </div>

                                <div className="w-full max-w-sm space-y-4">
                                    <Input
                                        type="email"
                                        placeholder="you@geekyzindagi.com"
                                        className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 h-12 text-lg text-center focus-visible:ring-indigo-500 focus:bg-slate-800 transition-colors"
                                        value={formData.email}
                                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                    />
                                    <Button
                                        onClick={nextStep}
                                        size="lg"
                                        className="w-full bg-indigo-600 hover:bg-indigo-500 text-white h-12 text-lg rounded-xl shadow-lg shadow-indigo-500/20"
                                    >
                                        Reveal My Card
                                    </Button>
                                </div>

                                <button onClick={nextStep} className="text-xs text-slate-500 hover:text-white underline decoration-dashed transition-colors">
                                    Skip & Reveal
                                </button>
                            </motion.div>
                        )}

                        {/* STEP 2: GEEK CARD RESULT */}
                        {currentStep === 2 && (
                            <motion.div
                                key="result"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ type: "spring", duration: 0.6 }}
                                className="flex-1 flex flex-col items-center justify-center min-h-[500px]"
                            >
                                <div ref={cardRef} className="w-full bg-slate-950 border border-slate-800 p-6 md:p-8 rounded-2xl relative overflow-hidden group max-w-sm transform transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl">
                                    {/* Background Glow */}
                                    <div className={cn("absolute top-0 right-0 w-64 h-64 bg-gradient-to-br opacity-20 blur-3xl rounded-full translate-x-1/3 -translate-y-1/3", archetype.bg.replace("bg-", "from-"))} />

                                    <div className="relative z-10 text-center space-y-6">
                                        <div className="space-y-1">
                                            <p className="text-xs font-medium uppercase tracking-widest text-slate-500">I am a</p>
                                            <h2 className={cn("text-3xl md:text-4xl font-black uppercase italic tracking-tighter", archetype.color)}>
                                                {archetype.title}
                                            </h2>
                                        </div>

                                        <div className="flex flex-wrap justify-center gap-2">
                                            {formData.interests.slice(0, 5).map(tag => (
                                                <span key={tag} className="text-[10px] md:text-xs px-2 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">
                                                    #{tag}
                                                </span>
                                            ))}
                                            {formData.interests.length > 5 && (
                                                <span className="text-[10px] md:text-xs px-2 py-1 text-slate-500">+{formData.interests.length - 5} more</span>
                                            )}
                                        </div>

                                        <div className="pt-6 border-t border-slate-800/50 flex justify-between items-end">
                                            <div className="text-left">
                                                <p className="text-[10px] text-slate-400 font-medium tracking-wider uppercase">Explorer at</p>
                                                <p className="text-lg font-bold text-white tracking-tight">GeekyZindagi</p>
                                            </div>
                                            <Laptop size={24} className="text-slate-600" />
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 flex gap-4">
                                    <Button variant="outline" className="border-slate-700 hover:bg-slate-800 text-slate-300" onClick={() => window.print()}>
                                        <Download size={16} className="mr-2" /> Save Image
                                    </Button>
                                    <Button className="bg-white text-slate-900 hover:bg-slate-200">
                                        <Share2 size={16} className="mr-2" /> Share Profile
                                    </Button>
                                </div>

                                <p className="mt-8 text-slate-500 text-sm">
                                    Welcome to the community. <a href="/login" className="text-indigo-400 hover:underline">Sign in</a> to save your profile.
                                </p>

                            </motion.div>
                        )}

                    </AnimatePresence>
                </div>

                {/* Fixed Navigation Footer within the card */}
                {currentStep < STEPS.length - 1 && (
                    <div className="border-t border-slate-800 p-4 md:p-6 bg-slate-900/95 backdrop-blur z-10 flex justify-between items-center">
                        <div className="w-4" />
                        {
                            currentStep > 0 && (
                                <button
                                    onClick={prevStep}
                                    className="text-slate-500 hover:text-white transition-colors flex items-center gap-1 group text-sm"
                                >
                                    <ArrowRight className="rotate-180 w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                                    Back
                                </button>
                            )
                        }

                        <Button
                            onClick={nextStep}
                            className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-full px-8 py-6 shadow-md shadow-indigo-500/20 transition-all hover:scale-105"
                        >
                            <span className="text-lg">Next Step</span>
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                    </div>
                )}

            </div>
        </div>
    );
}
