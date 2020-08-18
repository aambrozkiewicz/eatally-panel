import { configureStore } from "@reduxjs/toolkit";
import panelReducer from "./modules/panel/reducer";

const store = configureStore({
  reducer: {
    panel: panelReducer,
  },
});

export default store;
