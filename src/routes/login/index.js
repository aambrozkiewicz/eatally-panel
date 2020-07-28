import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { DoorOpen } from 'react-bootstrap-icons';
import { useHistory, useLocation } from 'react-router-dom';
import { apiUrl } from '../../utils/api';
import { setToken } from '../../utils/auth';

const Login = () => {
    const history = useHistory();
    const location = useLocation();
    const [error, setError] = useState();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                `${apiUrl}/auth/login`,
                {
                    method: 'post',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                },
            );

            if (response.status === 401) {
                setError('Błędny login lub hasło');
            } else {
                const jsonResponse = await response.json();
                setToken(jsonResponse.access_token);

                let { from } = location.state || { from: { pathname: "/" } };
                history.replace(from);
            }
        } catch (e) { }
    }

    function demo() {
        setEmail(process.env['REACT_APP_DEMO_EMAIL']);
        setPassword(process.env['REACT_APP_DEMO_PASSWORD']);
    }

    return (
        <div className="d-flex align-items-center" style={{ height: '100vh', backgroundColor: '#f8f9fa' }}>
            <Container>
                <Row className="justify-content-center">
                    <Col md="7">
                        <h1>eatally</h1>
                        <p className="lead">Zaloguj się aby kontynuować</p>
                        <Form onSubmit={login} noValidate>
                            <Form.Group>
                                <Form.Control type="email" placeholder="Twój adres e-mail" isInvalid={error} value={email} onChange={e => setEmail(e.currentTarget.value)} />
                                <Form.Control.Feedback type="invalid">
                                    {error}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group>
                                <Form.Control type="password" placeholder="Twój sekret" value={password} onChange={e => setPassword(e.currentTarget.value)} />
                            </Form.Group>
                            <Button variant="outline-dark" onClick={demo}>
                                <DoorOpen size="20" /> Demo
                            </Button>
                            <Button variant="primary" type="submit" className="float-right">
                                Logowanie
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Login;
