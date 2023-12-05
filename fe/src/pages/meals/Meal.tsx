import Grid from "@mui/material/Grid";

// Material Dashboard 2 PRO React TS components
import MealCard from "components/MealCard";

interface Props {
  image: string;
  title: string;
  description: string;
  action: {
    route: string;
    color:
      | "primary"
      | "secondary"
      | "info"
      | "success"
      | "warning"
      | "error"
      | "light"
      | "dark"
      | "white";
    label: string;
  };
  [key: string]: any;
}

function Meal({ image, title, description, action }: Props): JSX.Element {
  return (
    <Grid item xs={12} md={6} xl={3}>
      <MealCard image={image} title={title} description={description} action={action} />
    </Grid>
  );
}

export default Meal;
