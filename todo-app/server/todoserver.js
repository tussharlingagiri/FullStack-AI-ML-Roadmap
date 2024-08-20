const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const tasksRouter = require('./routes/operat');
const path = require('path');

const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost/todo-app')
    .then(() => console.log('Connected to MongoDB....'))
    .catch(err => console.error('Could not connect to MongoDB....', err));


app.use(cors());
app.use(bodyParser.json());
app.use('/api', tasksRouter);

app.get('/',(req,res) => {
    res.sendFile(path.join(__dirname, '../public2/todolist.html'));
});

app.use(express.static(path.join(__dirname, '../public2')));

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});



