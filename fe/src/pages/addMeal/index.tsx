import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

import { Box, Button, Typography } from "components";
import DashboardLayout from "layouts/DashboardLayout";
import DashboardNavbar from "layouts/DashboardNavbar";
import { useAppDispatch, useAppSelector } from "store/hooks";

// page components
import { createMeal, fetchS3URL } from "API/graphql/queries";
import {
  selectMealFormValues,
  selectUploadedImage,
  setMealForm,
} from "./addMealSlice";
import MealInfo from "./components/MealInfo";

import axios from "axios";
import "./AddMeal.css";

interface ImageInfo {
  src: string;
  fileInfo: {
    name: string;
  };
}

function AddMeal(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [addMealLoading, setAddMealLoading] = useState<boolean>(false);
  const mealForm = useAppSelector(selectMealFormValues);
  const image = useAppSelector(selectUploadedImage);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageInfo: ImageInfo = {
          src: reader.result as string,
          fileInfo: {
            name: file.name,
          },
        };
        dispatch(setMealForm({ key: "image", value: imageInfo }));
        setUploadedFile(file);
      };
      reader.readAsDataURL(file);
    },
    [dispatch]
  );

  const createMealAsync = async () => {
    // TODO: add validation
    setAddMealLoading(true);

    try {
      // fetch s3 url
      const s3Url = await fetchS3URL();
      const uploadUrl = s3Url.data.s3URL;
      const imageUrl = uploadUrl.split("?")[0];

      // Upload file to s3Url using Axios
      await axios.put(uploadUrl, uploadedFile, {
        headers: {
          "Content-Type": uploadedFile?.type,
        },
      });

      // create meal
      const createdMeal = await createMeal({ ...mealForm, imageUrl });
      setAddMealLoading(false);
      const mealId = (createdMeal as any).data.meal.id;
      navigate(`/meal/${mealId}`);
    } catch (error) {
      setAddMealLoading(false);
      console.log("need error toest handler", error);
    }
  };

  const handleRemove = () => {
    dispatch(setMealForm({ key: "image", value: undefined }));
  };

  const { getRootProps } = useDropzone({
    accept: { "image/*": [] },
    maxFiles: 1,
    onDrop,
  });

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Box mt={5} mb={9}>
        <Grid container justifyContent="center">
          <Grid item xs={12} lg={8}>
            <Box mt={6} mb={8} textAlign="center">
              <Box mb={1}>
                <Typography variant="h3" fontWeight="bold">
                  {t("ADD_NEW_MEAL")}
                </Typography>
              </Box>
              <Typography variant="h5" fontWeight="regular" color="secondary">
                {t("ADD_NEW_MEAL_DESCRIPTION")}
              </Typography>
            </Box>
            <Card>
              <Box p={2}>
                <Box>
                  <MealInfo />
                  <Box>
                    <Typography variant="h5"> {t("MEAL_UPLOAD")}</Typography>
                    <Box mt={3}>
                      <Box
                        mb={1}
                        ml={0.5}
                        lineHeight={0}
                        display="inline-block"
                      >
                        <Typography
                          component="label"
                          variant="button"
                          fontWeight="regular"
                          color="text"
                        >
                          {t("MEAL_IMAGES")}
                        </Typography>
                      </Box>

                      {!image && (
                        <div
                          {...getRootProps({ className: "dropzone" })}
                          className="custom-dropzone"
                        >
                          <p>Choose a cover picture</p>
                        </div>
                      )}

                      {image && (
                        <aside className="custom-thumbsContainer">
                          <div className="custom-thumb">
                            <div className="custom-thumbInner">
                              <img
                                src={image.src}
                                className="custom-img-style"
                              />
                              <button onClick={handleRemove}>x</button>
                            </div>
                          </div>
                        </aside>
                      )}
                    </Box>
                  </Box>
                  <Box
                    mt={3}
                    width="100%"
                    display="flex"
                    justifyContent="space-between"
                  >
                    <Box />
                    <Button
                      variant="gradient"
                      color="dark"
                      disabled={addMealLoading}
                      onClick={() => createMealAsync()}
                    >
                      {t("ADD")}
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </DashboardLayout>
  );
}

export default AddMeal;
