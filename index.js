const express=require('express'); // bring a express  by creating expresss variable
const path=require('path');// bringing path module which is a node.js module
const logger=require('./middleware/logger');

const app=express();    // initializing express

 // initializing middleware
// app.use(logger);

//body parser middleware
app.use(express.json()); // this will allow to handle raw json
app.use(express.urlencoded({extended: false}));//for form submission and it will add random id for the newMember





//create your end point /route handlers 
//app.get('/',(req, res) => {    // '/' is a route.
    //res.send("<h1>'Hello Ruzda Ansari!'</h1>");
   // res.sendFile(path.join(__dirname,'public','index.html'));//this is use when we want to send a file //But every time we need to set the route for each html page
//});


   //but if we want a static serve then we make this public folder static 
   // Set static folder
   app.use(express.static(path.join(__dirname,'public')));

   //Members API routes
   app.use('/api/members',require('./routes/api/members'));//if we want to make a static routes for members 
///api/members(this is a parent route)






const PORT = process.env.PORT  || 5000; // we want to look at the environment varible
 // process.env.PORT : it means you're manually setting the port number


// listen on port 
app.listen(PORT, () => console.log( `server started on port ${PORT}`));//we use call back func to konw on a console that server has started