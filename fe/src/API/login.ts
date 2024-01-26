import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiRootUrl = import.meta.env.VITE_ROOT_URL || "";

export const loginAsync = createAsyncThunk("login/login", async () => {
  try {
    const response = await axios.post(`${apiRootUrl}/login`, {
      email: "iam@mike-le.info",
      password: "123456Asd",
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
  }
});
