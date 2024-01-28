import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchMeals } from "API/graphql/queries";
import { MealData } from "types/meal-types";
import { RootState } from "../../store/store";

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
      const { data } = await fetchMeals();
      return data.meals;
    } catch (error: any) {
      console.log("handle error in future, toast or sth", error);
      throw error;
    }
  }
);

export const mealsSlice: any = createSlice({
  name: "meals",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMealsAsync.pending, (state) => {
        // resetting state to trigger loading
        state.value = null;
      })
      .addCase(
        fetchMealsAsync.fulfilled,
        (state, action: PayloadAction<MealData[]>) => {
          state.value = action.payload;
        }
      )
      .addCase(fetchMealsAsync.rejected, (state) => {
        state.value = [];
      });
  },
});

// Selectors
export const selectMeals = (state: RootState) => state.meals.value;

export default mealsSlice.reducer;
