---
description: Checklist for internal code reviews
---

- [ ] **TypeScript**: No `any` types used; interfaces are descriptive.
- [ ] **State**: Redux used only for global state; local state for UI focus.
- [ ] **Performance**: No unnecessary re-renders in heavy components.
- [ ] **Style**:tailwind classes follow consistent ordering.
- [ ] **Animations**: `framer-motion` used correctly without being overbearing.
- [ ] **Security**: Form inputs are validated with Zod.
- [ ] **Accessibility**: ARIA labels present for interactive elements.
