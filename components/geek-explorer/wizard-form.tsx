'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import apiClient from '@/lib/api-client';
import { useAuth } from '@/context/AuthContext';
import { NeuralDomainBackground } from '@/components/landing/NeuralDomainBackground';

// New Generic Components
import GenericWizard from '@/components/ui/wizard/GenericWizard';
import { WizardConfig, WizardState, WizardHelpers } from '@/components/ui/wizard/types';
import SelectionGrid from '@/components/ui/wizard/steps/SelectionGrid';
import DynamicInput from '@/components/ui/wizard/steps/DynamicInput';
import IdentityCard from '@/components/ui/wizard/steps/IdentityCard';

// Icons for selection
import { Laptop, Palette, Dice5, Film, Atom, Activity, Coffee, Rocket, Sparkles, Presentation, Heart } from 'lucide-react';
import DynamicQuestion from '@/components/ui/wizard/steps/DynamicQuestion';

// Configuration Data
const REALMS = [
    { id: 'tech', label: 'Builders', icon: Laptop, textClass: 'text-blue-500', archetype: 'Technomancer', color: 'border-blue-500', bg: 'bg-blue-500' },
    { id: 'art', label: 'Creatives', icon: Palette, textClass: 'text-pink-500', archetype: 'Digital Artisan', color: 'border-pink-500', bg: 'bg-pink-500' },
    { id: 'science', label: 'Thinkers', icon: Atom, textClass: 'text-cyan-500', archetype: 'Scientist', color: 'border-cyan-500', bg: 'bg-cyan-500' },
    { id: 'wellness', label: 'Zen Masters', icon: Activity, textClass: 'text-emerald-500', archetype: 'Guardian', color: 'border-emerald-500', bg: 'bg-emerald-500' },
    { id: 'lifestyle', label: 'Explorers', icon: Coffee, textClass: 'text-yellow-500', archetype: 'Nomad', color: 'border-yellow-500', bg: 'bg-yellow-500' },
    { id: 'business', label: 'Founders', icon: Rocket, textClass: 'text-orange-500', archetype: 'Visionary', color: 'border-orange-500', bg: 'bg-orange-500' },
    { id: 'game', label: 'Players', icon: Dice5, textClass: 'text-purple-500', archetype: 'Grandmaster', color: 'border-purple-500', bg: 'bg-purple-500' },
    { id: 'media', label: 'Watchers', icon: Film, textClass: 'text-red-500', archetype: 'Lorekeeper', color: 'border-red-500', bg: 'bg-red-500' },
];

const INTERESTS_BY_REALM: Record<string, string[]> = {
    tech: ['AI & ML', 'Backend', 'System Design', 'DevOps', 'IoT', 'Web3', 'React', 'Mobile Dev', 'Cybersecurity', 'Cloud', 'Data Science', 'Hardware', 'Linux', 'Tools'],
    art: ['Art & Design', 'Music', 'Photography', 'Writing', 'Dance', 'UI/UX Design', 'Fashion', 'Animation', 'Filmmaking', 'Generative Art', 'Architecture'],
    science: ['Neuroscience', 'Quantum Computing', 'Consciousness', 'Psychology', 'Astronomy', 'Physics', 'Biology', 'Chemistry', 'Mathematics'],
    wellness: ['Fitness', 'Running', 'Calisthenics', 'Meditation', 'Indoor Sports', 'Outdoor Sports', 'Yoga', 'Nutrition', 'Mental Health'],
    lifestyle: ['Culinary', 'Foodie', 'Travel', 'Gardening', 'Van Life', 'Minimalism', 'DIY', 'Pet Care'],
    business: ['Startup', 'Entrepreneurship', 'Leadership', 'Productivity', 'Marketing', 'Economics', 'Investing', 'Strategy'],
    game: ['Gaming', 'FPS', 'RPG', 'Indie Games', 'Tabletop', 'Esports', 'VR/AR', 'Game Dev', 'Retro Gaming', 'Speedrunning'],
    media: ['Reading', 'Books', 'Movies', 'Anime', 'Podcasts', 'Streaming', 'YouTube', 'Comics', 'Documentaries', 'Sci-Fi'],
};

export default function WizardForm() {
    const { isAuthenticated } = useAuth();

    // Archetype Logic (preserved)
    const getArchetype = (interests: string[]) => {
        const realmCounts: Record<string, number> = {};
        interests.forEach(interest => {
            for (const [realmId, realmInterests] of Object.entries(INTERESTS_BY_REALM)) {
                if (realmInterests.includes(interest)) {
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
            color: realm?.textClass || "text-slate-400",
            bg: realm?.bg || "bg-slate-800",
            border: realm?.color || "border-slate-800",
            glow: realm?.color.replace('border-', 'shadow-') || "shadow-indigo-500"
        };
    };

    const wizardConfig: WizardConfig = {
        steps: [
            {
                id: 'interests',
                title: "What drives your curiosity?",
                description: "Select the realms that define your journey. Your background network will evolve with you.",
                type: 'selection',
                render: (state, helpers) => (
                    <SelectionGrid
                        title="What drives your curiosity?"
                        description="Select the realms that define your journey. Your background network will evolve with you."
                        groups={REALMS.map(r => ({ ...r, items: INTERESTS_BY_REALM[r.id] }))}
                        selectedItems={state.data.interests || []}
                        onToggle={(item) => {
                            const current = state.data.interests || [];
                            const updated = current.includes(item)
                                ? current.filter((i: string) => i !== item)
                                : [...current, item];
                            helpers.updateData({ interests: updated });
                        }}
                    />
                )
            },
            {
                id: 'contact',
                title: "Almost there.",
                description: "Join the waitlist to get your customized dashboard and implementation guides.",
                type: 'input',
                render: (state, helpers) => (
                    <DynamicInput
                        title="Almost there."
                        description="Join the waitlist to get your customized dashboard and implementation guides."
                        value={state.data.email || ''}
                        onChange={(email) => helpers.updateData({ email })}
                        onNext={() => helpers.next()}
                        onSkip={() => helpers.next()}
                        buttonLabel="Continue"
                    />
                )
            },
            {
                id: 'nicheTopic',
                title: "The Zero-Prep Presentation",
                description: "What's that one niche topic you could talk about for 20 minutes with absolutely zero preparation?",
                type: 'input',
                render: (state, helpers) => (
                    <DynamicQuestion
                        title="The Zero-Prep Presentation"
                        description="What's that one niche topic you could talk about for 20 minutes with absolutely zero preparation?"
                        type="textarea"
                        placeholder="e.g. The history of mechanical keyboards, the biology of octopuses, or why CSS is actually a logic-based language..."
                        value={state.data.nicheTopic || ''}
                        onChange={(nicheTopic) => helpers.updateData({ nicheTopic })}
                        onNext={() => helpers.next()}
                        icon={<Presentation size={48} className="text-white" />}
                    />
                )
            },
            {
                id: 'contribution',
                title: "The Community Vibe Check",
                description: "Building is better together. Are you willing to commit 4 hours a month to helping others succeed, even with zero 'ROI' for you?",
                type: 'input',
                render: (state, helpers) => (
                    <DynamicQuestion
                        title="The Community Vibe Check"
                        description="Building is better together. Are you willing to commit 4 hours a month to helping others succeed, even with zero 'ROI' for you?"
                        type="select"
                        placeholder="Choose your commitment"
                        options={[
                            { label: "Absolutely, I'm in! 🤝", value: "yes" },
                            { label: "Maybe, depends on the month. ⏳", value: "maybe" },
                            { label: "Not right now, focused on building. 🏗️", value: "no" }
                        ]}
                        value={state.data.contribution || ''}
                        onChange={(contribution) => helpers.updateData({ contribution })}
                        onNext={() => helpers.next()}
                        buttonLabel="Reveal My Identity"
                        icon={<Heart size={48} className="text-white" />}
                    />
                )
            },
            {
                id: 'result',
                title: "Your Geek Card",
                type: 'result',
                render: (state) => {
                    const archetype = getArchetype(state.data.interests || []);
                    return (
                        <IdentityCard
                            title={archetype.title}
                            subtitle="Validated Archetype"
                            tags={state.data.interests || []}
                            colorClass={archetype.color}
                            bgClass={archetype.bg}
                            onExport={() => window.print()}
                        />
                    );
                }
            }
        ],
        onStart: async () => {
            try {
                const res = await apiClient.post<{ id: string }>('/wizard/start');
                return res.data.id;
            } catch (error) {
                console.error('Failed to start wizard session:', error);
                return null;
            }
        },
        onStepChange: async (submissionId, stepId, data) => {
            try {
                if (submissionId) {
                    await apiClient.patch(`/wizard/${submissionId}`, {
                        step: stepId,
                        interests: data.interests,
                        email: data.email,
                        nicheTopic: data.nicheTopic,
                        contribution: data.contribution
                    });
                }
            } catch (error) {
                console.error('Failed to update wizard session:', error);
            }
        },
        onComplete: async (submissionId, data) => {
            const archetype = getArchetype(data.interests || []);
            try {
                if (submissionId) {
                    await apiClient.patch(`/wizard/${submissionId}`, {
                        step: 'completed',
                        email: data.email,
                        completed: true,
                        archetype: archetype.title,
                        nicheTopic: data.nicheTopic,
                        contribution: data.contribution
                    });
                }
                toast.success("Profile created! Here's your Geek Card. 🃏");
            } catch (e) {
                console.error(e);
            }
        }
    };

    return (
        <GenericWizard
            config={wizardConfig}
            initialData={{ interests: [], email: '', nicheTopic: '', contribution: '' }}
            background={<NeuralDomainBackground activeDomainId="all" />} // Simplified background for now
        />
    );
}
