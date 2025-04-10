const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // mobile:{type:String},
    // address:{type:String},
});

userSchema.method('genToken',function(){
    console.log(this);
    let token =jwt.sign({
        usrid:this._id
    },process.env.JWT_SECRET,{expiresIn: '2h'});
    return token;
});

module.exports = mongoose.model('User', userSchema);