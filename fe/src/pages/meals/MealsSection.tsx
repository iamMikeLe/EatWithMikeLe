import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";

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
          <>
            {Array.from(new Array(12)).map((_item, index) => (
              <Grid item xs={12} md={6} xl={3} wrap="nowrap">
                <Box key={index} sx={{ width: 210, marginRight: 0.5, my: 5 }}>
                  <Skeleton variant="rectangular" width={320} height={200} />
                  <Box sx={{ pt: 0.5 }}>
                    <Skeleton width="60%" />
                    <Skeleton />
                    <Skeleton width="40%" />
                  </Box>
                </Box>
              </Grid>
            ))}
          </>
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
