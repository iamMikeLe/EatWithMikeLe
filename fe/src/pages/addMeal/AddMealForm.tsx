import Autocomplete from "@mui/material/Autocomplete";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import { useTranslation } from "react-i18next";

// Material Dashboard 2 PRO React TS components
import Box from "components/Box";
import Button from "components/Button";
import FormField from "components/FormField";
import Typography from "components/Typography";

const selectData = {
  gender: ["Male", "Female"],
  skills: ["react", "vue", "angular", "svelte", "javascript"],
};

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
            <FormField label="First Name" placeholder="Alec" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Autocomplete
              defaultValue="Male"
              options={selectData.gender}
              renderInput={(params) => (
                <FormField
                  {...params}
                  label="I'm"
                  InputLabelProps={{ shrink: true }}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormField
              label="Email"
              placeholder="example@email.com"
              inputProps={{ type: "email" }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              label="confirmation email"
              placeholder="example@email.com"
              inputProps={{ type: "email" }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Autocomplete
              multiple
              defaultValue={["react", "angular"]}
              options={selectData.skills}
              renderInput={(params) => (
                <FormField {...params} InputLabelProps={{ shrink: true }} />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              label="Phone Number"
              placeholder="+40 735 631 620"
              inputProps={{ type: "number" }}
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
