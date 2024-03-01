const express = require('express');
const connection = require('../connection');
const router = express.Router();

const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('dotenv').config();

var auth = require('../services/authentication')

//api for user to login
router.post('/login', (req, res) => {
    const user = req.body;
    query = 'select u_type,username,pswd from master_user_table where username=?';
    connection.query(query, [user.username], (err, results) => {
        if (!err) {
            if (results.length <= 0 || results[0].pswd != user.password) {
                return res.status(401).json({ message: "Incorrect username or password" });
            }
            else if (results[0].pswd == user.password) {
                const response = { username: results[0].username, role: results[0].role }
                const accessToken = jwt.sign(response, process.env.ACCESS_TOKEN, { expiresIn: '8h' })
                res.status(200).json({ token: accessToken });

            }
            else {
                return res.status(400).json({ message: "Something went wrong. Please try again later" });
            }

        }
        else {
            return res.status(500).json(err);
        }
    })
})