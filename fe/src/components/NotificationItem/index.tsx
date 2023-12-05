import { FC, ReactNode, forwardRef } from "react";

// @mui material components
import { MenuItemProps } from "@mui/material";
import Link from "@mui/material/Link";
import MenuItem from "@mui/material/MenuItem";

// Material Dashboard 2 PRO React TS components
import Box from "components/Box";
import Typography from "components/Typography";

// custom styles for the NotificationItem
import menuItem from "./styles";

// Declaring props types for NotificationItem
interface Props extends MenuItemProps {
  icon: ReactNode;
  title: string;
  [key: string]: any;
}

const NotificationItem: FC<Props> = forwardRef(({ icon, title, ...rest }, ref) => (
  <MenuItem {...rest} ref={ref} sx={(theme) => menuItem(theme)}>
    <Box component={Link} py={0.5} display="flex" alignItems="center" lineHeight={1}>
      <Typography variant="body1" color="secondary" lineHeight={0.75}>
        {icon}
      </Typography>
      <Typography variant="button" fontWeight="regular" sx={{ ml: 1 }}>
        {title}
      </Typography>
    </Box>
  </MenuItem>
));

export default NotificationItem;
