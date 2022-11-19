
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// connect with book model
let Task = require('../models/task');

//CRUD
// Read Operation
router.get('/',(req,res,next)=>{ //if route is "/"
    Task.find((err, tasklist)=>{ 
        if(err)
        {
            return console.error(err);
        }
        else
        {
            res.render('task/list',{title:'Task List', Tasklist: tasklist}) //render task/list page
        }
    });
});

//Add operation
//get route for displaying the add page -> create operation
router.get('/add',(req,res,next)=>{
    res.render('task/add', {title: 'Add Task'});

});
//post route for displaying add page
router.post('/add',(req,res,next)=> //post method to display task added
{
    let newTask = Task({ //schema for task list
        "Task": req.body.Task,
        "Due": req.body.Due,
        "Worth": req.body.Worth
    });
    Task.create(newTask,(err,Task) => { //create the new task
        if(err)
        {
            console.log(err); //if there is an error render error page
            res.end(err);
        }
        else
        {

            res.redirect('/task-list'); //if no error redirect to task-list page

        }
    })
})
//edit operation
//get route for displaying the edit operation -> create operation
router.get('/edit/:id',(req,res,next)=>{  //gets edit info
    let id = req.params.id;
    Task.findById(id,(err,taskToEdit) => {
        if(err)
        {
            return console.error(err);
            res.end(err);
        }
        else
        {
            res.render('task/edit',{title:'Edit Task', task:taskToEdit}); //if no error render edit page

        }
    });

});
//post route for displaying edit operation
router.post('/edit/:id',(req,res,next)=>{ //post method to post edit data
    let id=req.params.id;
    let updateTask = Task({ //task schema
        "_id": id,
        "Task": req.body.Task,
        "Due": req.body.Due,
        "Worth": req.body.Worth
    });
    Task.updateOne({_id:id},updateTask,(err)=>{ //function to update task
        if(err)
        {
            console.log(err); //if theres an error display error page
            res.end(err);
        }
        else
        {
            res.redirect('/task-list') //if there is no error redirect to task-list page
        }
    });
});
//delete operation
//get to perform delete operation
router.get('/delete/:id',(req,res,next)=>{ //gets delete info
    let id =req.params.id;
    Task.deleteOne({_id:id},(err)=>{ //deleteOne function from mongodb
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.redirect('/task-list') //if there is no error redirect to task-list
        }
    })

});


module.exports=router;