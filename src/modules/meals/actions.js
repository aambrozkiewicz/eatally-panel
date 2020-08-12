import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { formatISO } from "date-fns";
import { client } from "../../utils/api";

export const fetchMeals = createAsyncThunk(
  "meals/fetchAll",
  async (date, thunkAPI) => {
    let dateQuery = "";
    if (date) {
      dateQuery = formatISO(date, { representation: "date" });
    }

    return client(`meals?date=${dateQuery}`);
  }
);

export const setMeal = createAction("setMeal", (meal) => {
  return {
    payload: {
      ...meal,
      id: meal.id || new Date().getMilliseconds(),
      price: (Math.round(meal.price * 100) / 100).toFixed(2),
    },
  };
});

export const deleteMeal = createAsyncThunk(
  "meals/delete",
  async (meal, thunkAPI) => {
    return client(`meal/${meal.id}`, { method: "DELETE" });
  }
);
