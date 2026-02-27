# 🤖 AI Agent Protocols

Guidelines for AI assistants working in this codebase.

## Interaction Principles
- **Read First**: Always check `.agent/memory` before suggesting large-scale changes.
- **Verify**: Run `npx prisma generate` after schema changes to ensure type safety.
- **Documentation**: Update `.agent/logs/ai_changelog.md` after significant architectural changes.
- **Atomic Commits**: Suggest or make changes in logical, atomic blocks.

## Prohibited Patterns
- Do not introduce Tailwind classes that conflict with the established theme.
- Do not bypass `apiClient` for backend requests.
- Do not use `console.log` for production debugging; use the prescribed logging protocol.
