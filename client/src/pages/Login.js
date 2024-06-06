import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/admin/login', { username, password });
            localStorage.setItem('token', response.data.token);
            navigate('/admin');
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setError('Login failed: ' + error.response.data.message);
            } else {
                setError('Login failed: Something went wrong.');
            }
        }
    };

    return (
        <Container className="mt-5">
            <h2 className="text-center">Admin Login</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleLogin} className="mt-3">
                <Form.Group controlId="formUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100 mt-3">
                    Login
                </Button>
            </Form>
        </Container>
    );
};

export default Login;
