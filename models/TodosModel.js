const monngoose = require('mongoose');
const UserModel = require('./UserModel');
const TodoSchema = monngoose.Schema({
    text:{type:String ,required:true},
    isCompleted:{type:Boolean ,required:true},
    registeredAt:{type:Date ,required:false},
    user:{type:monngoose.Types.ObjectId,ref:UserModel,required:true},
    deadline:{type:Date,required:false,default:Date.now()+(1000*60*60*24)}//deadline= day
});

module.exports = monngoose.model("Todo",TodoSchema);