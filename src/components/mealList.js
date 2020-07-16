import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { PencilSquare, Trash } from 'react-bootstrap-icons'

const Meals = styled.ul`
    list-style: none;
    padding: 0;
`;

const Meal = styled.li`
    transition: all .3s ease-in-out;

    &:hover {
        box-shadow: rgba(0, 0, 0, 0.22) 0px 19px 43px;
        transform: translate3d(0px, -1px, 0px);
    }
`;

const MealList = (props) => {
    const meals = useSelector(state => state.meals);

    return (
        <Meals>
            {Object.values(meals).map(meal => (
                <Meal
                    key={meal.id}
                    className="border p-3 my-2 rounded d-flex justify-content-between"
                >
                    <div>{meal.name}</div>
                    <div>
                        {meal.price} zł <PencilSquare color="royalblue" onClick={() => props.onEdit(meal)} />
                        {' '}
                        <Trash color="red" onClick={() => props.onDelete(meal)} />
                    </div>
                </Meal>
            ))}
        </Meals>
    );
};

export default MealList;
