const express = require("express");
const morgan = require("morgan");

const app = new express();
app.use(morgan('dev'));
app.use(express.json());

//in memory
let tasks = [];
//routes to get all task
app.get('/',(req,res)=>{
    res.json(tasks);
})

//route to create a new task
app.post('/tasks',(req,res)=>{
    tasks.push(req.body)
    res.send({message:"tasks added succesfully",tasks})
})
//put
app.put('/tasks/:id',(req,res)=>{
    const id = req.params.id;
    const updatedtasktask = req.body
    const index=tasks.findIndex(task=>task.id===id)
    if(index===-1)
    {
        res.send("Task not found")
    }
    else{
        tasks.splice(index,1,req.body);
        res.send({message:"task updated succesfully",tasks})
    }
})
//delete
app.delete('/remove/:id',(req,res)=>{
    const id = req.params.id;
    const index=tasks.findIndex(task=>task.id===id)
    if(index===-1)
    {
        res.send("Task not found")
    }
    else{
        // tasks.pop(req.body)
        tasks.splice(index,1);
        res.send({message:"Task deleted succesfully",tasks})
    }
})
//get
app.get('/task/:id',(req,res)=>{
    const id = req.params.id;
    const task=tasks.find(task=>task.id===id)
    if(!task)
    {
        res.send("Task not found")
    }
    else{
        res.json(task);
    }
})

app.listen(3005,(req,res)=>{
    console.log("port is up")
})