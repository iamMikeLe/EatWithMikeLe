// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";

// Material Dashboard 2 PRO React TS components
import Box from "components/Box";
import Button from "components/Button";
import Typography from "components/Typography";

// Declaring props types for DefaultProjectCard
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

function MealCard({ image, title, description, action }: Props): JSX.Element {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "transparent",
        boxShadow: "none",
        overflow: "visible",
      }}
    >
      <Box position="relative" width="100.25%" shadow="xl" borderRadius="xl">
        <CardMedia
          src={image}
          component="img"
          title={title}
          sx={{
            maxWidth: "100%",
            margin: 0,
            boxShadow: ({ boxShadows: { md } }) => md,
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      </Box>
      <Box mt={1} mx={0.5}>
        <Typography variant="button" fontWeight="regular" color="text" textTransform="capitalize">
          {title}
        </Typography>
        <Box mb={3} lineHeight={0}>
          <Typography variant="button" fontWeight="light" color="text">
            {description}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Button
            component={Link}
            to={action.route}
            variant="outlined"
            size="small"
            color={action.color}
          >
            {action.label}
          </Button>
        </Box>
      </Box>
    </Card>
  );
}

export default MealCard;
