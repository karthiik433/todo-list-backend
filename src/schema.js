const mongoose = require("mongoose");
//const {Schema} = require("mongoose");

const tododb = mongoose.createConnection("mongodb://localhost:27017/tododb",{ useNewUrlParser: true, useUnifiedTopology: true });

const todoSchema = new mongoose.Schema({
    task:String,
    done:Boolean
});

const todoModel = tododb.model("todos",todoSchema);

exports.todoModel = todoModel;

