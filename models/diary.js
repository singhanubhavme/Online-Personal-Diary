const mongoose = require('mongoose');

// diary schema
const diarySchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: false
    },
    entryUID: {
        type: String,
        required: true,
        unique: true
    },
    title:{
        type:String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Diary', diarySchema);