import { combineReducers } from "@reduxjs/toolkit";
import addMealFormReducer from "pages/addMeal/addMealSlice";
import loginFormReducer from "pages/login/loginSlice";
import mealsReducer from "pages/meals/mealSlice";
import appSettingsReducer from "./appSettingsSlice";
import authReducer from "./authSlice";

const rootReducer = combineReducers({
  appSettings: appSettingsReducer,
  auth: authReducer,
  meals: mealsReducer,
  addMealForm: addMealFormReducer,
  loginForm: loginFormReducer,
});

export default rootReducer;
