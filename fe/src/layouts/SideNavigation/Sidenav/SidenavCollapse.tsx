import { ReactNode } from "react";

// @mui material components
import Icon from "@mui/material/Icon";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import { Box } from "components";

// Custom styles for the SidenavCollapse
import {
  collapseIcon,
  collapseIconBox,
  collapseItem,
  collapseText,
} from "./styles/sidenavCollapse";

// Material Dashboard 2 PRO React context
import { useMaterialUIController } from "context";

// Declaring props types for SidenavCollapse
type Props = {
  icon: ReactNode;
  name: string;
  active?: Boolean;
  open?: Boolean;
  [key: string]: any;
};

function SidenavCollapse({
  icon,
  name,
  active,
  open,
  ...rest
}: Props): JSX.Element {
  const [controller] = useMaterialUIController();
  const { miniSidenav, transparentSidenav, whiteSidenav, darkMode } =
    controller;

  return (
    <>
      <ListItem component="li">
        <Box
          {...rest}
          sx={(theme: any) =>
            collapseItem(theme, {
              active,
              transparentSidenav,
              whiteSidenav,
              darkMode,
            })
          }
        >
          <ListItemIcon
            sx={(theme) =>
              collapseIconBox(theme, {
                transparentSidenav,
                whiteSidenav,
                darkMode,
              })
            }
          >
            {typeof icon === "string" ? (
              <Icon sx={(theme) => collapseIcon(theme, { active })}>
                {icon}
              </Icon>
            ) : (
              icon
            )}
          </ListItemIcon>

          <ListItemText
            primary={name}
            sx={(theme) =>
              collapseText(theme, {
                miniSidenav,
                transparentSidenav,
                whiteSidenav,
                active,
              })
            }
          />
        </Box>
      </ListItem>
    </>
  );
}

// Declaring default props for SidenavCollapse
SidenavCollapse.defaultProps = {
  active: false,
  open: false,
};

export default SidenavCollapse;
