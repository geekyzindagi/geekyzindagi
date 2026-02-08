import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { type User, userSchema } from "@/lib/validations/auth";

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  mfaRequired: boolean;
  mfaVerified: boolean;
}

const initialState: AuthState = {
  user: null,
  isLoading: true,
  isAuthenticated: false,
  mfaRequired: false,
  mfaVerified: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      // Validate payload with Zod if it's not null
      if (action.payload) {
        const result = userSchema.safeParse(action.payload);
        if (!result.success) {
          console.error("Invalid user data provided to Redux:", result.error);
          return;
        }
      }

      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
      state.isLoading = false;
      if (action.payload) {
        state.mfaRequired = action.payload.mfaEnabled;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setMfaRequired: (state, action: PayloadAction<boolean>) => {
      state.mfaRequired = action.payload;
    },
    setMfaVerified: (state, action: PayloadAction<boolean>) => {
      state.mfaVerified = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.mfaRequired = false;
      state.mfaVerified = false;
    },
  },
});

export const { setUser, setLoading, setMfaRequired, setMfaVerified, logout } =
  authSlice.actions;

export default authSlice.reducer;
