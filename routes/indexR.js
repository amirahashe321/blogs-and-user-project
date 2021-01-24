const express=require('express');
const blog=require('./blog');
//attach
const user=require('./user');
const authMiddleware = require('../middleware/auth');
const router=express.Router();
router.use('/users',user);
router.use('/blogs',authMiddleware,blog);

module.exports=router;
