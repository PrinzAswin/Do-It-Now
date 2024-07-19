const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const notesSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    tags: {
        type: Array,
        default: []
    },
    userId: {
        type: String,
    },
    ispinned: {
        type: Boolean,
        default: false
    },
    createdOn: {
        type: Date,
        default: new Date().getTime()
    },
});

module.exports = mongoose.model('notes', notesSchema);