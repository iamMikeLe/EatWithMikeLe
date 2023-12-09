import Grid from "@mui/material/Grid";

import Box from "components/Box";
import MealCard from "components/MealCard";
import { useAppSelector } from "store/hooks";
import { selectMeals } from "./mealSlice";

function MealsSection(): JSX.Element {
  const meals = useAppSelector(selectMeals);
  return (
    <Box p={2}>
      <Grid container spacing={6}>
        {!meals && (
          <Grid item xs={12} md={6} xl={3}>
            Skeleton Loading...{" "}
          </Grid>
        )}
        {meals?.length === 0 && (
          <Grid item xs={12} md={6} xl={3}>
            No meals found{" "}
          </Grid>
        )}
        {meals && meals.length > 0 && (
          <>
            {/* Your existing code */}
            {meals.map((meal) => (
              <Grid item xs={12} md={6} xl={3} key={meal.mealId}>
                <MealCard
                  image={meal.imageUrl}
                  title={meal.title}
                  description={meal.description}
                  action={meal.action}
                />
              </Grid>
            ))}
          </>
        )}
      </Grid>
    </Box>
  );
}

export default MealsSection;
