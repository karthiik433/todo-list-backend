const express  = require("express");
const app = express();
//const bodyparser = require("body-parser");
const port = 9990;
app.use(express.json());
const {todoModel} = require("./schema");

const cors = require("cors");
app.use(cors());

app.post("/createTodo",async (req,res)=>{
    const data = req.body;
    console.log(data,"data");
    const newtodo = new todoModel(data);
    await newtodo.save();
    res.send(newtodo);
});

app.put("/updateDone/:id",async (req,res)=>{
    const todoId = req.params.id;
    const existingTodo = await todoModel.findById(todoId);
    existingTodo.done = true;
    await existingTodo.save();
    res.send({message:"todo done"});
});


app.get("/todo",async (req,res)=>{
    const todos = await todoModel.find();
    res.send(todos);
});

app.delete("/todo/:id",async (req,res)=>{
    console.log(10);
    const todoId = req.params.id;
    console.log(todoId);
    const existingTodo = await todoModel.deleteOne({_id:todoId});
    res.send({message:"deleted suxesfully"});

});

app.put("/todo/:id",async (req,res)=>{
    const todoId = req.params.id;
    const existingTodo = await todoModel.findById(todoId);
    existingTodo.task = req.body.task;
    await existingTodo.save();
    res.send({message:"edited successfully"});
})

app.listen(port,()=>console.log("connection established"));
