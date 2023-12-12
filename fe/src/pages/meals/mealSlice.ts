import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchMeals } from "API/graphql/queries";
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
  "meals/fetchMeals",
  async () => {
    try {
      const { meals } = (await fetchMeals()) as { meals: MealData[] };
      return meals;
    } catch (error: any) {
      console.log("handle error in future, toast or sth", error);
      throw error;
    }
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
      })
      .addCase(fetchMealsAsync.rejected, (state) => {
        state.value = [];
      });
  },
});

// Selectors
export const selectMeals = (state: RootState) => state.meals.value;

export default mealsSlice.reducer;
