---
description: How to add a new API endpoint to the system
---

1. **Backend Route**: If this is a backend change, update the separate `core-backend` repo.
2. **Frontend Type**: Define the response type in `types/`.
3. **API Client**: Add the new call to the relevant service or create a new one in `lib/`.
4. **Validation**: Add a Zod schema in `lib/validations/` for request bodies.
5. **UI Integration**: Use the new endpoint in a Redux slice or directly in a component using `apiClient`.
