const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const protectedRoutes = require('./routes/protected');

const app = express();

app.use(express.json());

mongoose.connect('mongodb://localhost/Secure-Api')
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log(err));

app.use('/api/auth', authRoutes);
app.use('/api/protected', protectedRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the Secure API');
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}/`));