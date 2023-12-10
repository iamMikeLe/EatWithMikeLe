import { useEffect } from "react";
import { useTranslation } from "react-i18next";

// @mui material components

import AppBar from "@mui/material/AppBar";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Material Dashboard 2 PRO React TS components
import Box from "components/Box";
import Input from "components/Input";

import DashboardLayout from "layouts/DashboardLayout";
import DashboardNavbar from "layouts/DashboardNavbar";

// Images
import backgroundImage from "assets/images/bg-profile.jpeg";

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
        <Box
          display="flex"
          alignItems="center"
          position="relative"
          minHeight="18.75rem"
          borderRadius="xl"
          sx={{
            backgroundImage: ({
              functions: { rgba, linearGradient },
              palette: { gradients },
            }) =>
              `${linearGradient(
                rgba(gradients.info.main, 0.6),
                rgba(gradients.info.state, 0.6)
              )}, url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "50%",
            overflow: "hidden",
          }}
        />
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
