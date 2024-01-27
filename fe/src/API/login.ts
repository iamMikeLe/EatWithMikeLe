import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiRootUrl = import.meta.env.VITE_ROOT_URL || "";

export type LoginCredentials = {
  email: string;
  password: string;
};

export const loginAsync = createAsyncThunk(
  "login/login",
  async ({ email, password }: LoginCredentials) => {
    try {
      const response = await axios.post(`${apiRootUrl}/login`, {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      console.error(error);
      console.log("toast to handle error");
    }
  }
);
