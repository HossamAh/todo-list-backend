let TodoModel = require("../models/TodosModel");
const getAllTodos = async (req,res)=>{
    let Todos = await TodoModel.find({});
    res.send(Todos);
};

const addTodo = (req,res)=>{
    console.log(req.body);
    let Todo = new TodoModel({...req.body,registeredAt:Date.now()});
    console.log(Todo);
    Todo.save().then(()=>{
        console.log("Todo is added");
        res.status(201).json(Todo);
    })
    .catch((err)=>{
        console.log(err);
        res.status(403).send(err);
    })
};

const deleteTodo =async  (req,res)=>{
    let id = req.params.id;
    let Todo = await TodoModel.findByIdAndDelete(id);
    if(Todo)
    {
        res.json(Todo)
    }
    else
    {
        res.send(404).send("id is not found. Update is not allowed");
    }

};

const updateTodo = async (req,res)=>{
    let id = req.params.id;
    let Todo = await TodoModel.findByIdAndUpdate(id,req.body,{returnOriginal:false});
    if(Todo)
    {
        res.json(Todo)
    }
    else
    {
        res.send(404).send("id is not found. Update is not allowed");
    }
};

const getTodo = async (req,res)=>{
    let Todo  = await Todo.findById(req.params.id);
    if(Todo)
    {
        res.status(200).json(Todo);
    }
    else{
        res.status(404).send("Todo not found");
    }
};



module.exports = {getAllTodos,addTodo,deleteTodo,updateTodo,getTodo};