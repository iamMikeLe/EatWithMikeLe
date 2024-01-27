import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginAsync } from "API/login";
import { RootState } from "./store";

type UserData = {
  id: string | null;
  email: string | null;
  type: string | null;
  token: string | null;
};

type AuthState = {
  authenticated: boolean;
  user: UserData;
};

const initialState: AuthState = {
  authenticated: false,
  user: {
    type: null,
    email: null,
    token: null,
    id: null,
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
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.user = {
          type: null,
          email: null,
          token: null,
          id: null,
        };
        state.authenticated = false;
      })
      .addCase(
        loginAsync.fulfilled,
        (state, action: PayloadAction<UserData>) => {
          state.user = action.payload;
          state.authenticated = true;
        }
      )
      .addCase(loginAsync.rejected, (_state) => {
        console.log("add some error handling toast here");
      });
  },
});

// Actions
export const { setAuthenticated } = authSlice.actions;

// Selectors
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.authenticated;

export default authSlice.reducer;