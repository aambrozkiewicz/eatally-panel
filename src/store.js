import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./modules/user/reducer";
import mealsReducer from "./modules/meals/reducer";
import categoriesReducer from "./modules/categories/reducer";
import cateringReducer from "./modules/catering/reducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    catering: cateringReducer,
    meals: mealsReducer,
    categories: categoriesReducer,
  },
});

export default store;
