const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    ErrorID: String,
    ErrorMessage: String,
    ErrorDate: Date,
    ErrorStack: String,
    ErrorType: String,
    ErrorFrom: Object
});

module.exports = mongoose.model('Errors', schema);