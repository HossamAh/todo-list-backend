const userValidate = require("../utils/UserValidator").UserValidator;
module.exports = (req,res,nxt)=>{
    if(userValidate(req.body))
    {
        nxt();
    }
    else{
        //bad request
        res.status(403).send(userValidate.errors);
    }
};