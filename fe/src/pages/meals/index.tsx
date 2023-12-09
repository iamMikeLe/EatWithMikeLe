import { useEffect, useState } from "react";

// @mui material components
import FaceIcon from "@mui/icons-material/Face";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AppBar from "@mui/material/AppBar";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

// Material Dashboard 2 PRO React TS components
import Box from "components/Box";
import Input from "components/Input";

import DashboardLayout from "layouts/DashboardLayout";
import DashboardNavbar from "layouts/DashboardNavbar";

// Material Dashboard 2 PRO React TS Base Styles
import breakpoints from "assets/theme/base/breakpoints";

// Images
import backgroundImage from "assets/images/bg-profile.jpeg";

//Meals components
import { useAppDispatch } from "store/hooks";
import MealsSection from "./MealsSection";
import { fetchMealsAsync } from "./mealSlice";

function Meals(): JSX.Element {
  const dispatch = useAppDispatch();
  const [tabsOrientation, setTabsOrientation] = useState<
    "horizontal" | "vertical"
  >("horizontal");
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    // A function that sets the orientation state of the tabs.
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

    /** 
      The event listener that's calling the handleTabsOrientation function when resizing the window.
    */
    window.addEventListener("resize", handleTabsOrientation);

    // Call the handleTabsOrientation function to set the state with the initial value.
    handleTabsOrientation();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);

  useEffect(() => {
    dispatch(fetchMealsAsync());
  }, []);

  const handleSetTabValue = (_event: any, newValue: any) =>
    setTabValue(newValue);

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
                <Input label="Search for meal..." />
              </Box>
            </Grid>
            <Grid item xs={12} md={6} lg={4} sx={{ ml: "auto" }}>
              <AppBar position="static">
                <Tabs
                  orientation={tabsOrientation}
                  value={tabValue}
                  onChange={handleSetTabValue}
                >
                  <Tab
                    label="All meals"
                    icon={<FastfoodIcon fontSize="small" sx={{ mt: -0.25 }} />}
                  />
                  <Tab
                    label="My Meals"
                    icon={<FaceIcon fontSize="small" sx={{ mt: -0.25 }} />}
                  />
                  <Tab
                    label="Favorites"
                    icon={<FavoriteIcon fontSize="small" sx={{ mt: -0.25 }} />}
                  />
                </Tabs>
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
