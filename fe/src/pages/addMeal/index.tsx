import { useTranslation } from "react-i18next";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Material Dashboard 2 PRO React TS components
import Box from "components/Box";
import Button from "components/Button";
import Typography from "components/Typography";

import DashboardLayout from "layouts/DashboardLayout";
import DashboardNavbar from "layouts/DashboardNavbar";

// page components
import MealInfo from "./components/MealInfo";
import MediaUpload from "./components/MediaUpload";

function AddMeal(): JSX.Element {
  const { t } = useTranslation();
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
                      onClick={() => console.log("send")}
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
