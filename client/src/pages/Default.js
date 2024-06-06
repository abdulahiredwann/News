import React, { useState, useEffect } from 'react';
import { Container, Card, ListGroup } from 'react-bootstrap';
import api from '../services/api';

const Default = () => {
    const [news, setNews] = useState([]);

    useEffect(() => {
        const fetchNews = async () => {
            const response = await api.get('/news');
            setNews(response.data);
        };

        fetchNews();
    }, []);

    return (
        <Container className="mt-5">
            <h2 className="text-center">News</h2>
            <ListGroup className="mt-3">
                {news.map(n => (
                    <ListGroup.Item key={n.id}>
                        <Card>
                            <Card.Body>
                                <Card.Title>{n.title}</Card.Title>
                                <Card.Text>{n.description}</Card.Text>
                                {n.image_url && <Card.Img src={n.image_url} alt={n.title} />}
                            </Card.Body>
                        </Card>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Container>
    );
};

export default Default;
