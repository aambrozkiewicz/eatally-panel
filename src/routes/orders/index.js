import { format, formatISO } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { Badge, Button } from 'react-bootstrap';
import { Link45deg } from 'react-bootstrap-icons';
import DatePicker from 'react-datepicker';
import { client } from '../../utils/api';
import { HooverBox, Lines, Paper } from './styles';

const Payment = ({ type, payments }) => {
    if (type === 'cash') {
        return 'Gotówka';
    } else if (type === 'wire_transfer') {
        const lastPayment = payments[payments.length - 1];
        const status = lastPayment.status;
        const statuses = {
            'new': 'Rozpoczęta',
            'error': 'Błędna',
            'finished': 'Zakończona',
        };

        return <span>Przelew <Badge variant={status === "finished" ? "success" : "secondary"}>{statuses[status]}</Badge></span>;
    } else if (type === 'card_on_site') {
        return 'Karta';
    }
};

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
                <HooverBox className="my-3 border rounded" key={order.id}>
                    <div className="d-flex justify-content-between p-2 border-bottom">
                        <div>{order.name} tel. {order.phone}</div>
                        <div>
                            <Payment type={order.payment_type} payments={order.payments} />
                        </div>
                    </div>

                    <Paper>
                        <Lines>
                            {order.meals.map((meal, i) => (
                                <div key={i} className="d-flex justify-content-between">
                                    <div>{meal.qty} x {meal.name}</div>
                                    <div style={{ whiteSpace: "nowrap" }}>{meal.price} zł</div>
                                </div>
                            ))}
                            <div className="d-flex justify-content-between font-weight-bold">
                                <div>Razem</div>
                                <div>{order.total} zł</div>
                            </div>
                        </Lines>
                    </Paper>
                    
                    <div className="p-2 border-top d-flex justify-content-between align-items-center">
                        <div>
                            {order.address}
                        </div>
                        <Button
                            size="sm"
                            variant="outline-primary"
                            href={`https://www.google.com/maps/search/?api=1&query=${order.address}`} target="_blank">
                            <Link45deg /> Google Maps
                        </Button>
                    </div>
                    {order.comment && <div className="p-2 border-top">
                        {order.comment}
                    </div>}
                </HooverBox>
            ))}
        </>
    );
};

export default Orders;
