const monngoose = require('mongoose');
const UserModel = require('./UserModel');
const TodoSchema = monngoose.Schema({
    text:{type:String ,required:true},
    isCompleted:{type:Boolean ,required:true},
    registeredAt:{type:Date ,required:false},
    user:{type:monngoose.Types.ObjectId,ref:UserModel,required:true}
});

module.exports = monngoose.model("Todo",TodoSchema);