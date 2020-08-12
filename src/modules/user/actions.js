const { createAsyncThunk } = require("@reduxjs/toolkit");
const { client } = require("../../utils/api");

export const fetchMe = createAsyncThunk("me/fetch", async (_, thunkAPI) => {
  return client("auth/me");
});
