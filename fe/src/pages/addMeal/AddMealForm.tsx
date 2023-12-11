import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import { useTranslation } from "react-i18next";

// Material Dashboard 2 PRO React TS components
import Box from "components/Box";
import Button from "components/Button";
import FormField from "components/FormField";
import Typography from "components/Typography";

function AddMealForm(): JSX.Element {
  const { t } = useTranslation();
  return (
    <Card sx={{ overflow: "visible" }}>
      <Box p={3}>
        <Typography variant="h5">{t("ADD_MEAL")}</Typography>
      </Box>
      <Box component="form" pb={3} px={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormField
              label={t("TITLE")}
              placeholder={t("TITLE_PLACEHOLDER")}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              label={t("DESCRIPTION")}
              placeholder={t("DESCRIPTION_PLACEHOLDER")}
            />
          </Grid>
          <Grid item xs={12} sm={12} mt={2}>
            <Button variant="outlined" size="small" color="white">
              {t("ADD_MEAL")}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
}

export default AddMealForm;
