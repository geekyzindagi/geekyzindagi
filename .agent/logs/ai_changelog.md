# 📔 AI Changelog

All significant AI-driven changes and architectural decisions are logged here.

## [2026-02-27] - Initial Memory Map Implementation
- **Author**: Antigravity
- **Action**: Created full `.agent` directory structure for codebase persistence.
- **Details**: 
    - Established `.agent/memory/` with `architecture.md`, `codebase-map.md`, `protocols.md`, `request-response-protocol.md`, `skills.md`, and `ai_agent_protocols.md`.
    - Created `.agent/workflows/` with guides for `add-api-endpoint`, `add-prisma-model`, `add-ui-component`, `code-review-checklist`, `debug-error`, and `implement-feature`.
    - Initialized `.agent/skills/` with placeholder skeletons for future automation tasks (`app-page-scaffolder`, `db-seeder`, `rbac-manager`, etc.).
    - Created `.agent/logs/ai_changelog.md` for session persistence.

## [2026-02-27] - Updated Geek Explorer Questions
- **Author**: Antigravity
- **Action**: Added two new discovery questions to the Geek Explorer wizard.
- **Details**:
    - Created `components/ui/wizard/steps/DynamicQuestion.tsx` to handle textarea and select inputs within the wizard.
    - Added the "Zero-Prep Presentation" question (textarea) to `WizardForm`.
    - Added the "Community Commitment" question (select) to `WizardForm`.
    - Updated API integration in `WizardForm` to send `nicheTopic` and `contribution` data to the backend.

## [2026-02-27] - Fixed Hydration Error
- **Author**: Antigravity
- **Action**: Resolved a React hydration mismatch in `garden-illustrations.tsx`.
- **Details**:
    - Implemented a `useMounted` custom hook to detect the client-side mount state.
    - Wrapped `Math.random()` calls (used for decorative elements like leaves and sparks) in a conditional render so they only execute after hydration.
    - This prevents attributes from differing between the server-rendered HTML and client-side mount.
