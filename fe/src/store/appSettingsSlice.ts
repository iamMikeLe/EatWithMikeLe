import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export type AppSettingsSlice = {
  language: string;
  settingsModal: boolean;
};

const initialState: AppSettingsSlice = {
  language: "cz",
  settingsModal: true,
};

export const appSettingsSlice = createSlice({
  name: "appSettings",
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language += action.payload;
    },
    setShowSettingsModal: (state, action: PayloadAction<boolean>) => {
      state.settingsModal = action.payload;
    },
  },
});

export const { setLanguage, setShowSettingsModal } = appSettingsSlice.actions;

export const selectLanguage = (state: RootState) => state.appSettings.language;
export const selectSettingsModal = (state: RootState) =>
  state.appSettings.settingsModal;

export default appSettingsSlice.reducer;
