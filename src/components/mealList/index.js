import React, { useState } from 'react';
import { Button, Fade } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Meal, Meals } from './styles';

const MealItem = ({ meal, categories, ...props }) => {
    const [active, setActive] = useState();

    return (
        <Meal
            className="border p-3 my-2 rounded d-flex justify-content-between"
            onMouseEnter={() => setActive(true)}
            onMouseLeave={() => setActive(false)}>
            <div>
                {meal.name}
                {meal.category_id && categories[meal.category_id] && <div className="text-muted">{categories[meal.category_id].name}</div>}
                {!meal.category_id && <div className="text-muted">Bez kategorii</div>}
            </div>
            <div className="pl-2 text-right" style={{ whiteSpace: "nowrap" }}>
                {meal.price} zł
                <Fade in={active}>
                    <div>
                        <Button size="sm" onClick={() => props.onEdit(meal)}>Edycja</Button>{' '}
                        <Button size="sm" variant="outline-danger" onClick={() => props.onDelete(meal)}>Usuń</Button>
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
                <MealItem key={meal.id} meal={meal} categories={categories} {...props} />
            ))}
            {!meals.length && <div>Nic tu jeszcze nie ma ;(</div>}
        </Meals>
    );
};

export default MealList;
