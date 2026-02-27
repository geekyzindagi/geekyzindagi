# 🏗 High-Level Architecture

The project is a Next.js 15 application using the App Router, integrated with a MongoDB database via Prisma. It follows a modular structure where UI components are decoupled from business logic and state.

```mermaid
graph TD
    Client[Browser / Client] --> Next[Next.js App Router]
    Next --> Components[React Components]
    Next --> API[API Routes / Server Actions]
    Components --> Redux[Redux Store]
    API --> Prisma[Prisma ORM]
    Prisma --> MongoDB[(MongoDB)]
    Next --> Lib[Lib / Utilities]
    Lib --> Axios[Axios / Backend API]
```

## 📂 Core Directory Breakdown

| Directory | Purpose | Key Contents |
| :--- | :--- | :--- |
| `app/` | Routing and Layouts | `(auth)`, `(dashboard)`, `admin`, `api` |
| `components/` | Reusable UI Elements | `landing`, `dashboard`, `ui`, `workspace` |
| `lib/` | Core Logic & Shared Utils | `api-client.ts`, `crypto.ts`, `github.ts` |
| `store/` | Global State Management | `slices/`, `store.ts`, `provider.tsx` |
| `prisma/` | Data Modeling | `schema.prisma`, `seed.ts` |
| `types/` | TypeScript Definitions | Shared interfaces and types |
