import React, { useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import MealForm from '../../components/mealForm';
import MealList from '../../components/mealList';
import { fetchCategories } from '../../modules/categories/actions';
import { deleteMeal, fetchMeals } from '../../modules/meals/actions';
import Sidebar from '../../components/sidebar';

function Menu() {
  const [editing, setEditing] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const dispatch = useDispatch();
  const meals = useSelector(
    state => Object.values(state.meals).filter(m => m.date === null)
  );

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchMeals());
  }, [dispatch]);

  function destroy(meal) {
    dispatch(deleteMeal(meal));
  }

  function edit(meal) {
    setEditing(meal);
    setShowSidebar(true);
  }

  function close() {
    setEditing(false);
    setShowSidebar(false);
  }

  return (
    <>
      <Row className="justify-content-center">
        <Col md="7">
          <div className="d-flex justify-content-between align-items-center">
            <h2 style={{ margin: 0 }}>Stałe menu</h2>
            <Button variant="outline-primary" onClick={() => setShowSidebar(true)}>Dodaj</Button>
          </div>
          <hr />
          <MealList meals={meals} onEdit={meal => { edit(meal) }} onDelete={destroy} />
        </Col>
      </Row>
      <Sidebar open={showSidebar} className="p-3 h-100 bg-white border-left">
        <Button
          style={{ position: 'absolute', right: '1.5rem' }} size="sm"
          onClick={close}
        >Zamknij</Button>
        {editing ?
          <>
            <h3>Edycja</h3>
            <MealForm className="pt-2" meal={editing} onSuccess={close}></MealForm>
          </>
          :
          <div>
            <h3>Nowa pozycja</h3>
            <MealForm className="pt-2" onSuccess={close}></MealForm>
          </div>
        }
      </Sidebar>
    </>
  );
}

export default Menu;
