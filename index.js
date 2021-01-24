const e = require('express');
const express =require ('express');
const mongoose=require('mongoose');
const routes=require('./routes/indexR');
//const router = require('./routes');
const app =express();
//mongod.exe --dbpath "G:\lab3_node\database" 
 
mongoose.connect('mongodb://localhost:27017/sd',{ useUnifiedTopology: true })
app.use(express.json()); 

app.use('/',routes) 
app.use('*',(req,res,next)=>{
res.status(404).json({err:'NotFound'});
}) 
app.use((err,req,res,next)=>{
    //map the error and send it to user  
    console.error(err);
  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(422).json(err.errors);
  }
  //debugger

  if(err.code===11000){
  res.status(422).json({statusCode:'validationError',property:err.keyValue })
  }
  if (err.message === 'UN_AUTHENTICATED') {
    res.status(401).json({ statusCode: 'UN_AUTHENTICATED' });
  }
  console.log(e);
  res.status(503).end();  
}); 
const {PORT=3000} = process.env;
app.listen (PORT ,()=> {  
    console.log('application is ready :',PORT);
})
