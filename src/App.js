import React, { useState } from 'react';
import MealForm from './components/mealForm';
import MealList from './components/mealList';
import { Col, Button } from 'react-bootstrap';
import { Calendar2Date } from 'react-bootstrap-icons';
import { useDispatch } from 'react-redux';
import { deleteMeal } from './actions';
import DatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";

function App() {
  const [editing, setEditing] = useState(false);
  const dispatch = useDispatch();

  function destroy(meal) {
    dispatch(deleteMeal(meal));
  }

  return (
    <div className="d-flex flex-wrap" style={{ height: '100vh' }}>
      <Col md="7" className="p-2">
        <div style={{ width: '575px', margin: '0 0 0 auto' }} className="px-3">
          <div className="d-flex justify-content-between align-items-center">
            <h3>Menu na</h3>
            <div>
              <DatePicker
                customInput={<Button size="sm" variant="outline-secondary"><Calendar2Date size="20" /></Button>}
              />
            </div>
          </div>
          <h1>Czwartek, 21 lipca</h1>
          <MealList onEdit={meal => { setEditing(meal) }} onDelete={destroy} />
        </div>
      </Col>
      <Col md="5" xs="12" className="p-2 shadow" style={{ backgroundColor: '#fafafa' }}>
        <div style={{ width: '375px' }} className="px-3">
          {editing ?
            <>
              <div className="d-flex justify-content-between align-items-center">
                <h3>Edycja</h3>
                <Button
                  size="sm"
                  variant="outline-danger"
                  onClick={() => setEditing(false)}
                >
                  ✕
              </Button>
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
    </div>
  );
}

export default App;
