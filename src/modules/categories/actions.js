import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiUrl } from "../../utils/api";

export const fetchCategories = createAsyncThunk(
    'categories/fetchAll',
    async (_, thunkAPI) => {
        const response = await fetch(`${apiUrl}/categories`);
        return response.json();
    }
);
