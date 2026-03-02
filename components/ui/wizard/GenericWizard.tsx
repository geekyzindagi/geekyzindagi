'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { WizardConfig, WizardState, WizardStepId } from './types';

interface GenericWizardProps {
    config: WizardConfig;
    initialData?: Record<string, any>;
    className?: string;
    containerClassName?: string;
    background?: React.ReactNode;
    showProgress?: boolean;
}

export default function GenericWizard({
    config,
    initialData = {},
    className,
    containerClassName,
    background,
    showProgress = true
}: GenericWizardProps) {
    const [state, setState] = useState<WizardState>({
        currentStepIndex: 0,
        submissionId: null,
        data: initialData,
        isCompleted: false
    });
    const hasStartedRef = useRef(false);

    const currentStep = config.steps[state.currentStepIndex];

    // Initialize session
    useEffect(() => {
        const startSession = async () => {
            if (!hasStartedRef.current && config.onStart) {
                hasStartedRef.current = true;
                const id = await config.onStart();
                setState(prev => ({ ...prev, submissionId: id }));
            }
        };
        startSession();
    }, [config]);

    const handleNext = async (stepData?: any) => {
        const nextIdx = state.currentStepIndex + 1;
        const updatedData = { ...state.data, ...stepData };

        if (nextIdx < config.steps.length) {
            setState(prev => ({
                ...prev,
                currentStepIndex: nextIdx,
                data: updatedData
            }));

            if (config.onStepChange) {
                await config.onStepChange(state.submissionId, config.steps[nextIdx].id, updatedData);
            }
        } else {
            setState(prev => ({ ...prev, isCompleted: true, data: updatedData }));
            if (config.onComplete) {
                await config.onComplete(state.submissionId, updatedData);
            }
        }
    };

    const handleBack = () => {
        if (state.currentStepIndex > 0) {
            setState(prev => ({ ...prev, currentStepIndex: prev.currentStepIndex - 1 }));
        }
    };

    const updateData = (newData: Record<string, any>) => {
        setState(prev => ({ ...prev, data: { ...prev.data, ...newData } }));
    };

    const helpers = {
        next: handleNext,
        back: handleBack,
        updateData: (newData: any) => setState(prev => ({ ...prev, data: { ...prev.data, ...newData } }))
    };

    return (
        <div className={cn("relative min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden", className)}>
            {background}

            {/* Progress Bar */}
            {showProgress && !state.isCompleted && state.currentStepIndex < config.steps.length - 1 && (
                <div className="w-full max-w-xl mb-12 flex gap-3 relative z-10 px-4">
                    {config.steps.slice(0, -1).map((step, idx) => (
                        <div key={step.id} className={cn(
                            "h-1 flex-1 rounded-full transition-all duration-700",
                            idx <= state.currentStepIndex ? "bg-indigo-600 shadow-[0_0_10px_rgba(79,70,229,0.5)]" : "bg-gray-200"
                        )} />
                    ))}
                </div>
            )}

            <motion.div
                layout
                className={cn(
                    "w-full max-w-4xl relative z-10 transition-all duration-700",
                    containerClassName,
                    state.currentStepIndex === config.steps.length - 1 ? "max-w-md" : "max-w-4xl"
                )}
            >
                <div className={cn(
                    "bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl overflow-hidden relative flex flex-col transition-all duration-700 shadow-[0_20px_50px_rgba(0,0,0,0.1)]",
                    "h-[85vh] md:h-auto md:min-h-[550px] md:max-h-[85vh]"
                )}>
                    <div className="flex-1 overflow-y-auto overflow-x-hidden p-8 md:p-12 custom-scrollbar">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentStep.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.5 }}
                                className="h-full"
                            >
                                {currentStep.render ? (
                                    currentStep.render(state, helpers)
                                ) : (
                                    <div className="flex items-center justify-center h-full text-gray-400">
                                        Step component not defined for {currentStep.id}
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Navigation Footer */}
                    {!state.isCompleted && state.currentStepIndex < config.steps.length - 1 && (
                        <div className="border-t border-gray-100 p-6 md:p-8 bg-white/50 backdrop-blur flex justify-between items-center relative z-20">
                            {state.currentStepIndex > 0 ? (
                                <button
                                    onClick={handleBack}
                                    className="text-gray-400 hover:text-gray-900 transition-colors flex items-center gap-2 font-bold uppercase tracking-widest text-xs"
                                >
                                    <ArrowRight className="rotate-180 w-4 h-4" />
                                    Back
                                </button>
                            ) : <div />}

                            <Button
                                onClick={() => handleNext()}
                                disabled={state.currentStepIndex === 0 && (!state.data.interests || state.data.interests.length === 0)}
                                className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl px-10 py-7 shadow-xl shadow-indigo-600/20 transition-all hover:scale-105 group disabled:opacity-50 disabled:hover:scale-100"
                            >
                                <span className="text-xl font-black tracking-tight italic">
                                    {state.currentStepIndex === config.steps.length - 2 ? "Forge Profile" : "Continue"}
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
