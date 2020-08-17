import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../utils/api";

export const fetchMe = createAsyncThunk("me/fetch", async (_, thunkAPI) => {
  return client("auth/me");
});
