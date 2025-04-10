const Ajv = require('ajv');
const { default: mongoose } = require('mongoose');

const ajv = new Ajv();


const schema = {
    type:"object",
    properties:{
        text:{type:"string",minLength:3,maxLength:150},
        isCompleted:{type:"boolean"},
        // user:{type:"string",pattern:"/^[0-9a-fA-F]{24}$/"}
    },
    // required:['text',"isCompleted",'user'],
    required:['text',"isCompleted"],
    additionalProperties:false
};
let validate = ajv.compile(schema);   
module.exports.TodoValidator = validate;