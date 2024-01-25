import DashboardLayout from "layouts/DashboardLayout";

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 PRO React TS components
import Box from "components/Box";

import DashboardNavbar from "layouts/DashboardNavbar";
import LoginCard from "./components/LoginCard";

function Login(): JSX.Element {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Box px={1} width="100%" height="80vh" mx="auto">
        <Grid
          container
          spacing={1}
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
            <LoginCard />
          </Grid>
        </Grid>
      </Box>
    </DashboardLayout>
  );
}

export default Login;
