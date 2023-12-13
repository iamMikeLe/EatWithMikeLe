import { useTranslation } from "react-i18next";

// @mui material components
import Autocomplete from "@mui/material/Autocomplete";
import Grid from "@mui/material/Grid";

// Material Dashboard 2 PRO React TS components
import Box from "components/Box";

import Input from "components/Input";
import Typography from "components/Typography";

function ProductInfo(): JSX.Element {
  const { t } = useTranslation();
  return (
    <Box>
      <Typography variant="h5">{t("MEAL_INFO")}</Typography>
      <Box mt={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Input
              type="text"
              label={t("TITLE")}
              variant="standard"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Input
              type="text"
              label={t("DESCRIPTION")}
              variant="standard"
              fullWidth
            />
          </Grid>
        </Grid>
      </Box>
      <Box mt={2}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Box mb={1} ml={0.5} lineHeight={0} display="inline-block">
              <Typography
                component="label"
                variant="button"
                fontWeight="regular"
                color="text"
              >
                {t("DESCRIPTION")}&nbsp;&nbsp;
                <Typography variant="caption" color="text">
                  (optional)
                </Typography>
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box mb={3}>
              <Box mb={2} display="inline-block">
                <Typography
                  component="label"
                  variant="button"
                  fontWeight="regular"
                  color="text"
                  textTransform="capitalize"
                >
                  Category
                </Typography>
              </Box>
              <Autocomplete
                defaultValue="Clothing"
                options={[
                  "Clothing",
                  "Electronics",
                  "Furniture",
                  "Others",
                  "Real Estate",
                ]}
                renderInput={(params) => (
                  <Input {...params} variant="standard" />
                )}
              />
            </Box>
            <Box mb={2} display="inline-block">
              <Typography
                component="label"
                variant="button"
                fontWeight="regular"
                color="text"
                textTransform="capitalize"
              >
                Size
              </Typography>
            </Box>
            <Autocomplete
              defaultValue="Medium"
              options={[
                "Extra Large",
                "Extra Small",
                "Large",
                "Medium",
                "Small",
              ]}
              renderInput={(params) => <Input {...params} variant="standard" />}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default ProductInfo;
