# 🗺 Codebase Map

## Directory Structure

- **`app/`**: Contains the Next.js App Router structure.
  - `(auth)`: Login, Register, MFA, Password Reset.
  - `(dashboard)`: Main application views for authenticated users.
  - `admin`: Administrative panels for idea review and user management.
- **`components/`**: React components organized by scope.
  - `landing`: Hero sections, features, and public-facing elements.
  - `ui`: Primitive components (Shadcn UI).
  - `workspace`: Functional components for the main app logic.
- **`lib/`**: Business logic, utility functions, and shared configs.
  - `api-client.ts`: Central Axios instance with interceptors.
  - `validations`: Zod schemas for forms.
- **`store/`**: Redux Toolkit setup.
  - `slices/`: State slices for UI and data persistence.
- **`prisma/`**: Schema definitions and database seeding scripts.

## Core Files
- `lib/api-client.ts`: The central gateway for all backend communication.
- `middleware.ts`: Route protection and auth logic.
- `prisma/schema.prisma`: Source of truth for database models.
