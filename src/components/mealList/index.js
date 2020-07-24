import React from 'react';
import { PencilSquare, Trash } from 'react-bootstrap-icons';
import { useSelector } from 'react-redux';
import { Meal, Meals } from './styles';

const MealList = (props) => {
    const { meals } = props;
    const categories = useSelector(state => state.categories);

    return (
        <Meals>
            {meals.map(meal => (
                <Meal
                    key={meal.id}
                    className="border p-3 my-2 rounded d-flex justify-content-between"
                >
                    <div>
                        {meal.name}
                        {meal.category_id && categories[meal.category_id] && <div className="text-muted">{categories[meal.category_id].name}</div>}
                    </div>
                    <div className="pl-2 text-right" style={{ whiteSpace: "nowrap" }}>
                        {meal.price} zł
                        <br />
                        <PencilSquare color="royalblue" onClick={() => props.onEdit(meal)} />
                        {' '}
                        <Trash color="red" onClick={() => props.onDelete(meal)} />
                    </div>
                </Meal>
            ))}
            {!meals.length && <div>Nic tu jeszcze nie ma ;(</div>}
        </Meals>
    );
};

export default MealList;
