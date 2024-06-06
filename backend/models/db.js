const mysql = require('mysql');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '47219930',
    database: 'worabe_news'
});

pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.');
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.');
        }
    }
    if (connection) {
        connection.release();
        console.log('Database connected.');
    }
    return;
});

module.exports = {
    pool
};


// mongodb+srv://abdulahiredwann:47219930@cluster0.jtw50gg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0