import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { apiFetch } from '../../utils/api';
import { formatISO } from 'date-fns';

export const fetchMeals = createAsyncThunk(
    'meals/fetchAll',
    async (date, thunkAPI) => {
        const dateQuery = formatISO(date, { representation: 'date' });
        const response = await apiFetch(`meals?date=${dateQuery}`, {
            method: 'get'
        });
        return await response.json()
    }
);

export const updateMeal = createAsyncThunk(
    'meals/update',
    async (meal, thunkAPI) => {
        const response = await apiFetch(`meal/${meal.id}`, {
            method: 'PATCH',
            body: JSON.stringify(meal),
        });
        const responseMeal = await response.json();
        thunkAPI.dispatch(setMeal(responseMeal));
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

export const deleteMeal = createAction('deleteMeal');
