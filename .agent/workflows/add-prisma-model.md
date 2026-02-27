---
description: How to add or modify a Prisma model
---

1. **Schema Update**: Edit `prisma/schema.prisma`.
2. **Validation**: Run `npx prisma validate`.
3. **Generation**: Run `// turbo` `npx prisma generate`.
4. **Sync**: Run `npx prisma db push` (use with caution in production).
5. **Seed**: Update `prisma/seed.ts` if the new model needs initial data.
