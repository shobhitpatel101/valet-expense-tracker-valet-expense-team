const mongoose = require('mongoose')

const goalSchema = new mongoose.Schema({
    goalName: String,
    goalDesc: String,
    userId: String,
    goalAmount: String,
    createTimeStamp: String
})

module.exports = mongoose.model('goalSchema', goalSchema);