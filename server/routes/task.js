
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// connect with book model
let Task = require('../models/task');

//CRUD
// Read Operation
router.get('/',(req,res,next)=>{
    Task.find((err, tasklist)=>{
        if(err)
        {
            return console.error(err);
        }
        else
        {
            res.render('task/list',{title:'Task List', Tasklist: tasklist})
        }
    });
});

//Add operation
//get route for displaying the add page -> create operation
router.get('/add',(req,res,next)=>{
    res.render('task/add', {title: 'Add Task'});

});
//post route for displaying add page
router.post('/add',(req,res,next)=>
{
    let newTask = Task({
        "Task": req.body.Task,
        "Due": req.body.Due,
        "Worth": req.body.Worth
    });
    Task.create(newTask,(err,Task) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {

            res.redirect('/task-list');

        }
    })
})
//edit operation
//get route for displaying the edit operation -> create operation
router.get('/edit/:id',(req,res,next)=>{
    let id = req.params.id;
    Task.findById(id,(err,taskToEdit) => {
        if(err)
        {
            return console.error(err);
            res.end(err);
        }
        else
        {
            res.render('task/edit',{title:'Edit Task', task:taskToEdit});

        }
    });

});
//post route for displaying edit operation
router.post('/edit/:id',(req,res,next)=>{
    let id=req.params.id;
    let updateTask = Task({
        "_id": id,
        "Task": req.body.Task,
        "Due": req.body.Due,
        "Worth": req.body.Worth
    });
    Task.updateOne({_id:id},updateTask,(err)=>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.redirect('/task-list')
        }
    });
});
//delete operation
router.get('/delete/:id',(req,res,next)=>{
    let id =req.params.id;
    Task.deleteOne({_id:id},(err)=>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.redirect('/task-list')
        }
    })

});
//get to perform delete operation

module.exports=router;