import React, { useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import MealForm from '../../components/mealForm';
import MealList from '../../components/mealList';
import { fetchCategories } from '../../modules/categories/actions';
import { deleteMeal, fetchMeals } from '../../modules/meals/actions';

function Menu() {
  const [editing, setEditing] = useState(false);
  const dispatch = useDispatch();
  const meals = useSelector(
    state => Object.values(state.meals).filter(m => m.date === null)
  );

  useEffect(() => {
    dispatch(fetchMeals());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  function destroy(meal) {
    dispatch(deleteMeal(meal));
  }

  return (
    <Row>
      <Col md="7">
        <div className="d-flex justify-content-between">
          <h3>Stałe menu</h3>
        </div>
        <MealList meals={meals} onEdit={meal => { setEditing(meal) }} onDelete={destroy} />
      </Col>
      <Col md="5" xs="12">
        <div>
          {editing ?
            <>
              <div className="d-flex justify-content-between align-items-center">
                <h3>Edycja</h3>
                <Button
                  size="sm"
                  variant="outline-danger"
                  onClick={() => setEditing(false)}>✕</Button>
              </div>

              <MealForm className="pt-2" meal={editing} onSuccess={() => { setEditing(false) }}></MealForm>
            </>
            :
            <div>
              <h3>Nowa pozycja</h3>
              <MealForm className="pt-2"></MealForm>
            </div>
          }
        </div>
      </Col>
    </Row>
  );
}

export default Menu;
