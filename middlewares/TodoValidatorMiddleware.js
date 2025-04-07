const todoValidate = require("../utils/TodoValidator").TodoValidator;
module.exports = (req,res,nxt)=>{
    if(todoValidate(req.body))
    {
        nxt();
    }
    else{
        //bad request
        res.status(403).send(todoValidate.errors);
    }
};