import { createReducer } from '@reduxjs/toolkit';
import { fetchCategories, setCategory, removeCategory } from './actions';

const categoriesReducer = createReducer({}, {
    [fetchCategories.fulfilled]: (state, action) => {
        return action.payload.reduce((acc, curr) => {
            acc[curr.id] = curr;
            return acc;
        }, {});
    },
    [setCategory]: (state, { payload }) => {
        state[payload.id] = payload;
    },
    [removeCategory]: (state, { payload }) => {
        delete state[payload];
    }
});

export default categoriesReducer;
