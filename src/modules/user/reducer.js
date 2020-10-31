import { createReducer } from "@reduxjs/toolkit";
import { fetchMe } from "./actions";

const reducer = createReducer(
  {},
  {
    [fetchMe.fulfilled]: (state, action) => {
      const user = {
        ...action.payload,
      };
      delete user.catering;
      return user;
    },
  }
);

export default reducer;
