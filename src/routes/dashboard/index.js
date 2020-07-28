import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { client } from '../../utils/api';

const Dashboard = () => {
    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function data() {
            setLoading(true);
            const response = await client('meal/summary');
            setLoading(false);
            setMeals(response);
        }

        data();
    }, []);

    return (
        <div>
            <h4 className="display-4">Dzisiaj do przygotowania</h4>
            {loading && <Spinner animation="border" variant="primary" className="mb-3" />}
            {!loading && meals.length === 0 && <div className="ml-1">Brak dań na dzisiaj</div>}
            {meals &&
                <div className="border rounded px-3 py-1 shadow">
                    {meals.map(({ name, qty }, i) => (
                        <div className="d-flex my-2">
                            <div>{name}</div>
                            <div className="flex-grow-1 mx-2"><hr style={{ marginTop: '12px' }} /></div>
                            <div>{qty}</div>
                        </div>
                    ))}
                </div>}
        </div>
    );
};

export default Dashboard;
