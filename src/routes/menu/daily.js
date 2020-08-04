import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Calendar2Date } from 'react-bootstrap-icons';
import DatePicker from 'react-datepicker';
import { useDispatch, useSelector } from 'react-redux';
import MealForm from '../../components/mealForm';
import MealList from '../../components/mealList';
import Sidebar from '../../components/sidebar';
import { fetchCategories } from '../../modules/categories/actions';
import { deleteMeal, fetchMeals } from '../../modules/meals/actions';

function Menu() {
    const [editing, setEditing] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);
    const [date, setDate] = useState(new Date());
    const dispatch = useDispatch();
    const meals = useSelector(
        state => Object.values(state.meals).filter(m => m.date !== null)
    );

    useEffect(() => {
        date && dispatch(fetchMeals(date));
    }, [date, dispatch]);

    useEffect(() => {
        dispatch(fetchCategories());
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
                    <div className="d-flex justify-content-between">
                        <h2 style={{ margin: 0 }}>Menu na {format(date, 'iiii, d MMM')}</h2>
                        <div>
                            <DatePicker
                                customInput={<Button size="sm" variant="outline-secondary"><Calendar2Date size="28" /></Button>}
                                popperPlacement="bottom-end"
                                onChange={setDate}
                            />{' '}
                            <Button variant="outline-primary" onClick={() => setShowSidebar(true)}>Dodaj</Button>
                        </div>
                    </div>
                    <hr />
                    <MealList meals={meals} onEdit={meal => { edit(meal) }} onDelete={destroy} />
                </Col>
            </Row>
            <Sidebar open={showSidebar}>
                <div className="p-4 h-100 bg-white border-left">
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
                            <MealForm date={date} className="pt-2" onSuccess={close}></MealForm>
                        </div>
                    }
                </div>
            </Sidebar>
        </>
    );
}

export default Menu;
