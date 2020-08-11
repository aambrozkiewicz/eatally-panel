import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSkiing} from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useHistory, useLocation } from 'react-router-dom';
import { apiUrl } from '../../utils/api';
import { setToken } from '../../utils/auth';

const Login = () => {
    const history = useHistory();
    const location = useLocation();
    const { register, handleSubmit, setValue, errors, setError } = useForm();

    const login = async ({ email, password }) => {
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
                setError('email', {
                    type: 'manual',
                    message: 'Błędny login lub hasło',
                });
            } else {
                const jsonResponse = await response.json();
                setToken(jsonResponse.access_token);

                let { from } = location.state || { from: { pathname: "/" } };
                history.replace(from);
            }
        } catch (e) { }
    }

    function demo() {
        setValue('email', process.env['REACT_APP_DEMO_EMAIL']);
        setValue('password', process.env['REACT_APP_DEMO_PASSWORD']);
        handleSubmit(login)();
    }

    return (
        <div className="d-flex align-items-center" style={{ height: '100vh', backgroundColor: '#f8f9fa' }}>
            <Container>
                <Row className="justify-content-center">
                    <Col md="7">
                        <h1>eatally</h1>
                        <p className="lead">Zaloguj się aby kontynuować</p>
                        <Form onSubmit={handleSubmit(login)} noValidate>
                            <Form.Group>
                                <Form.Control
                                    type="email"
                                    placeholder="Twój adres e-mail"
                                    ref={register({
                                        required: "To pole jest wymagane",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "Niepoprawny adres e-mail"
                                        }
                                    })}
                                    name="email"
                                    isInvalid={errors.email} />
                                <Form.Control.Feedback type="invalid">
                                    {errors.email && errors.email.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group>
                                <Form.Control
                                    type="password"
                                    placeholder="Twój sekret"
                                    name="password"
                                    ref={register({ required: "Bez hasła nie da rady" })}
                                    isInvalid={errors.password} />
                                <Form.Control.Feedback type="invalid">
                                    {errors.password && errors.password.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Button variant="outline-dark" onClick={demo}>
                                <FontAwesomeIcon icon={faSkiing} /> Demo
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
