import { useEffect } from "react";
import { useTranslation } from "react-i18next";

// @mui material components
import AppBar from "@mui/material/AppBar";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

import { Box, Input } from "components";

import BannerImage from "layouts/BannerImage";
import DashboardLayout from "layouts/DashboardLayout";
import DashboardNavbar from "layouts/DashboardNavbar";

//Meals components
import { useAppDispatch } from "store/hooks";
import MealsSection from "./MealsSection";
import TabsSection from "./TabsSection";
import { fetchMealsAsync } from "./mealSlice";

function Meals(): JSX.Element {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  useEffect(() => {
    dispatch(fetchMealsAsync());
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Box mb={2} />
      <Box position="relative" mb={5}>
        <BannerImage />
        <Card
          sx={{
            position: "relative",
            mt: -8,
            mx: 3,
            py: 2,
            px: 2,
          }}
        >
          <Grid container spacing={3} alignItems="center">
            <Grid item>
              <Box height="100%" mt={0.5} lineHeight={1}>
                <Input label={t("SEARCH_MEAL")} />
              </Box>
            </Grid>
            <Grid item xs={12} md={6} lg={4} sx={{ ml: "auto" }}>
              <AppBar position="static">
                <TabsSection />
              </AppBar>
            </Grid>
          </Grid>
          <MealsSection />
        </Card>
      </Box>
    </DashboardLayout>
  );
}

export default Meals;
