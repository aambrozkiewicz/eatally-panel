import { createAction, createReducer } from '@reduxjs/toolkit';
import React, { useEffect, useReducer } from 'react';
import { Button, Form, FormGroup, Spinner } from "react-bootstrap";
import { useDispatch } from 'react-redux';
import { setMeal } from '../../modules/meals/actions';
import { apiFetch } from '../../utils/api';

const setField = createAction('setField');
const setLoading = createAction('setLoading');
const clear = createAction('clear');
const loadMeal = createAction('loadMeal');

const initialState = {
    id: null,
    name: '',
    price: '',
    loading: false,
};

const reducer = createReducer(initialState, {
    [setField]: (state, action) => {
        state[action.payload.key] = action.payload.value;
    },
    [clear]: (state, action) => {
        state.id = null;
        state.name = '';
        state.price = '';
        state.loading = false;
    },
    [loadMeal]: (state, action) => {
        return {
            ...state,
            ...action.payload
        };
    },
    [setLoading]: state => { state.loading = true },
});

const MealForm = ({ className, ...props }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { id, name, price, loading } = state;
    const globalDispatch = useDispatch();

    useEffect(() => {
        if (props.meal) {
            dispatch(loadMeal(props.meal));
        } else {
            dispatch(clear());
        }
    }, [props.meal]);

    const onSubmit = async (e) => {
        e.preventDefault();

        dispatch(setLoading());

        let response;
        if (id !== null) {
            response = await apiFetch(`meal/${id}`, {
                method: 'PATCH',
                body: JSON.stringify({ name, price }),
            });
        } else {
            response = await apiFetch('meal', {
                method: 'POST',
                body: JSON.stringify({ name, price, date: props.date }),
            });
        }

        const responseMeal = await response.json();
        globalDispatch(setMeal(responseMeal));
        dispatch(clear());
        props.onSuccess && props.onSuccess();
    }

    return (
        <Form onSubmit={onSubmit} {...{ className }}>
            <FormGroup>
                <Form.Label>Nazwa</Form.Label>
                <Form.Control
                    type="text"
                    value={name}
                    onChange={e => dispatch(setField({ key: 'name', value: e.currentTarget.value }))}
                    placeholder="Pierś z kurczaka w sosie własnym 👨‍🍳" />
            </FormGroup>
            <Form.Group controlId="formPrice">
                <Form.Label>Cena</Form.Label>
                <Form.Control
                    type="number"
                    step="0.01"
                    value={price}
                    onChange={e => dispatch(setField({ key: 'price', value: e.currentTarget.value }))}
                    placeholder="np. 10,99 PLN" />
            </Form.Group>
            <Button type="submit" variant="outline-primary" disabled={loading}>
                Zapisz
                {loading &&
                    <Spinner
                        className="ml-1"
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                    />}
            </Button>
        </Form>
    )
};

export default MealForm;
