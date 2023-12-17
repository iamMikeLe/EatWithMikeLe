import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { NavLink, useLocation } from "react-router-dom";

// @mui material components
import Divider from "@mui/material/Divider";
import { Typography } from "components";

// Material Dashboard 2 PRO React TS examples components
import SidenavCollapse from "../Sidenav/SidenavCollapse";

// Custom styles for the Sidenav

// Material Dashboard 2 PRO React context
import { useMaterialUIController } from "context";

// Declaring props types for Sidenav
type Props = {
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
};

function ItemsByRoutes({ routes }: Props): JSX.Element {
  const [controller] = useMaterialUIController();
  const { transparentSidenav, whiteSidenav, darkMode } = controller;
  const location = useLocation();
  const { t } = useTranslation();
  const { pathname } = location;
  const collapseName = pathname.split("/").slice(1)[0];

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

  // Render all the routes from the routes.js (All the visible items on the Sidenav)
  return (
    <>
      {routes.map(({ type, name, icon, title, key, route }: any) => {
        if (type === "noDisplay") {
          return null;
        }
        if (type === "menuItem") {
          return (
            <NavLink to={route} key={key}>
              <SidenavCollapse
                name={t(name)}
                icon={icon}
                active={key === collapseName}
              />
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
      })}
    </>
  );
}

export default ItemsByRoutes;
