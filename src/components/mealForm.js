import React, { useReducer, useEffect } from 'react';
import { Form, FormGroup, Button, Spinner } from "react-bootstrap";
import { useDispatch } from 'react-redux';
import { setMeal } from '../actions';

const initialState = {
    id: null,
    name: '',
    price: '',
    loading: false,
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'load':
            return {
                ...state,
                ...action.payload,
            }
        case 'field':
            return {
                ...state,
                [action.key]: action.value
            }
        case 'fetching':
            return {
                ...state,
                loading: true,
            }
        case 'clear':
            return initialState;
        default:
            return state;
    }
}

const MealForm = ({ className, ...props }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { id, name, price, loading } = state;

    const globalDispatch = useDispatch();

    useEffect(() => {
        if (props.meal) {
            dispatch({ type: 'load', payload: props.meal });
        } else {
            dispatch({ type: 'clear' });
        }
    }, [props.meal]);

    const onSubmit = async (e) => {
        e.preventDefault();

        dispatch({ type: 'fetching' });

        setTimeout(() => {
            globalDispatch(
                setMeal({
                    id: id || new Date().getMilliseconds(),
                    name,
                    price: (Math.round(price * 100) / 100).toFixed(2)
                })
            );

            dispatch({ type: 'clear' });
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
                    onChange={e => dispatch({ type: 'field', key: 'name', value: e.currentTarget.value })}
                    placeholder="Pierś z kurczaka w sosie własnym 👨‍🍳" />
            </FormGroup>
            <Form.Group controlId="formPrice">
                <Form.Label>Cena</Form.Label>
                <Form.Control
                    type="number"
                    step="0.01"
                    value={price}
                    onChange={e => dispatch({ type: 'field', key: 'price', value: e.currentTarget.value })}
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
