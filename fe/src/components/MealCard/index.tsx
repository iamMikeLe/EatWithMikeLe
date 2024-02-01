// react-router-dom components
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";

// Material Dashboard 2 PRO React TS components
import Box from "components/Box";
import Button from "components/Button";
import Typography from "components/Typography";

// Declaring props types for DefaultProjectCard
type Props = {
  image: string;
  title: string;
  description: string;
  [key: string]: any;
};

function MealCard({ image, title, description }: Props): JSX.Element {
  const { t } = useTranslation();
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
            height: 190,
            width: 320,
          }}
        />
      </Box>
      <Box mt={1} mx={0.5}>
        <Typography
          variant="button"
          fontWeight="regular"
          color="text"
          textTransform="capitalize"
        >
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
            to="/meal/dynamicIDForFuture"
            variant="outlined"
            size="small"
            color="info"
          >
            {t("VIEW_MEAL")}
          </Button>
        </Box>
      </Box>
    </Card>
  );
}

export default MealCard;
