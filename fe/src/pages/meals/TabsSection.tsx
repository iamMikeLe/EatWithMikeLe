import { useEffect, useState } from "react";

// @mui material components
import FaceIcon from "@mui/icons-material/Face";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

// Material Dashboard 2 PRO React TS Base Styles
import breakpoints from "assets/theme/base/breakpoints";

//Meals components
import { useAppDispatch } from "store/hooks";
import { fetchMealsAsync } from "./mealSlice";

function TabsSection(): JSX.Element {
  const dispatch = useAppDispatch();
  const [tabsOrientation, setTabsOrientation] = useState<
    "horizontal" | "vertical"
  >("horizontal");
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    // A function that sets the orientation state of the tabs.
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

    /** 
      The event listener that's calling the handleTabsOrientation function when resizing the window.
    */
    window.addEventListener("resize", handleTabsOrientation);

    // Call the handleTabsOrientation function to set the state with the initial value.
    handleTabsOrientation();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);

  const handleSetTabValue = (_event: any, newValue: any) => {
    dispatch(fetchMealsAsync());
    setTabValue(newValue);
  };
  return (
    <Tabs
      orientation={tabsOrientation}
      value={tabValue}
      onChange={handleSetTabValue}
    >
      <Tab
        label="All"
        icon={<FastfoodIcon fontSize="small" sx={{ mt: -0.25 }} />}
      />
      <Tab
        label="Moi"
        icon={<FaceIcon fontSize="small" sx={{ mt: -0.25 }} />}
      />
      <Tab
        label="Favorites"
        icon={<FavoriteIcon fontSize="small" sx={{ mt: -0.25 }} />}
      />
    </Tabs>
  );
}

export default TabsSection;
