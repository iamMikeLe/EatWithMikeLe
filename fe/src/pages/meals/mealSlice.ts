import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchMeals } from "API/MealsAPI";
import { RootState } from "../../store/store";

export interface MealData {
  mealId: string;
  imageUrl: string;
  title: string;
  description: string;
  action: {
    route: string;
    color: "info";
    label: string;
  };
}

export interface MealsState {
  value: MealData[] | null;
}

// Meal Slice
const initialState: MealsState = {
  value: null,
};

export const fetchMealsAsync = createAsyncThunk(
  "counter/fetchMeals",
  async () => {
    const response = await fetchMeals();
    return response.data;
  }
);

export const mealsSlice = createSlice({
  name: "meals",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMealsAsync.pending, (state) => {
        // resetting state to trigger loading
        state.value = null;
      })
      .addCase(fetchMealsAsync.fulfilled, (state, action) => {
        state.value = action.payload;
      });
  },
});

// Selectors
export const selectMeals = (state: RootState) => state.meals.value;

export default mealsSlice.reducer;
