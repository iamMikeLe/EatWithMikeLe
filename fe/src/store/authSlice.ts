import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

type AuthState = {
  authenticated: boolean;
  token: string | null;
  userData: {
    type: string | null;
    email: string | null;
  };
};

const initialState: AuthState = {
  authenticated: false,
  token: null,
  userData: {
    type: null,
    email: null,
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.authenticated = action.payload;
    },
  },
});

// Actions
export const { setAuthenticated } = authSlice.actions;

// Selectors
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.authenticated;

export default authSlice.reducer;
