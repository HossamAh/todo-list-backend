const Ajv = require('ajv');
import addFormats from "ajv-formats"
const addFormats = require("ajv-formats")
const ajv = new Ajv();
addFormats(ajv)
const schema = {
    type:"object",
    properties:{
        name:{type:"string",minLength:3,maxLength:50},
        email:{type:"string",format:"email"},
        password:{type:"string",minLength:8,format:"password"}
    },
    required:['name',"email",password],
    additionalProperties:false
};
let validate = ajv.compile(schema);   
module.exports.UserValidator = validate;