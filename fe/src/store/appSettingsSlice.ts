import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export type AppSettingsSlice = {
  language: string;
};

const initialState: AppSettingsSlice = {
  language: "cz",
};

export const appSettingsSlice = createSlice({
  name: "appSettings",
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language += action.payload;
    },
  },
});

export const { setLanguage } = appSettingsSlice.actions;

export const selectLanguage = (state: RootState) => state.appSettings.language;

export default appSettingsSlice.reducer;
