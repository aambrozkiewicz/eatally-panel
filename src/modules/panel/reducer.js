import { combineReducers } from "@reduxjs/toolkit";
import categoriesReducer from "../categories/reducer";
import mealsReducer from "../meals/reducer";
import userReducer from "../user/reducer";

export default combineReducers({
  user: userReducer,
  meals: mealsReducer,
  categories: categoriesReducer,
});
