import { createReducer } from '@reduxjs/toolkit';
import { setMeal, deleteMeal, fetchMeals } from './actions';

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
    [deleteMeal]: (state, action) => {
        delete state[action.payload.id];
    }
});

export default mealsReducer;
