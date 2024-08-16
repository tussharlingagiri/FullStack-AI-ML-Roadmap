const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/tasksDB', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB....');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};


mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.log('Mongoose connection error: ' + err);
});


mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected from MongoDB');
});

module.exports = connectDB;













