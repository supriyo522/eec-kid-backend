//routes/registration1Routes.js
const express = require('express');
const router = express.Router();
const Registration1 = require('../models/registration1');

// POST route for registration1
router.post('/register', async (req, res) => {
    try {
        const { name, mobile, email } = req.body;

        // Check for duplicate entry by mobile number or email
        const existingRegistration = await Registration1.findOne({ $or: [{ mobile }, { email }] });

        if (existingRegistration) {
            return res.status(400).send('Student with this mobile number or email already exists.');
        }

        const registrationData = new Registration1({ name, mobile, email });
        await registrationData.save();
        res.status(201).send('Registration1 data saved successfully!');
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;
