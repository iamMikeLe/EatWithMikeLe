import { combineReducers } from "@reduxjs/toolkit";
import counterReducer from "pages/counter/counterSlice";
import mealsReducer from "pages/meals/mealSlice";
import appSettingsReducer from "./appSettingsSlice";

const rootReducer = combineReducers({
  appSettings: appSettingsReducer,
  counter: counterReducer,
  meals: mealsReducer,
});

export default rootReducer;
