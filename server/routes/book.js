const { setInternalBufferSize } = require('bson');
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// connect with book model
let Book = require('../models/book');

//CRUD
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
            res.render('book/list',{title:'Book List', Booklist: booklist})
        }
    });
});

//Add operation
//get route for displaying the add page -> create operation
router.get('/add',(req,res,next)=>{
    res.render('book/add', {title: 'Add Book'})

});
//post route for displaying add page
router.post('/add',(req,res,next)=>
{
    let newBook = Book({
        "Name":req.body.Name,
        "Author":req.body.Author,
        "Published":req.body.Published,
        "Description":req.body.Description,
        "Price":req.body.Price
    });
    Book.create(newBook,(err,Book) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {

            res.redirect('/book-list');

        }
    })
})
//edit operation
//get route for displaying the edit operation -> create operation
router.get('/edit/:id',(req,res,next)=>{
    let id = req.params.id;
    Book.findById(id,(err,bookToEdit) => {
        if(err)
        {
            return console.error(err);
            res.end(err);
        }
        else
        {
            res.render('book/edit',{title:'Edit Book', book:bookToEdit});

        }
    });

});
//post route for displaying edit operation
router.post('/edit/:id',(req,res,next)=>{
    let id=req.params.id;
    let updateBook = Book({
        "_id":id,
        "name":req.body.name,
        "author":req.body.author,
        "published":req.body.published,
        "description":req.body.description,
        "price":req.body.price
    });
    Book.updateOne({_id:id},updateBook,(err)=>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.redirect('/book-list')
        }
    });
});
//delete operation
router.get('/delete/:id',(req,res,next)=>{
    let id =req.params.id;
    Book.deleteOne({_id:id},(err)=>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.redirect('/book-list')
        }
    })

});
//get to perform delete operation

module.exports=router;