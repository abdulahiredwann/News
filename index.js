const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const newsRoutes = require('./backend/routes/news');
const adminRoutes = require('./backend/routes/admin');

const app = express();

app.use(cors()); // Allow CORS for all origins
app.use(bodyParser.json());

app.use('/api/news', newsRoutes);
app.use('/api/admin', adminRoutes);

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
