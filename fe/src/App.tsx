import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

// @mui material components
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

// Material Dashboard 2 PRO React TS Dark Mode themes
import themeDark from "assets/theme-dark";

// routes
import routes from "routes";

// Images
import brandDark from "assets/images/logo-ct-dark.png";
import SideNavigation from "layouts/SideNavigation";
//store
import { selectLanguage } from "store/appSettingsSlice";
import { useAppSelector } from "store/hooks";

export default function App() {
  const language = useAppSelector(selectLanguage);
  const { pathname } = useLocation();
  const { i18n } = useTranslation();

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    i18n.changeLanguage(language);
    document.documentElement.scrollTop = 0;
    if (document.scrollingElement) {
      document.scrollingElement.scrollTop = 0;
    }
  }, [pathname, language]);

  return (
    <ThemeProvider theme={themeDark}>
      <CssBaseline />

      <SideNavigation
        color="info"
        brand={brandDark}
        brandName="Eat With Mike Le"
        routes={routes}
      />

      <Routes>
        {routes.map((route) => {
          if (route.type === "collapse") {
            return (
              <Route
                path={route.route}
                element={route.component}
                key={route.key}
              />
            );
          }
        })}
        <Route path="*" element={<Navigate to="/meals" />} />
      </Routes>
    </ThemeProvider>
  );
}
