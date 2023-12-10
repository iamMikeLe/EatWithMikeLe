import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import counterReducer from "pages/counter/counterSlice";
import mealsReducer from "pages/meals/mealSlice";
import appSettingsReducer from "./appSettingsSlice";

export const store = configureStore({
  reducer: {
    appSettings: appSettingsReducer,
    counter: counterReducer,
    meals: mealsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
