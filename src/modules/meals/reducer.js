import { createReducer } from '@reduxjs/toolkit';
import { deleteMeal, fetchMeals, setMeal } from './actions';

const mealsReducer = createReducer({}, {
    [fetchMeals.fulfilled]: (state, action) => {
        return action.payload.reduce((acc, curr) => {
            acc[curr.id] = curr;
            return acc;
        }, {});
    },
    [setMeal]: (state, action) => {
        state[action.payload.id] = action.payload;
    },
    [deleteMeal.fulfilled]: (state, action) => {
        delete state[action.meta.arg.id];
    },
});

export default mealsReducer;
