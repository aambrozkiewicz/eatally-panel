import React, { useState } from 'react';
import MealForm from './components/mealForm';
import MealList from './components/mealList';
import { Col, Button } from 'react-bootstrap';

function App() {
  const [editing, setEditing] = useState(false);

  return (
    <div className="d-flex flex-wrap" style={{ height: '100vh' }}>
      <Col md="6" className="p-2">
        <div style={{ width: '375px', margin: '0 0 0 auto' }} className="px-3">
          <h1>Czwartek, 21 lipca</h1>
          <MealList onEdit={meal => { setEditing(meal) }} />
        </div>
      </Col>
      <Col md="6" xs="12" className="p-2 shadow" style={{ backgroundColor: '#fafafa' }}>
        <div style={{ width: '375px' }} className="px-3">
          {editing && <Button
            size="sm"
            variant="outline-danger"
            onClick={() => setEditing(false)}
          >
            ✕
            </Button>}

          {editing ? <div>
            <h3>Edycja</h3>
            <MealForm className="pt-2" meal={editing} onSuccess={() => { setEditing(false) }}></MealForm>
          </div> :
            <div>
              <h3>Nowa pozycja</h3>
              <MealForm className="pt-2"></MealForm>
            </div>}
        </div>
      </Col>
    </div>
  );
}

export default App;
