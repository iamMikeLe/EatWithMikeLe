import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { Box, Dropzone, Typography } from "components";

function Media(): JSX.Element {
  const { t } = useTranslation();
  return (
    <Box>
      <Typography variant="h5"> {t("MEAL_UPLOAD")}</Typography>
      <Box mt={3}>
        <Box mb={1} ml={0.5} lineHeight={0} display="inline-block">
          <Typography
            component="label"
            variant="button"
            fontWeight="regular"
            color="text"
          >
            {t("MEAL_IMAGES")}
          </Typography>
        </Box>
        {useMemo(
          () => (
            <Dropzone options={{ addRemoveLinks: true }} />
          ),
          []
        )}
      </Box>
    </Box>
  );
}

export default Media;
