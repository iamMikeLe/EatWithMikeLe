import { combineReducers } from "@reduxjs/toolkit";
import addMealFormReducer from "pages/addMeal/addMealSlice";
import mealsReducer from "pages/meals/mealSlice";
import appSettingsReducer from "./appSettingsSlice";

const rootReducer = combineReducers({
  appSettings: appSettingsReducer,
  meals: mealsReducer,
  addMealForm: addMealFormReducer,
});

export default rootReducer;
