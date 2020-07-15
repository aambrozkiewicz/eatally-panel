import { configureStore, createReducer } from '@reduxjs/toolkit';
import { setMeal } from './actions';

const INITIAL_STATE = {
    1: { id: 1, name: 'test', price: 16.4 },
};

const mealsReducer = createReducer(INITIAL_STATE, {
    [setMeal]: (state, action) => {
        state[action.payload.id] = action.payload;
    },
});

const store = configureStore({
    reducer: {
        meals: mealsReducer,
    },
})

export default store;
