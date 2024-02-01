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
    imageUrl: null,
    image: undefined,
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
    setImageUrl: (state, action: PayloadAction<string>) => {
      state.mealFormValue.imageUrl = action.payload;
    },
  },
});

// Actions
export const { setMealForm, setImageUrl } = addMealFormSlice.actions;

// Selectors
export const selectMealFormValues = (state: RootState) =>
  state.addMealForm.mealFormValue;

export const selectImageUrl = (state: RootState) =>
  state.addMealForm.mealFormValue.imageUrl;

export const selectUploadedImage = (state: RootState) =>
  state.addMealForm.mealFormValue.image;

export default addMealFormSlice.reducer;
