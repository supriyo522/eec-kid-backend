//routes/adminRoutes.js
require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Registration1 = require('../models/registration1');
const Registration2 = require('../models/registration2');

const router = express.Router();

// Admin login route (generate JWT)
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (username === process.env.ADMIN_USERNAME) {
        const match = await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH);
        if (match) {
            // Generate JWT
            const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.status(200).json({ token });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

// Middleware to verify JWT
const jwtAuth = (req, res, next) => {
    const token = req.headers['authorization'];
    if (token) {
        jwt.verify(token.split(' ')[1], process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(403).send('Invalid token');
            } else {
                req.user = decoded;
                next();
            }
        });
    } else {
        return res.status(403).send('No token provided');
    }
};

// Route to get all registrations from Registration1 (protected route)
router.get('/registration1', jwtAuth, async (req, res) => {
    try {
        const registrations = await Registration1.find();
        res.status(200).json(registrations);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Route to get all registrations from Registration2 (protected route)
router.get('/registration2', jwtAuth, async (req, res) => {
    try {
        const registrations = await Registration2.find();
        res.status(200).json(registrations);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
