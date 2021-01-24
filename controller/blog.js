const Blog =require('../models/blog');
const create=(blog)=>{
    //call model
  return Blog.create(blog)
}
const getAll=(query)=>Blog.find({query}).exec();
const getById=(id)=>Blog.findById(id).exec();
const editone=(id,body,userid)=>Blog.findOneAndUpdate({_id:id,userId:userid},body,{new: true})
const deleteone=(id)=>Blog.findOneAndDelete({_id:id})
 
module.exports={
    create,
    getAll,
    getById,
    editone,
    deleteone
}