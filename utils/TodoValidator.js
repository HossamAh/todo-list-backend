const Ajv = require('ajv');

const ajv = new Ajv();


const schema = {
    type:"object",
    properties:{
        text:{type:"string",minLength:3,maxLength:150},
        isCompleted:{type:"boolean"}
    },
    required:['text',"isCompleted"],
    additionalProperties:false
};
let validate = ajv.compile(schema);   
module.exports.TodoValidator = validate;