const express=require('express');
const{
    create,
    login,
    getAll,
    editeOne,
    deleteone,
    pushFollow,
    pullFollow
}=require('../controller/user');
const router=express();
//add new user
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
//login
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
//getall
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
//edit user
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
//delete user
router.delete('/:id', async (req, res, next) => {
    const { params: { id } } = req;
    try {
      const users = await deleteone(id);
      res.json(users);
    } catch (e) {
      next(e);
    }
  });
  //follow
  router.post('/follow/:targetid', async (req, res, next) => {
    const { params: { targetid }, user: { id } } = req;
    try {
      const users = await pushFollow(targetid, id);
      res.json(users);
    } catch (e) {
      next(e);
    }
  });
  //unfollow
  router.post('/unfollow/:targetid', async (req, res, next) => {
    const { params: { targetid }, user: { id } } = req;
    try {
      const users = await pullFollow(targetid, id);
      res.json(users);
    } catch (e) {
      next(e);
    }
  });
module.exports=router;

