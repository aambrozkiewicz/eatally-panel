import React, { useEffect, useState } from 'react';
import { client } from '../../utils/api';

const Dashboard = () => {
    const [meals, setMeals] = useState([]);

    useEffect(() => {
        async function data() {
            const response = await client('meal/summary');
            setMeals(response);
        }
        
        data();
    }, []);

    return (
        <div>
            <h1 className="display-4">Nowe eatally!</h1>
            <h4 className="display-4">Dzisiaj do przygotowania</h4>
            <div className="border rounded px-3 py-1 shadow">
                {!meals.length && <div className="text-center text-muted">Brak dań na dzisiaj</div>}
                {meals.map(({ name, qty }, i) => (
                    <div className="d-flex my-2">
                        <div>{name}</div>
                        <div className="flex-grow-1 mx-2"><hr style={{marginTop: '12px'}} /></div>
                        <div className="font-weight-bold">{qty}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
