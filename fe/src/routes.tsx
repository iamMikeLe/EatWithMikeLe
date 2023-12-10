import Meals from "pages/meals";

// @mui icons
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LunchDiningIcon from "@mui/icons-material/LunchDining";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import { Counter } from "pages/counter/Counter";

const routes = [
  { type: "title", title: "FOOD_SECTION", key: "title-docs" },
  {
    type: "collapse",
    name: "MEALS",
    key: "meals",
    route: "/pages/meals",
    component: <Meals />,
    icon: <LunchDiningIcon fontSize="medium" />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "VISITED_PLACES",
    key: "places",
    route: "/dashboards/places",
    component: <Counter />,
    icon: <RestaurantMenuIcon fontSize="medium" />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "FOOD_PLANNER",
    key: "planner",
    route: "/applications/planner",
    component: <Meals />,
    icon: <CalendarMonthIcon fontSize="medium" />,
    noCollapse: true,
  },
];

export default routes;
