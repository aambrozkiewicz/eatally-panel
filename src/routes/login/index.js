import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { setToken } from '../../utils/auth';
import { useHistory, useLocation } from 'react-router-dom';
import { apiUrl } from '../../utils/api';
import { DoorOpen } from 'react-bootstrap-icons';

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
        } catch (e) {}
    }

    function demo() {
        setEmail(process.env['REACT_APP_DEMO_EMAIL']);
        setPassword(process.env['REACT_APP_DEMO_PASSWORD']);
    }

    return (
        <div className="d-flex justify-content-center align-items-center flex-column" style={{ height: '100vh', backgroundColor: '#fafafa' }}>
            <h1 style={{ textShadow: "0px 1px 7px rgba(255, 255, 255, 1)" }} className="text-muted">eatally</h1>
            <div className="shadow p-3 border rounded" style={{ width: '350px', backgroundColor: '#fff' }}>
                <Form onSubmit={login} noValidate>
                    <Form.Group>
                        <Form.Label>E-mail</Form.Label>
                        <Form.Control type="email" placeholder="Twój adres e-mail" isInvalid={error} value={email} onChange={e => setEmail(e.currentTarget.value)} />
                        <Form.Control.Feedback type="invalid">
                            {error}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Hasło</Form.Label>
                        <Form.Control type="password" placeholder="Twój sekret" value={password} onChange={e => setPassword(e.currentTarget.value)} />
                    </Form.Group>
                    <Button variant="outline-dark" onClick={demo}>
                        <DoorOpen size="20" /> Demo
                    </Button>
                    <Button variant="primary" type="submit" className="float-right">
                        Logowanie
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export default Login;
