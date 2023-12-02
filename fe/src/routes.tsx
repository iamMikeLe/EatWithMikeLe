// Pages
import Calendar from "layouts/applications/calendar";
import Analytics from "layouts/dashboards/analytics";
import Meals from "pages/meals";

// @mui icons
import Icon from "@mui/material/Icon";

const routes = [
  { type: "title", title: "Food", key: "title-docs" },
  {
    type: "collapse",
    name: "Meals",
    key: "meals",
    route: "/pages/analytics",
    component: <Meals />,
    icon: <Icon fontSize="medium">Fastfood</Icon>,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Visited places",
    key: "places",
    route: "/dashboards/analytics",
    component: <Analytics />,
    icon: <Icon fontSize="medium">FmdGood</Icon>,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Food planner",
    key: "planner",
    route: "/applications/calendar",
    component: <Calendar />,
    icon: <Icon fontSize="medium">EditCalendar</Icon>,
    noCollapse: true,
  },
];

export default routes;
