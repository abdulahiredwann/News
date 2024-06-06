import React, { useState, useEffect } from 'react';
import { Container, Form, Button, ListGroup, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Admin = () => {
    const [news, setNews] = useState([]);
    const [newNews, setNewNews] = useState({ title: '', description: '', image_url: '' });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNews = async () => {
            const response = await api.get('/news');
            setNews(response.data);
        };

        fetchNews();
    }, []);

    const handleCreate = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Not authorized');
            return;
        }

        try {
            await api.post('/news', newNews, {
                headers: { Authorization: token }
            });
            setNewNews({ title: '', description: '', image_url: '' });
            window.location.reload();
        } catch (error) {
            alert('Failed to create news: ' + error.response.data.message);
        }
    };

    const handleDelete = async (id) => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Not authorized');
            return;
        }

        try {
            await api.delete(`/news/${id}`, {
                headers: { Authorization: token }
            });
            setNews(news.filter(n => n.id !== id));
        } catch (error) {
            alert('Failed to delete news: ' + error.response.data.message);
        }
    };

    // Handle logout
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login'); // Navigate to login page after logout
    };

    return (
        <Container className="mt-5">
            <h2 className="text-center">Admin Panel</h2>
            <Button variant="secondary" onClick={handleLogout} className="mb-3">
                Logout
            </Button>
            <Form onSubmit={handleCreate} className="mt-3">
                <Form.Group controlId="formTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter title"
                        value={newNews.title}
                        onChange={(e) => setNewNews({ ...newNews, title: e.target.value })}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter description"
                        value={newNews.description}
                        onChange={(e) => setNewNews({ ...newNews, description: e.target.value })}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formImageUrl">
                    <Form.Label>Image URL</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter image URL"
                        value={newNews.image_url}
                        onChange={(e) => setNewNews({ ...newNews, image_url: e.target.value })}
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100 mt-3">
                    Create News
                </Button>
            </Form>
            <ListGroup className="mt-5">
                {news.map(n => (
                    <ListGroup.Item key={n.id}>
                        <Card>
                            <Card.Body>
                                <Card.Title>{n.title}</Card.Title>
                                <Card.Text>{n.description}</Card.Text>
                                {n.image_url && <Card.Img src={n.image_url} alt={n.title} />}
                                <Button variant="danger" onClick={() => handleDelete(n.id)} className="mt-3">
                                    Delete
                                </Button>
                            </Card.Body>
                        </Card>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Container>
    );
};

export default Admin;
