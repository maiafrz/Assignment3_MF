let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// connect with book model
let Book = require('../models/book');

// Read Operation
// Get Route for the book list
router.get('/',(req,res,next)=>{
    Book.find((err, booklist)=>{
        if(err)
        {
            return console.error(err);
        }
        else
        {
            res.render('book',{title:'Book List', Booklist: booklist})
        }
    });
});
module.exports=router;