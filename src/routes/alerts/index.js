import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Col, Form, ListGroup, Modal, Row } from 'react-bootstrap';
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
        await client(`alert/${mealId}`, {method: 'DELETE'});
        fetchAlerts();
    }

    function inputChange(key, value) {
        setAlert({ ...alert, [key]: value });
    }

    function close() {
        setAlert({});
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
                            <ListGroup.Item key={alert.id} className="d-flex justify-content-between align-items-center">
                                <div>
                                    {alert.body}
                                </div>
                                <ButtonGroup>
                                    <Button size="sm" variant="outline-dark" onClick={() => edit(alert)}>
                                        Edycja
                                    </Button>
                                    <Button size="sm" variant="danger" onClick={() => destroy(alert.id)}>Usuń</Button>
                                </ButtonGroup>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
            </Row>
            <Modal show={show} onHide={close}>
                <Modal.Body>
                    <Form onSubmit={submit}>
                        <Form.Group>
                            <Form.Label>Treść komunikatu</Form.Label>
                            <Form.Control as="textarea" rows="3" onChange={(e) => inputChange('body', e.currentTarget.value)} value={alert.body} />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="float-right">
                            Zapisz
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default Alerts;
