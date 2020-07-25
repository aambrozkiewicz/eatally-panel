import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../utils/api";

export const fetchCategories = createAsyncThunk(
    'categories/fetchAll',
    async (_, thunkAPI) => {
        return client('categories');
    }
);
