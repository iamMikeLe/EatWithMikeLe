import { ReactNode, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { NavLink, useLocation } from "react-router-dom";

// @mui material components
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";
import List from "@mui/material/List";

import { Box, Typography } from "components";

// Material Dashboard 2 PRO React TS examples components
import SidenavCollapse from "./Sidenav/SidenavCollapse";

// Custom styles for the Sidenav
import SidenavRoot from "./Sidenav/SidenavRoot";
import sidenavLogoLabel from "./Sidenav/styles/sidenav";

// Material Dashboard 2 PRO React context
import {
  setMiniSidenav,
  setTransparentSidenav,
  setWhiteSidenav,
  useMaterialUIController,
} from "context";

// Declaring props types for Sidenav
type Props = {
  color?:
    | "primary"
    | "secondary"
    | "info"
    | "success"
    | "warning"
    | "error"
    | "dark";
  brand?: string;
  brandName: string;
  routes: {
    [key: string]:
      | ReactNode
      | string
      | {
          [key: string]:
            | ReactNode
            | string
            | {
                [key: string]: ReactNode | string;
              }[];
        }[];
  }[];
  [key: string]: any;
};

function SideNavigation({
  color,
  brand,
  brandName,
  routes,
  ...rest
}: Props): JSX.Element {
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, transparentSidenav, whiteSidenav, darkMode } =
    controller;
  const location = useLocation();
  const { t } = useTranslation();
  const { pathname } = location;
  const collapseName = pathname.split("/").slice(1)[0];
  const items = pathname.split("/").slice(1);

  let textColor:
    | "primary"
    | "secondary"
    | "info"
    | "success"
    | "warning"
    | "error"
    | "dark"
    | "white"
    | "inherit"
    | "text"
    | "light" = "white";

  if (transparentSidenav || (whiteSidenav && !darkMode)) {
    textColor = "dark";
  } else if (whiteSidenav && darkMode) {
    textColor = "inherit";
  }

  const closeSidenav = () => setMiniSidenav(dispatch, true);

  useEffect(() => {
    // A function that sets the mini state of the sidenav.
    function handleMiniSidenav() {
      setMiniSidenav(dispatch, window.innerWidth < 1200);
      setTransparentSidenav(
        dispatch,
        window.innerWidth < 1200 ? false : transparentSidenav
      );
      setWhiteSidenav(
        dispatch,
        window.innerWidth < 1200 ? false : whiteSidenav
      );
    }

    /** 
     The event listener that's calling the handleMiniSidenav function when resizing the window.
    */
    window.addEventListener("resize", handleMiniSidenav);

    // Call the handleMiniSidenav function to set the state with the initial value.
    handleMiniSidenav();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleMiniSidenav);
  }, [dispatch, location]);

  // Render all the routes from the routes.js (All the visible items on the Sidenav)
  const renderRoutes = routes.map(
    ({ type, name, icon, title, noCollapse, key, route }: any) => {
      if (type === "noDisplay") {
        return null;
      }
      if (type === "collapse") {
        return (
          <NavLink to={route} key={key}>
            <SidenavCollapse
              name={t(name)}
              icon={icon}
              noCollapse={noCollapse}
              active={key === collapseName}
            ></SidenavCollapse>
          </NavLink>
        );
      }

      if (type === "title") {
        return (
          <Typography
            key={key}
            color={textColor}
            display="block"
            variant="caption"
            fontWeight="bold"
            textTransform="uppercase"
            pl={3}
            mt={2}
            mb={1}
            ml={1}
          >
            {t(title)}
          </Typography>
        );
      }

      if (type === "divider") {
        return (
          <Divider
            key={key}
            light={
              (!darkMode && !whiteSidenav && !transparentSidenav) ||
              (darkMode && !transparentSidenav && whiteSidenav)
            }
          />
        );
      }
    }
  );

  return (
    <SidenavRoot
      {...rest}
      variant="permanent"
      ownerState={{ transparentSidenav, whiteSidenav, miniSidenav, darkMode }}
    >
      <Box pt={3} pb={1} px={4} textAlign="center">
        <Box
          display={{ xs: "block", xl: "none" }}
          position="absolute"
          top={0}
          right={0}
          p={1.625}
          onClick={closeSidenav}
          sx={{ cursor: "pointer" }}
        >
          <Typography variant="h6" color="secondary">
            <Icon sx={{ fontWeight: "bold" }}>close</Icon>
          </Typography>
        </Box>
        <Box component={NavLink} to="/" display="flex" alignItems="center">
          {brand && (
            <Box component="img" src={brand} alt="Brand" width="2rem" />
          )}
          <Box
            width={!brandName && "100%"}
            sx={(theme: any) => sidenavLogoLabel(theme, { miniSidenav })}
          >
            <Typography
              component="h6"
              variant="button"
              fontWeight="medium"
              color={textColor}
            >
              {brandName}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Divider
        light={
          (!darkMode && !whiteSidenav && !transparentSidenav) ||
          (darkMode && !transparentSidenav && whiteSidenav)
        }
      />
      <List>{renderRoutes}</List>
    </SidenavRoot>
  );
}

// Declaring default props for Sidenav
SideNavigation.defaultProps = {
  color: "info",
  brand: "",
};

export default SideNavigation;
