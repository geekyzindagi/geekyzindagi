# 🛠 Feature Implementation Guidelines (Skills)

When building a new feature, follow this flow:

### 1. Planning & Data
- Define/update models in `prisma/schema.prisma`.
- Run `npx prisma generate` and `npx prisma db push`.
- Create a Zod schema for input validation in `lib/validations/`.

### 2. State & API
- Create a Redux slice if global state is required.
- Implement necessary API routes or Server Actions.
- Update `apiClient` or create a new engine/service if needed.

### 3. UI Implementation
- Build primitive components if not already in `components/ui`.
- Assemble the feature view in `app/`.
- Apply micro-animations using `framer-motion`.

### 4. Verification
- Test all edge cases (empty states, errors, loading).
- Verify responsive layouts on mobile and desktop.
