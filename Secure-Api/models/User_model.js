const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    }
});

UserSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        console.log('Plain Password:', this.password); // Log plain password
        this.password = await bcrypt.hash(this.password, 10);
        console.log('Hashed Password:', this.password); // Log hashed password
    }
    next();
});

UserSchema.methods.comparePassword = async function(password) {
    console.log('Provided Password:', password); // Log provided password
    console.log('Stored Hashed Password:', this.password); // Log stored hashed password
    const isMatch = await bcrypt.compare(password, this.password);
    console.log('Password Match:', isMatch); // Log password match result
    return isMatch;
};

module.exports = mongoose.model('User_model', UserSchema);