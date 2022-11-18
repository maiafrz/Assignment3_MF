let mongoose = require('mongoose');

// create book model
let taskModel = mongoose.Schema({
    Task: String,
    Due: String,
    Worth: String,
    },
    {
        collection: "tasks"
    }
);
module.exports = mongoose.model('Task', taskModel);