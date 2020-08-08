import { formatISO } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Clock, Link45deg } from 'react-bootstrap-icons';
import DatePicker from 'react-datepicker';
import PaymentStatus from '../../components/paymentStatus';
import { client } from '../../utils/api';
import formatDate from '../../utils/date';
import { HooverBox, Lines, Paper } from './styles';

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
        <Row className="justify-content-center">
            <Col lg="7">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <div>
                        <h2 style={{ margin: 0 }}>Zamówienia</h2>
                    </div>
                    <div className="text-right">
                        <DatePicker
                            customInput={<Button size="sm" variant="outline-secondary">{formatDate(date, 'iiii, d MMM')}</Button>}
                            popperPlacement="bottom-end"
                            onChange={setDate}
                        />
                    </div>
                </div>
                <p>Na sumę <strong>{total}</strong> zł</p>

                {!orders.length && 'Brak zamówień'}

                {orders.map(order => (
                    <HooverBox className="my-3 border rounded p-2" key={order.id}>
                        <div className="d-flex justify-content-between border-bottom py-2">
                            <div>{order.name} <span className="d-block d-lg-inline">tel. {order.phone}</span></div>
                            <div className="text-right">
                                <PaymentStatus type={order.payment_type} payments={order.payments} />
                                <span style={{ display: 'inline-block' }}>
                                    <Clock className="mx-1" />
                                    {formatDate(new Date(order.created_at.replace(/-/g, "/")), 'H:m')}
                                </span>
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
                                {order.promo_code &&
                                    <div className="d-flex justify-content-between">
                                        <div>Kod rabatowy "{order.promo_code.code}"</div>
                                        <div>{order.promo_code.value} {order.promo_code.type === 'percent' ? '%' : 'zł'} </div>
                                    </div>}
                                <div className="d-flex justify-content-between font-weight-bold">
                                    <div>Razem</div>
                                    <div>{order.total} zł</div>
                                </div>
                            </Lines>
                        </Paper>

                        <div className="py-2 border-top d-flex justify-content-between align-items-center">
                            {!order.pickup_location_id && <>
                                <div>
                                    {order.address}
                                </div>
                                <Button
                                    size="sm"
                                    variant="outline-primary"
                                    href={`https://www.google.com/maps/search/?api=1&query=${order.address}`} target="_blank">
                                    <Link45deg /> Mapa
                                </Button></>}
                            {order.pickup_location_id && <div className="bg-warning px-2">
                                Odbiór {order.pickup_location_name} o {order.pick_up_at}
                            </div>}
                        </div>
                        {order.comment && <div className="py-2 border-top">
                            {order.comment}
                        </div>}
                    </HooverBox>
                ))}
            </Col>
        </Row>
    );
};

export default Orders;
