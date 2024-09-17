//models/registration2.js
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    gender: { type: String, required: true },
    class: { type: String, required: true },
    school: { type: String, required: true }
});

const registration2Schema = new mongoose.Schema({
    mainStudent: { type: studentSchema, required: true },
    additionalStudents: [studentSchema] // Array of student objects
});

const Registration2 = mongoose.model('Registration2', registration2Schema);

module.exports = Registration2;


