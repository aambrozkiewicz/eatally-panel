import { format, formatISO } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import styled from 'styled-components';
import { client } from '../../utils/api';

const ListNone = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
`;

const HooverBox = styled.div`
    transition: all .3s ease-in-out;

    &:hover {
        box-shadow: rgba(0, 0, 0, 0.22) 0px 19px 43px;
        transform: translate3d(0px, -1px, 0px);
    }
`;

const Details = styled.div`
    width: 100%;
    border-bottom: 1px solid #ccc;
    @media (min-width: 768px) {
        width: 200px;
        border-bottom: 0;
        border-right: 1px solid #ccc;
    }
`;

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [date, setDate] = useState(new Date());
    const total = orders.reduce((acc, curr) => acc + curr.total, 0);

    useEffect(() => {
        async function data() {
            const today = formatISO(date, { representation: 'date' });
            const orders = await client(`orders?today=${today}`);

            setOrders(orders);
        }

        data();
    }, [date]);

    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                    <h1 style={{ margin: 0 }}>Zamówienia</h1>
                </div>
                <div className="text-right">
                    <DatePicker
                        customInput={<Button size="sm" variant="outline-secondary">{format(date, 'iiii, d MMM')}</Button>}
                        popperPlacement="bottom-end"
                        onChange={setDate}
                    />
                </div>
            </div>
            <p>Na sumę <strong>{total}</strong> zł</p>
            
            {!orders.length && 'Brak zamówień'}
            
            {orders.map(order => (
                <HooverBox key={order.id} className="border rounded d-flex flex-wrap flex-lg-nowrap mb-2">
                    <Details style={{ whiteSpace: "nowrap", backgroundColor: '#fafafa' }}
                        className="p-2">
                        <ListNone>
                            <li>{order.name}</li>
                            <li>{order.address}</li>
                            <li>{order.phone}</li>
                            <li>{order.comment}</li>
                        </ListNone>
                    </Details>
                    <div className="flex-grow-1 p-2">
                        <ListNone>
                            {order.meals.map((meal, i) => (
                                <li key={i}>
                                    <div className="d-flex justify-content-between">
                                        <div>
                                            {meal.qty} x {meal.name}
                                        </div>
                                        <div style={{ whiteSpace: 'nowrap' }}>{meal.price} zł</div>
                                    </div>
                                </li>
                            ))}
                            <li>
                                <div className="d-flex justify-content-between font-weight-bold">
                                    <div>Razem</div>
                                    <div>{order.total} zł</div>
                                </div>
                            </li>
                        </ListNone>
                    </div>
                </HooverBox>
            ))}
        </>
    );
};

export default Orders;
