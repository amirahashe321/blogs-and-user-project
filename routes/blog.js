const express=require('express');
const {create,getAll,getById,editone,deleteone}=require('../controller/blog');
const router=express();
//post / blogs
router.post('/',async(req,res,next)=>{
    const{ body , user: {id} }=req;
    try{
    const blog= await create({...body,userId:id});
    res.json(blog);
    }
    catch(e){
        next(e);
    }  
})
//get todos 
router.get('/',async(req,res,next)=>{
    const {user:{id}}=req
    try{
    const todos= await getAll({userId:id});
    res.json(todos)
    }
    catch(e){
        next(e);
    } 
})
//get /todos /id
router.get('/:id',async(req,res,next)=>{
    const{params:{id}}=req;
    try{
        const todos= await getById(id);
        res.json(todos)
        }
        catch(e){
            next(e);
        } 
})
//patch/todo/id
router.patch('/:id',async(req,res,next)=>{
    const{params:{id},body,user:{id:userid}}=req;
    try{
        const todos= await editone(id,body,userid);
        res.json(todos)
        }
        catch(e){
            next(e);
        } 
})
//delete/todo/id
router.delete('/:id',async(req,res,next)=>{
    const{params:{id}}=req;
    try{
        const todos= await deleteone(id);
        res.json(todos)
        }
        catch(e){
            next(e);
        }
})




module.exports=router;