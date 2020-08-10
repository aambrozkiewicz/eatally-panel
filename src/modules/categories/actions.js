import { createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { client } from "../../utils/api";

export const fetchCategories = createAsyncThunk(
    'categories/fetchAll',
    async (_, thunkAPI) => {
        return client('categories');
    }
);

export const setCategory = createAction('category/set');
export const removeCategory = createAction('category/remove');
