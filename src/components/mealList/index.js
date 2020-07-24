import React, { useState } from 'react';
import { Fade } from 'react-bootstrap';
import { PencilSquare, Trash } from 'react-bootstrap-icons';
import { useSelector } from 'react-redux';
import { Meal, Meals } from './styles';

const MealItem = ({ meal, categories, ...props }) => {
    const [active, setActive] = useState();

    return (
        <Meal
            key={meal.id}
            className="border p-3 my-2 rounded d-flex justify-content-between"
            onMouseEnter={() => setActive(true)}
            onMouseLeave={() => setActive(false)}>
            <div>
                {meal.name}
                {meal.category_id && categories[meal.category_id] && <div className="text-muted">{categories[meal.category_id].name}</div>}
            </div>
            <div className="pl-2 text-right" style={{ whiteSpace: "nowrap" }}>
                {meal.price} zł
                <Fade in={active}>
                    <div>
                        <PencilSquare color="royalblue" onClick={() => props.onEdit(meal)} />
                        <Trash color="red" onClick={() => props.onDelete(meal)} />
                    </div>
                </Fade>
            </div>
        </Meal>
    );
};

const MealList = (props) => {
    const { meals } = props;
    const categories = useSelector(state => state.categories);

    return (
        <Meals>
            {meals.map(meal => (
                <MealItem meal={meal} categories={categories} {...props} />
            ))}
            {!meals.length && <div>Nic tu jeszcze nie ma ;(</div>}
        </Meals>
    );
};

export default MealList;
