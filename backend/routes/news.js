const express = require('express');
const { getAllNews, createNews, updateNews, deleteNews } = require('../controllers/news');
const router = express.Router();

router.get('/', getAllNews);
router.post('/', createNews);
router.put('/:id', updateNews);
router.delete('/:id', deleteNews);

module.exports = router;
