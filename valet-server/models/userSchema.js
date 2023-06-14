const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    passwordResetOTP:String,
    userName: String,
    password: String,
    email: String,
    createTimeStamp: String,
    profileImage:{ type: String, required: false},
})

module.exports = mongoose.model('userSchema', userSchema);