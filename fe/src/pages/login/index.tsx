import { useState } from "react";
// react-router-dom components
import { Link } from "react-router-dom";

import DashboardLayout from "layouts/DashboardLayout";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";
import Switch from "@mui/material/Switch";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

// Material Dashboard 2 PRO React TS components
import Box from "components/Box";
import Button from "components/Button";
import Input from "components/Input";
import Typography from "components/Typography";

// Images
import DashboardNavbar from "layouts/DashboardNavbar";

function Login(): JSX.Element {
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const handleSetRememberMe = () => setRememberMe(!rememberMe);

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
            <Card>
              <Box
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
                mx={2}
                mt={-3}
                p={2}
                mb={1}
                textAlign="center"
              >
                <Typography
                  variant="h4"
                  fontWeight="medium"
                  color="white"
                  mt={1}
                >
                  Sign in
                </Typography>
                <Grid
                  container
                  spacing={3}
                  justifyContent="center"
                  sx={{ mt: 1, mb: 2 }}
                >
                  <Grid item xs={2}>
                    <Typography
                      component={MuiLink}
                      href="#"
                      variant="body1"
                      color="white"
                    >
                      <FacebookIcon color="inherit" />
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography
                      component={MuiLink}
                      href="#"
                      variant="body1"
                      color="white"
                    >
                      <GitHubIcon color="inherit" />
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography
                      component={MuiLink}
                      href="#"
                      variant="body1"
                      color="white"
                    >
                      <GoogleIcon color="inherit" />
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
              <Box pt={4} pb={3} px={3}>
                <Box component="form" role="form">
                  <Box mb={2}>
                    <Input type="email" label="Email" fullWidth />
                  </Box>
                  <Box mb={2}>
                    <Input type="password" label="Password" fullWidth />
                  </Box>
                  <Box display="flex" alignItems="center" ml={-1}>
                    <Switch
                      checked={rememberMe}
                      onChange={handleSetRememberMe}
                    />
                    <Typography
                      variant="button"
                      fontWeight="regular"
                      color="text"
                      onClick={handleSetRememberMe}
                      sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
                    >
                      &nbsp;&nbsp;Remember me
                    </Typography>
                  </Box>
                  <Box mt={4} mb={1}>
                    <Button variant="gradient" color="info" fullWidth>
                      sign in
                    </Button>
                  </Box>
                  <Box mt={3} mb={1} textAlign="center">
                    <Typography variant="button" color="text">
                      Don&apos;t have an account?{" "}
                      <Typography
                        component={Link}
                        to="/authentication/sign-up/cover"
                        variant="button"
                        color="info"
                        fontWeight="medium"
                        textGradient
                      >
                        Sign up
                      </Typography>
                    </Typography>
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

export default Login;
