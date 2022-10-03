const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add field'],
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Please add email']
    },
    password: {
        type: String,
        required: [true, 'Please add password']
    }
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)