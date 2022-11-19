let mongoose = require('mongoose');

// create book model
let taskModel = mongoose.Schema({ //schema for task database
    Task: String, //use enters task (string)
    Due: String, //user enters due date (string)
    Worth: String, //user enter worth (string)
    },
    {
        collection: "tasks" //use collection named tasks
    }
);
module.exports = mongoose.model('Task', taskModel);