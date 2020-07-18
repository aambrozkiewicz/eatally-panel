import { createReducer } from '@reduxjs/toolkit';
import { setMeal, deleteMeal } from './actions';

const INITIAL_STATE = {
    1: { id: 1, name: 'Kurczak w panierce', price: 16.49 },
};

const mealsReducer = createReducer(INITIAL_STATE, {
    [setMeal]: (state, action) => {
        state[action.payload.id] = action.payload;
    },
    [deleteMeal]: (state, action) => {
        delete state[action.payload.id];
    }
});

export default mealsReducer;
