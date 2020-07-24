import { createAsyncThunk } from "@reduxjs/toolkit";
import { authFetch } from "../../utils/api";

export const fetchCategories = createAsyncThunk(
    'categories/fetchAll',
    async (_, thunkAPI) => {
        const response = await authFetch(`categories`, { method: 'get' });
        return response.json();
    }
);
