import { createReducer } from "@reduxjs/toolkit";
import { fetchMe } from "./actions";

const reducer = createReducer(
  {},
  {
    [fetchMe.fulfilled]: (state, action) => {
      return action.payload;
    },
  }
);

export default reducer;
