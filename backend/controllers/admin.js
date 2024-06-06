const db = require('../models/db');
const jwt = require('jsonwebtoken');

const login = (req, res) => {
    const { username, password } = req.body;
    db.pool.query('SELECT * FROM admins WHERE username = ? AND password = ?', [username, password], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const admin = results[0];
        const token = jwt.sign({ id: admin.id }, 'your_jwt_secret', { expiresIn: '1h' });
        res.json({ token });
    });
};

const checkAuth = (req, res) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, 'your_jwt_secret', (err, decoded) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to authenticate token' });
        }
        res.json({ id: decoded.id });
    });
};

module.exports = { login, checkAuth };
