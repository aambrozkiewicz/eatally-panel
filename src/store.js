import { configureStore } from '@reduxjs/toolkit';
import mealsReducer from './modules/meals/reducer';

const store = configureStore({
    reducer: {
        meals: mealsReducer,
    },
})

export default store;
