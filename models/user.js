const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// user schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: false
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: false
    },
    email: {
        type: String,
        required: true,
        unique: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
})

// validate username and password
userSchema.statics.findAndValidate = async function (username, password) {
    const foundUser = await this.findOne({
        username: username
    });
    if (!foundUser) {
        return false;
    }
    // compare hashes
    const isValid = await bcrypt.compare(password, foundUser.password);
    return isValid ? foundUser : false;
}

// save users
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

module.exports = mongoose.model('User', userSchema);