import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "store/hooks";

// @mui material components
import Autocomplete from "@mui/material/Autocomplete";
import Grid from "@mui/material/Grid";

import { Box, Input, Typography } from "components";
import { selectMealFormValues, setMealForm } from "../addMealSlice";

const dummyTags = [
  { name: "universal", id: 1 },
  { name: "breakfast", id: 2 },
  { name: "lunch", id: 3 },
  { name: "dinner", id: 4 },
  { name: "desert", id: 5 },
];

function ProductInfo(): JSX.Element {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const mealForm = useAppSelector(selectMealFormValues);

  return (
    <Box mb={5}>
      <Typography variant="h5">{t("MEAL_INFO")}</Typography>
      <Box mt={3}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Input
              type="text"
              label={t("TITLE")}
              variant="standard"
              fullWidth
              value={mealForm.title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                dispatch(setMealForm({ key: "title", value: e.target.value }))
              }
            />
          </Grid>
          <Grid item xs={12}>
            <Box mb={3}>
              <Autocomplete
                multiple
                id="tags-filled"
                options={dummyTags.map((option) => option.name)}
                renderTags={(value: readonly string[], getTagProps) =>
                  value.map((option: string, index: number) => (
                    <Chip
                      variant="outlined"
                      label={option}
                      {...getTagProps({ index })}
                    />
                  ))
                }
                onChange={(_e, val) =>
                  dispatch(setMealForm({ key: "tags", value: val }))
                }
                renderInput={(params) => (
                  <TextField {...params} variant="standard" label={t("TAGS")} />
                )}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box mt={2}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Input
              type="text"
              multiline
              rows={5}
              label={t("DESCRIPTION")}
              variant="standard"
              fullWidth
              value={mealForm.description}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                dispatch(
                  setMealForm({ key: "description", value: e.target.value })
                )
              }
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default ProductInfo;
