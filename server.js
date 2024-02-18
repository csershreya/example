const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));

// MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'sh@1210520',
    database: 'try'
});

// Connect to MySQL
connection.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
    } else {
        console.log('Connected to MySQL database');
    }
});

// Route to serve HTML form
app.get('/', (req, res) => {
    console.log('GET request received at /');
    res.sendFile(__dirname + '/index.html');
});

// Route to handle form submission and update data
app.post('/update', (req, res) => {
    console.log('POST request received at /update');
    const { id, name } = req.body;
    console.log('ID:', id);
    console.log('Name:', name);
    const sql = `INSERT INTO try.details (id, name) VALUES (?, ?)`;
    connection.query(sql, [id, name], (err, result) => {
        if (err) {
            console.error('Error updating data:', err);
            res.status(500).send('Error updating data');
        } else {
            console.log('Data updated successfully');
            res.send('Data updated successfully');
        }
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
