const moment=require('moment');
//creating middleware using call back func and named that func as logger
const logger=(req,res,next)=>{
    // console.log('Hellooo');
    console.log(`${req.protocol}://${req.get("host")}${req.originalUrl}:${moment().format()}`);//creating a url
     next();
 }
 


 module.exports=logger;