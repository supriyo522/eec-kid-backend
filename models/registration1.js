//models/registration1.js
const mongoose = require('mongoose');

const registration1Schema = new mongoose.Schema({
    name: { type: String, required: true },
    mobile: { type: String, required: true },
    email: { type: String, required: true }
});

const Registration1 = mongoose.model('Registration1', registration1Schema);

module.exports = Registration1;
