import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchMeals } from "API/MealsAPI";
import { RootState } from "../../store/store";

export type MealData = {
  mealId: string;
  imageUrl: string;
  title: string;
  description: string;
  tags: string[] | null;
  author: string | null;
  authorId: string;
  createdAt: string | null;
  modifiedAt: string | null;
};

export type MealsState = {
  value: MealData[] | null;
};

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
