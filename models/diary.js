const mongoose = require('mongoose');

// diary schema
const diarySchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: false
    },
    content: {
        type: String,
        required: true
    },

    timestamp: {
        type: Date,
        required: true
    },

    headerImageURL: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Diary', diarySchema);