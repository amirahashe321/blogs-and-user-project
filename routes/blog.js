const express=require('express');
const {
    create,
    getAll,
    getById,
    editone,
    deleteone,
    upload,
    getblogtags,
    gettitle 
}=require('../controller/blog');  
const router=express(); 
//create blogs
router.post('/',async(req,res,next)=>{
    const{ body , user: {id} }=req;
    try{
    const blog= await create({...body,userId:id});
    blog.photo=upload(req,res,function(err){
        if(err){
          console.log('no image');
        }
        console.log('there is image');
      });
    res.json(blog);
    }
    catch(e){
        next(e);
    }  
});
//getall user blogs
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
//getById /blogs
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
//update blog
//patch/blog
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
//deleteById/blogs
router.delete('/:id',async(req,res,next)=>{
    const{params:{id}}=req;
    try{
        const todos= await deleteone(id);
        res.json(todos)
        }
        catch(e){
            next(e);
        }
});
// getblogtags

router.get('/tags/:tag', async (req, res, next) => {
    const { params: { tag } } = req;
    try {
      console.log(tag);
      const blogs = await getblogtags(tag);
      res.json(blogs);
    } catch (e) {
      next(e);
    }
  });
  //gettitle
  router.get('/title/:title', async (req, res, next) => {
    const { params: { title } } = req;
    try {
      const blogs = await gettitle(title);
      res.json(blogs);
    } catch (e) {
      next(e);
    }
  });


module.exports=router;