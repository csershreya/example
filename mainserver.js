const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port1 = 3000;
const port2 = 3050;

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


// Set EJS as the view engine
app.set('view engine', 'ejs');

// Route to fetch data from database and render HTML
app.get('/', (req, res) => {
    const sql = 'SELECT * FROM details'; // Change this to your table name
    connection.query(sql, (err, rows) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).send('Error fetching data');
        } else {
            res.render('index', { data: rows });
        }
    });
});


// Start server
app.listen(port1, () => {
    console.log(`Server is running on http://localhost:${port1}`);
});


// Start server
app.listen(port2, () => {
    console.log(`Server is running on http://localhost:${port2}`);
});
