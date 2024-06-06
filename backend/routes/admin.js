const express = require('express');
const { login, checkAuth } = require('../controllers/admin');

const router = express.Router();

router.post('/login', login);
router.get('/checkAuth', checkAuth);

module.exports = router;
