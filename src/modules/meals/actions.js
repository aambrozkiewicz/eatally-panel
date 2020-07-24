import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { formatISO } from 'date-fns';
import { authFetch } from '../../utils/api';

export const fetchMeals = createAsyncThunk(
    'meals/fetchAll',
    async (date, thunkAPI) => {
        const dateQuery = formatISO(date, { representation: 'date' });
        const response = await authFetch(`meals?date=${dateQuery}`, {
            method: 'get'
        });
        return response.json();
    }
);

export const setMeal = createAction('setMeal', meal => {
    return {
        payload: {
            ...meal,
            id: meal.id || new Date().getMilliseconds(),
            price: (Math.round(meal.price * 100) / 100).toFixed(2),
        },
    };
});

export const deleteMeal = createAsyncThunk(
    'meals/delete',
    async (meal, thunkAPI) => {
        authFetch(`meal/${meal.id}`, {
            method: 'DELETE',
        });
    }
);
