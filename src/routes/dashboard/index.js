import React, { useEffect, useState } from 'react';
import { Button, Col, Row, Spinner } from 'react-bootstrap';
import { Link, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import { client } from '../../utils/api';
import { Lines, Paper } from '../orders/styles';

const RippedPaper = styled(Paper)`
    &:after {
        content: '';
        position: absolute;
        height: 2px;
        left: 0; 
        right: 0;
        bottom: -2px;
        background-color: #fffee0;
        clip-path: polygon(0% 0%, 5%  100%, 10% 0%, 15%  100%, 20% 0%, 25% 100%, 30% 0%, 35%  100%, 40% 0%, 45%  100%, 50% 0%, 55%  100%, 60% 0%, 65%  100%, 70% 0%, 75%  100%, 80% 0%, 85%  100%, 90% 0%, 95%  100%, 100% 0%);
    }
`;

const Dashboard = () => {
    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(false);
    const { url } = useRouteMatch();
    
    async function fetchSummary() {
        setLoading(true);
        const response = await client('meal/summary');
        setLoading(false);
        setMeals(response);
    }

    useEffect(() => {
        fetchSummary();
    }, []);

    return (
        <Row className="justify-content-center">
            <Col lg="7">
                <h4 className="display-4">Dzisiaj do przygotowania</h4>
                {loading && <Spinner animation="border" variant="primary" className="mb-3" />}
                {!loading && meals.length === 0 && <div className="ml-1">Brak dań na dzisiaj</div>}
                {meals.length > 0 &&
                    <>
                        <RippedPaper className="shadow border">
                            <Lines>
                                {meals.map((meal, i) => (
                                    <div key={i} className="d-flex justify-content-between">
                                        <div>{meal.name}</div>
                                        <div style={{ whiteSpace: "nowrap" }}>{meal.qty}</div>
                                    </div>
                                ))}
                            </Lines>
                        </RippedPaper>
                        <div className="mt-4 text-right">
                            <Link to={`${url}/orders`}>
                                <Button variant="outline-dark">Przejdź do zamówień</Button>
                            </Link>
                        </div>
                    </>}
            </Col>
        </Row>
    );
};

export default Dashboard;
