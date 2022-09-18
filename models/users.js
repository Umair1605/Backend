const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    accountNo: {
        required: true,
        type: String
    },
    accountBalanace: {
        required: true,
        type: Number
    }
})

module.exports = mongoose.model('User', userSchema)