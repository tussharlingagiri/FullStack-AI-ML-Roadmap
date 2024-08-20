const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
    username: { type:String, required: true, unique: true},
    password: {type:String, required: true},
});

userSchema.pre('save', async function(next) {
    if (this.isModified('password') || this.isNew) {
        this.password = await bcrypt.hash(this.password,  10);
    }
    next();
});

userSchema.methods.comparePassword = function(canditatePassword) {
    return bcrypt.compare(canditatePassword, this.password);
}

module.exports = mongoose.model('UserSchema', userSchema)