import { dummyMeals } from "API/Dummy";
import { MealData } from "pages/meals/mealSlice";

// A mock function to mimic making an async request for data
export function fetchMeals(): Promise<{ data: MealData[] }> {
  return new Promise<{ data: MealData[] }>((resolve) =>
    setTimeout(() => resolve({ data: dummyMeals }), 1000)
  );
}

// A mock function to mimic making an async request for data
export function fetchCount(amount = 1) {
  return new Promise<{ data: number }>((resolve) =>
    setTimeout(() => resolve({ data: amount }), 500)
  );
}
