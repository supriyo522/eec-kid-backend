//routes/registration2Routes.js
const express = require('express');
const router = express.Router();
const Registration2 = require('../models/registration2');

// POST route for registration2
router.post('/register', async (req, res) => {
    try {
        const { name, gender, class: classValue, school, additionalStudents } = req.body;

        // Check for duplicate entry by main student name and school
        const existingMainStudent = await Registration2.findOne({ 
            'mainStudent.name': name, 
            'mainStudent.school': school 
        });

        if (existingMainStudent) {
            return res.status(400).send('Main student with this name and school already exists.');
        }

        // Optionally, you can also check for duplicates in additional students
        for (const student of additionalStudents) {
            const existingAdditionalStudent = await Registration2.findOne({
                'additionalStudents.name': student.name,
                'additionalStudents.school': student.school
            });

            if (existingAdditionalStudent) {
                return res.status(400).send(`Additional student ${student.name} with this school already exists.`);
            }
        }

        const registrationData = new Registration2({
            mainStudent: { name, gender, class: classValue, school },
            additionalStudents
        });

        await registrationData.save();
        res.status(201).send('Registration data saved successfully!');
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;

