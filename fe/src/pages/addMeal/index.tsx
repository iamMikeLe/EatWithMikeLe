// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Material Dashboard 2 PRO React TS components
import Box from "components/Box";

import BannerImage from "layouts/BannerImage";
import DashboardLayout from "layouts/DashboardLayout";
import DashboardNavbar from "layouts/DashboardNavbar";

function AddMeal(): JSX.Element {
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
          <Box p={2} sx={{ marginTop: 6, marginBottom: 6 }}>
            <Grid container spacing={6}>
              <Grid item xs={12} md={12} xl={12}>
                add meal section
              </Grid>
            </Grid>
          </Box>
        </Card>
      </Box>
    </DashboardLayout>
  );
}

export default AddMeal;
