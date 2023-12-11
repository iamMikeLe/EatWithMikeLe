// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Material Dashboard 2 PRO React TS components
import Box from "components/Box";

import DashboardLayout from "layouts/DashboardLayout";
import DashboardNavbar from "layouts/DashboardNavbar";

// Images
import backgroundImage from "assets/images/bg-profile.jpg";

function AddMeal(): JSX.Element {
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
