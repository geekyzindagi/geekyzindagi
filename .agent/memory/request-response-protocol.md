# 📡 Request & Response Protocols

## API Interactions
- **Client**: Use the `apiClient` exported from `@/lib/api-client`.
- **Methodology**: Prefer `async/await` with proper `try/catch` or Redux Thunks.
- **Standard Response Shape**:
  ```typescript
  {
    success: boolean;
    data?: T;
    message?: string;
    errors?: string[];
  }
  ```

## UI State Response
- **Loading**: Use skeleton loaders or progress bars for all async operations.
- **Success/Error**: Use `toast` notifications for immediate feedback.
- **Transitions**: Use Framer Motion for smooth state changes between views.
