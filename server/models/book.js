let mongoose = require('mongoose');

// create book model
let bookModel = mongoose.Schema({
    Name: String,
    Author: String,
    Published: String,
    Description: String,
    Price: Number
    },
    {
        collection: "books"
    }
);
module.exports = mongoose.model('Book', bookModel);