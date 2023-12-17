import { combineReducers } from "@reduxjs/toolkit";
import addMealFormReducer from "pages/addMeal/addMealSlice";
import counterReducer from "pages/counter/counterSlice";
import mealsReducer from "pages/meals/mealSlice";
import appSettingsReducer from "./appSettingsSlice";

const rootReducer = combineReducers({
  appSettings: appSettingsReducer,
  counter: counterReducer,
  meals: mealsReducer,
  addMealForm: addMealFormReducer,
});

export default rootReducer;
