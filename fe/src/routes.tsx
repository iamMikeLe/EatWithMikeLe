import Meals from "pages/meals";

// @mui icons
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LunchDiningIcon from "@mui/icons-material/LunchDining";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import Icon from "@mui/material/Icon";

const routes = [
  { type: "title", title: "Food", key: "title-docs" },
  {
    type: "collapse",
    name: "Meals",
    key: "meals",
    route: "/pages/meals",
    component: <Meals />,
    icon: <LunchDiningIcon fontSize="medium" />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Visited places",
    key: "places",
    route: "/dashboards/analytics",
    component: <Meals />,
    icon: <RestaurantMenuIcon fontSize="medium" />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Food planner",
    key: "planner",
    route: "/applications/calendar",
    component: <Meals />,
    icon: <CalendarMonthIcon fontSize="medium" />,
    noCollapse: true,
  },
];

export default routes;
