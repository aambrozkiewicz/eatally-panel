import React, { useState } from 'react';
import MealForm from '../../components/mealForm';
import MealList from '../../components/mealList';
import { Col, Button, Row } from 'react-bootstrap';
import { Calendar2Date } from 'react-bootstrap-icons';
import { useDispatch } from 'react-redux';
import { deleteMeal } from '../../actions';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';

function App() {
  const [editing, setEditing] = useState(false);
  const [date, setDate] = useState(new Date());
  const dispatch = useDispatch();

  function destroy(meal) {
    dispatch(deleteMeal(meal));
  }

  return (
    <Row>
      <Col md="7">
        <div className="d-flex justify-content-between align-items-center">
          <h3>Menu na</h3>
          <div>
            <DatePicker
              customInput={<Button size="sm" variant="outline-secondary"><Calendar2Date size="20" /></Button>}
              onChange={setDate}
            />
          </div>
        </div>
        <h1>{format(date, 'iiii, d MMM')}</h1>
        <MealList onEdit={meal => { setEditing(meal) }} onDelete={destroy} />
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
    </Row>
  );
}

export default App;
