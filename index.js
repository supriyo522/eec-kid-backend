require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
const registration1Routes = require('./routes/registration1Routes');
const registration2Routes = require('./routes/registration2Routes');
const adminRoutes = require('./routes/adminRoutes');



app.use('/api/registration1', registration1Routes);
app.use('/api/registration2', registration2Routes);
app.use('/api/admin', adminRoutes);

// Connect to MongoDB
mongoose.connect('mongodb+srv://backend:gLW7TTv1XDlJLLWB@cluster0.mtmc7.mongodb.net/kids-eec-registration?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
