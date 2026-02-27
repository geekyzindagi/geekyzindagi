# 📜 Development Protocols

Standard operating procedures for contributors.

## General Principles
- **Clarity over Cleverness**: Write code that is easy to read and maintain.
- **Consistency**: Follow existing patterns for naming, state management, and styling.
- **Premium UI**: Every UI change should feel professional and polished (use framer-motion).

## Component Standards
- Place shared UI primitives in `components/ui`.
- Functional components should be modular and reside in scope-specific folders (e.g., `components/workspace`).
- Always use TypeScript for all component props.

## Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS + Shadcn UI
- **State**: Redux Toolkit
- **Auth**: Auth.js + Custom Backend Integration
