import React, { useReducer, useEffect } from 'react';
import { Form, FormGroup, Button, Spinner } from "react-bootstrap";
import { useDispatch } from 'react-redux';
import { setMeal } from '../actions';
import { createAction, createReducer } from '@reduxjs/toolkit';

const fieldAction = createAction('field');
const fetchingAction = createAction('fetching');
const clearAction = createAction('clear');
const loadAction = createAction('load');

const initialState = {
    id: null,
    name: '',
    price: '',
    loading: false,
};

const reducer = createReducer(initialState, {
    [fieldAction]: (state, action) => {
        state[action.payload.key] = action.payload.value;
    },
    [fetchingAction]: (state, action) => {
        state.loading = true;
    },
    [clearAction]: (state, action) => {
        state.id = null;
        state.name = '';
        state.price = '';
        state.loading = false;
    },
    [loadAction]: (state, action) => {
        return {
            ...state,
            ...action.payload
        };
    }
});

const MealForm = ({ className, ...props }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { id, name, price, loading } = state;
    const globalDispatch = useDispatch();

    useEffect(() => {
        if (props.meal) {
            dispatch(loadAction(props.meal));
        } else {
            dispatch(clearAction());
        }
    }, [props.meal]);

    const onSubmit = async (e) => {
        e.preventDefault();

        dispatch(fetchingAction());

        setTimeout(() => {
            globalDispatch(setMeal({ id, name, price }));
            dispatch(clearAction());
            props.onSuccess && props.onSuccess();
        }, 1000);
    }

    return (
        <Form onSubmit={onSubmit} {...{ className }}>
            <FormGroup>
                <Form.Label>Nazwa</Form.Label>
                <Form.Control
                    type="text"
                    value={name}
                    onChange={e => dispatch(fieldAction({ key: 'name', value: e.currentTarget.value }))}
                    placeholder="Pierś z kurczaka w sosie własnym 👨‍🍳" />
            </FormGroup>
            <Form.Group controlId="formPrice">
                <Form.Label>Cena</Form.Label>
                <Form.Control
                    type="number"
                    step="0.01"
                    value={price}
                    onChange={e => dispatch(fieldAction({ key: 'price', value: e.currentTarget.value }))}
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
