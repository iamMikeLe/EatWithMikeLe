import { JSXElementConstructor, Key, ReactElement, useEffect } from "react";

// react-router components
import { Route, useLocation } from "react-router-dom";

// @mui material components
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";
import { ThemeProvider } from "@mui/material/styles";

// Material Dashboard 2 PRO React TS components
import MDBox from "components/MDBox";

// Material Dashboard 2 PRO React TS exampless
import Sidenav from "examples/Sidenav";

// Material Dashboard 2 PRO React TS Dark Mode themes
import themeDark from "assets/theme-dark";

// Material Dashboard 2 PRO React TS routes
import routes from "routes";

// pages
import Analytics from "layouts/dashboards/analytics";

// Images
import brandDark from "assets/images/logo-ct-dark.png";

export default function App() {
  const { pathname } = useLocation();

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes: any[]): any =>
    allRoutes.map(
      (route: {
        collapse: any;
        route: string;
        component: ReactElement<any, string | JSXElementConstructor<any>>;
        key: Key;
      }) => {
        if (route.collapse) {
          return getRoutes(route.collapse);
        }

        if (route.route) {
          return <Route path={route.route} element={route.component} key={route.key} />;
        }

        return null;
      }
    );

  return (
    <ThemeProvider theme={themeDark}>
      <CssBaseline />
      <>
        <Sidenav color="info" brand={brandDark} brandName="Eat With Mike Le" routes={routes} />

        <MDBox
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="3.25rem"
          height="3.25rem"
          bgColor="white"
          shadow="sm"
          borderRadius="50%"
          position="fixed"
          right="2rem"
          bottom="2rem"
          zIndex={99}
          color="dark"
          sx={{ cursor: "pointer" }}
          onClick={() => console.log("open filter")}
        >
          <Icon fontSize="small" color="inherit">
            settings
          </Icon>
        </MDBox>
      </>

      <Analytics />
    </ThemeProvider>
  );
}
