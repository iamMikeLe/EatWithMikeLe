import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

import { Box, Button, Typography } from "components";
import DashboardLayout from "layouts/DashboardLayout";
import DashboardNavbar from "layouts/DashboardNavbar";
import { useAppSelector } from "store/hooks";

// page components
import { createMeal } from "API/graphql/queries";
import { selectMealFormValues } from "./addMealSlice";
import MealInfo from "./components/MealInfo";
import MediaUpload from "./components/MediaUpload";

function AddMeal(): JSX.Element {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [addMealLoading, setAddMealLoading] = useState(false);
  const mealForm = useAppSelector(selectMealFormValues);

  const createMealAsync = async () => {
    // TODO: add validation
    setAddMealLoading(true);
    try {
      const createdMeal = await createMeal(mealForm);
      setAddMealLoading(false);
      const mealId = (createdMeal as any).meal.id;
      navigate(`/meal/${mealId}`);
    } catch (error) {
      setAddMealLoading(false);
      console.log("need error toest handler", error);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Box mt={5} mb={9}>
        <Grid container justifyContent="center">
          <Grid item xs={12} lg={8}>
            <Box mt={6} mb={8} textAlign="center">
              <Box mb={1}>
                <Typography variant="h3" fontWeight="bold">
                  {t("ADD_NEW_MEAL")}
                </Typography>
              </Box>
              <Typography variant="h5" fontWeight="regular" color="secondary">
                {t("ADD_NEW_MEAL_DESCRIPTION")}
              </Typography>
            </Box>
            <Card>
              <Box p={2}>
                <Box>
                  <MealInfo />
                  <MediaUpload />
                  <Box
                    mt={3}
                    width="100%"
                    display="flex"
                    justifyContent="space-between"
                  >
                    <Box />
                    <Button
                      variant="gradient"
                      color="dark"
                      disabled={addMealLoading}
                      onClick={() => createMealAsync()}
                    >
                      {t("ADD")}
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </DashboardLayout>
  );
}

export default AddMeal;
