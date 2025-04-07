module.exports = (req,res,nxt,val)=>{
    // //here we can validate the parameter or do specific operation .
    //we need to check if id is valid objectId 12 byte
    if( /^[0-9a-fA-F]{24}$/.test(val))
    {
        //valid id
        console.log("id is correct");
        console.log(`val is ${val}`);
        nxt();
    } 
    else{
        res.status(403).send("error id is invalid"); 
    }
};