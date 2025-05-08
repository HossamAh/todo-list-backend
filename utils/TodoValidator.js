const { default: mongoose } = require('mongoose');
const Ajv = require("ajv")
const addFormats = require("ajv-formats")

const ajv = new Ajv()
addFormats(ajv)
const schema = {
    type:"object",
    properties:{
        text:{type:"string",minLength:3,maxLength:150},
        isCompleted:{type:"boolean"},
        deadline:{type:"string",format:"date-time"}
        // user:{type:"string",pattern:"/^[0-9a-fA-F]{24}$/"}
    },
    // required:['text',"isCompleted",'user'],
    required:['text',"isCompleted",'deadline'],
    additionalProperties:false
};
let validate = ajv.compile(schema);   
module.exports.TodoValidator = validate;