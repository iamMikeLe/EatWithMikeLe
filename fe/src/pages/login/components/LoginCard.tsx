// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// @mui icons
import {
  Facebook as FacebookIcon,
  GitHub as GitHubIcon,
  Google as GoogleIcon,
} from "@mui/icons-material";

// Material Dashboard 2 PRO React TS components
import Box from "components/Box";
import Typography from "components/Typography";
import LoginForm from "./LoginForm";

function LoginCard(): JSX.Element {
  return (
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
        <Typography variant="h4" fontWeight="medium" color="white" mt={1}>
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
          <LoginForm />
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
            L
          </Box>
        </Box>
      </Box>
    </Card>
  );
}

export default LoginCard;
