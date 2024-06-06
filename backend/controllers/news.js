const db = require('../models/db');

const getAllNews = (req, res) => {
    db.pool.query('SELECT * FROM news', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
};

const createNews = (req, res) => {
    const { title, description, image_url } = req.body;
    db.pool.query('INSERT INTO news (title, description, image_url) VALUES (?, ?, ?)', 
        [title, description, image_url], 
        (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ id: results.insertId });
        });
};

const updateNews = (req, res) => {
    const { title, description, image_url } = req.body;
    const { id } = req.params;
    db.pool.query('UPDATE news SET title = ?, description = ?, image_url = ? WHERE id = ?', 
        [title, description, image_url, id], 
        (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ message: 'News updated successfully' });
        });
};

const deleteNews = (req, res) => {
    const { id } = req.params;
    db.pool.query('DELETE FROM news WHERE id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'News deleted successfully' });
    });
};

module.exports = { getAllNews, createNews, updateNews, deleteNews };
