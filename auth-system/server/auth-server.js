const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost/auth-system')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'Night',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: 'mongodb://localhost/auth-system' }),
}));

// Serve static files
app.use(express.static('public'));

// Routers
const authRouter = require('./routes/authR');
app.use('/authR', authRouter);

// Routes
app.get('/Dashboard', (req, res) => {
    if (req.session.userId) {
        res.send('Welcome to the Dashboard');
    } else {
        res.redirect('/authR/login');
    }
});

app.get('/', (req, res) => {
    res.send(`
        <html>
        <head>
            <title>Auth System</title>
            <link rel="stylesheet" href="/authstyle.css">
        </head>
        <body>
            <h1>Welcome to the Auth System</h1>
            <a href="/authR/register">Register</a>
            <a href="/authR/login">Login</a>
        </body>
        </html>
    `);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});