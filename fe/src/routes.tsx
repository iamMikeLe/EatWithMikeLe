import AddMeal from "pages/addMeal";
import Meals from "pages/meals";

// @mui icons
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LunchDiningIcon from "@mui/icons-material/LunchDining";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";

// TODO - fix type collapse, change it to different name? or just add another type for non displaying menu
const routes = [
  { type: "title", title: "FOOD_SECTION", key: "title-docs" },
  {
    type: "noDisplay",
    name: "MEALS",
    key: "meal",
    route: "/meal/:id",
    component: <Meals />,
    icon: <LunchDiningIcon fontSize="medium" />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "MEALS",
    key: "meals",
    route: "/meals",
    component: <Meals />,
    icon: <LunchDiningIcon fontSize="medium" />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "VISITED_PLACES",
    key: "places",
    route: "/places",
    component: <Meals />,
    icon: <RestaurantMenuIcon fontSize="medium" />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "FOOD_PLANNER",
    key: "planner",
    route: "/planner",
    component: <Meals />,
    icon: <CalendarMonthIcon fontSize="medium" />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "ADD_MEAL",
    key: "addMeal",
    route: "/add-meal",
    component: <AddMeal />,
    noCollapse: true,
  },
];

export default routes;
