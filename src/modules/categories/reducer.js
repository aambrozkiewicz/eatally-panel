import { createReducer } from '@reduxjs/toolkit';
import { fetchCategories } from './actions';

const categoriesReducer = createReducer({}, {
    [fetchCategories.fulfilled]: (state, action) => {
        return action.payload.reduce((acc, curr) => {
            acc[curr.id] = curr;
            return acc;
        }, {});
    },
});

export default categoriesReducer;
