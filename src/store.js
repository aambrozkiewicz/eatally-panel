import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from './modules/categories/reducer';
import mealsReducer from './modules/meals/reducer';

const store = configureStore({
    reducer: {
        meals: mealsReducer,
        categories: categoriesReducer,
    },
})

export default store;
