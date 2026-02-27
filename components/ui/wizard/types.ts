import { LucideIcon } from 'lucide-react';

export type WizardStepId = string;

export interface WizardStep {
    id: WizardStepId;
    title: string;
    description?: string;
    type: 'selection' | 'input' | 'result' | 'custom';
    render?: (state: WizardState, helpers: WizardHelpers) => React.ReactNode;
}

export interface WizardHelpers {
    next: (data?: any) => void;
    back: () => void;
    updateData: (data: any) => void;
}

export interface WizardConfig {
    steps: WizardStep[];
    onComplete?: (submissionId: string | null, data: any) => Promise<void> | void;
    onStepChange?: (submissionId: string | null, stepId: WizardStepId, data: any) => Promise<void> | void;
    onStart?: () => Promise<string | null> | string | null;
}

export interface WizardState {
    currentStepIndex: number;
    submissionId: string | null;
    data: Record<string, any>;
    isCompleted: boolean;
}
