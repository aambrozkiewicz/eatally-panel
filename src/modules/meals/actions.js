import { createAction } from '@reduxjs/toolkit';

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
