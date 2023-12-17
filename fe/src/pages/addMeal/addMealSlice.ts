import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MealFormValue } from "types/meal-types";
import { RootState } from "../../store/store";

export type AddMealFormState = {
  mealFormValue: MealFormValue;
};

// Meal Slice
const initialState: AddMealFormState = {
  mealFormValue: {
    title: "",
    description: "",
    tags: [],
    imageUrl: "https://picsum.photos/320/190",
  },
};

export const addMealFormSlice = createSlice({
  name: "meals",
  initialState,
  reducers: {
    setMealForm: (
      state,
      action: PayloadAction<{
        key: keyof MealFormValue;
        value: any;
      }>
    ) => {
      state.mealFormValue[action.payload.key] = action.payload.value;
    },
  },
});

// Actions
export const { setMealForm } = addMealFormSlice.actions;

// Selectors
export const selectMealFormValues = (state: RootState) =>
  state.addMealForm.mealFormValue;

export default addMealFormSlice.reducer;