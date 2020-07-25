import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from './modules/categories/reducer';
import mealsReducer from './modules/meals/reducer';
import userReducer from './modules/user/reducer';

const store = configureStore({
    reducer: {
        user: userReducer,
        meals: mealsReducer,
        categories: categoriesReducer,
    },
})

export default store;
