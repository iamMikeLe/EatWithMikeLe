import { useEffect } from "react";

// react-router components
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

// @mui material components
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";
import { ThemeProvider } from "@mui/material/styles";

// Material Dashboard 2 PRO React TS components
import MDBox from "components/MDBox";

// Material Dashboard 2 PRO React TS Dark Mode themes
import themeDark from "assets/theme-dark";

// routes
import routes from "routes";

// Images
import brandDark from "assets/images/logo-ct-dark.png";
import SideNavigation from "components/SideNavigation";

export default function App() {
  const { pathname } = useLocation();

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  return (
    <ThemeProvider theme={themeDark}>
      <CssBaseline />
      <>
        <SideNavigation
          color="info"
          brand={brandDark}
          brandName="Eat With Mike Le"
          routes={routes}
        />

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

      <Routes>
        {routes.map((route) => {
          if (route.type === "collapse") {
            return <Route path={route.route} element={route.component} key={route.key} />;
          }
        })}
        <Route path="*" element={<Navigate to="/dashboards/analytics" />} />
      </Routes>
    </ThemeProvider>
  );
}
