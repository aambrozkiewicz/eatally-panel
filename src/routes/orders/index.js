import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Calendar2Date } from 'react-bootstrap-icons';
import DatePicker from 'react-datepicker';
import { Item, List } from '../../components/hoverList/styles';
import { apiFetch } from '../../utils/api';

const Orders = props => {
    const [orders, setOrders] = useState([]);
    const total = orders.reduce((acc, curr) => acc + curr.total, 0);

    useEffect(() => {
        async function data() {
            const response = await apiFetch('orders', {
                method: 'get'
            });
            const jsonResponse = await response.json();

            setOrders(jsonResponse);
        }

        data();
    }, []);

    return (
        <>
            <div className="d-flex justify-content-between align-items-center">
                <div>
                    <h1>Zamówienia</h1>
                    Na sumę <strong>{total}</strong> zł
                </div>
                <div>
                    <DatePicker
                        customInput={<Button size="sm" variant="outline-secondary"><Calendar2Date size="20" /></Button>}
                        popperPlacement="bottom-end"
                        disabled
                    />
                </div>
            </div>
            <List>
                {orders.map(order => (
                    <Item key={order.id} className="border p-3 my-2 rounded d-flex justify-content-between flex-wrap">
                        <div style={{whiteSpace: "nowrap"}}>
                            <List>
                                <li>{order.name}</li>
                                <li>{order.address}</li>
                                <li>{order.phone}</li>
                                <li>{order.comment}</li>
                            </List>
                        </div>
                        <div style={{minWidth: '65%'}}>
                            <List>
                                {order.meals.map(meal => (
                                    <li>{meal.qty} x {meal.name}</li>
                                ))}
                            </List>
                        </div>
                        <div>
                            {order.total} zł
                        </div>
                    </Item>
                ))}
            </List>
        </>
    );
};

export default Orders;
