const express=require('express');
const{create,login,getAll,editeOne}=require('../controller/user');
const router=express();
//post 
router.post('/',async(req,res,next)=>{
    const{body}=req;
    try{
    const user= await create(body);
    res.json(user)
    }
    catch(e){
        next(e);
    } 
});
router.post('/login',async(req,res,next)=>{
    const{body}=req;
    try{
    const user= await login(body);
    res.json(user)
    }
    catch(e){
        next(e);   
    } 
});
router.get('/',async (req,res,next)=>{
    const{body}=req;
    try{
        const users= await getAll(body);
        res.json(users);
        } 
        catch(e){ 
            next(e);
        } 
});
router.patch('/:id',async(req,res,next)=>{
    const{params:{id}, body}=req;
    try{
        const users= await editeOne(id,body);
        res.json(users);  
        } 
        catch(e){       
            next(e);
        }
});
module.exports=router;

