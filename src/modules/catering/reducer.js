import { createReducer } from "@reduxjs/toolkit";
import { fetchMe } from "../user/actions";
import { setCatering } from "./actions";

const reducer = createReducer(
  {
    name: "",
  },
  {
    [fetchMe.fulfilled]: (state, action) => {
      return action.payload.catering;
    },
    [setCatering]: (state, { payload }) => {
      return payload;
    },
  }
);

export default reducer;
