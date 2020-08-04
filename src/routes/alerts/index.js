import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Col, Form, ListGroup, Row } from 'react-bootstrap';
import ConfirmButton from '../../components/confirmButton';
import Sidebar from '../../components/sidebar';
import { client } from '../../utils/api';

function Alerts() {
    const [alerts, setAlerts] = useState([]);
    const [show, setShow] = useState(false);
    const [alert, setAlert] = useState({ id: '', body: '' });

    useEffect(() => {
        fetchAlerts();
    }, []);

    async function fetchAlerts() {
        const response = await client('alert');
        setAlerts(response);
    }

    async function submit(e) {
        e.preventDefault();

        await client('alert', { method: "POST", body: alert });
        close();
        fetchAlerts();
    }

    async function destroy(mealId) {
        await client(`alert/${mealId}`, { method: 'DELETE' });
        fetchAlerts();
    }

    function inputChange(key, value) {
        setAlert({ ...alert, [key]: value });
    }

    function close() {
        setAlert({ id: '', body: '' });
        setShow(false);
    }

    function edit(meal) {
        setAlert(meal);
        setShow(true);
    }

    return (
        <>
            <Row className="justify-content-center">
                <Col lg="7">
                    <div className="d-flex justify-content-between align-items-center">
                        <h2 style={{ margin: 0 }}>Komunikaty</h2>
                        <Button onClick={() => setShow(true)} variant="outline-primary">Nowy</Button>
                    </div>
                    <hr />
                    <ListGroup>
                        {alerts.map(alert => (
                            <ListGroup.Item key={alert.id} className="d-flex justify-content-between align-items-lg-center flex-column flex-lg-row">
                                <div className="mb-2 mb-lg-0">
                                    {alert.body}
                                </div>
                                <ButtonGroup>
                                    <Button size="sm" variant="outline-dark" onClick={() => edit(alert)}>
                                        Edycja
                                    </Button>
                                    <ConfirmButton
                                        onClick={() => destroy(alert.id)}
                                        size="sm"
                                        variant="danger">Usuń</ConfirmButton>
                                </ButtonGroup>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
            </Row>
            <Sidebar open={show}>
                <div className="p-4 h-100 bg-white border-left">
                    <Form onSubmit={submit}>
                        <Form.Group>
                            <Form.Label>Treść komunikatu</Form.Label>
                            <Form.Control tabIndex="1" as="textarea" rows="6" onChange={(e) => inputChange('body', e.currentTarget.value)} value={alert.body} />
                        </Form.Group>
                        <Button variant="outline-primary" onClick={close}>Zamknij</Button>
                        <Button tabIndex="2" variant="primary" type="submit" className="float-right">
                            Zapisz
                        </Button>
                    </Form>
                </div>
            </Sidebar>
        </>
    );
}

export default Alerts;
