import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";

type LoginFormValue = {
  email: string;
  password: string;
  remember: boolean;
};

type LoginFormState = {
  loginFormValue: LoginFormValue;
};

const initialState: LoginFormState = {
  loginFormValue: {
    email: "",
    password: "",
    remember: false,
  },
};

export const loginFormSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        key: "email" | "password" | "remember";
        value: string | boolean;
      }>
    ) => {
      const { key, value } = action.payload;
      if (key in state.loginFormValue) {
        state.loginFormValue[key as keyof LoginFormValue] = value as never;
      }
    },
  },
});

// Actions
export const { setCredentials } = loginFormSlice.actions;

// Selectors
export const selectLoginFormValues = (state: RootState) =>
  state.loginForm.loginFormValue;

export default loginFormSlice.reducer;
