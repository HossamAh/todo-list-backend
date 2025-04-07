const monngoose = require('mongoose');
const TodoSchema = monngoose.Schema({
    text:{type:String ,required:true},
    isCompleted:{type:Boolean ,required:true},
    registeredAt:{type:Date ,required:false},
});

module.exports = monngoose.model("Todo",TodoSchema);