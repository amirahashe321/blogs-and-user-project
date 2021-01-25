const Blog =require('../models/blog');
//photo
const multer=require('multer');
const storage=multer.diskStorage({
  destination:function(req,file,cb){
    cb(null,'uploads/')
  },
  filename:function(req,file,cb){
    cb(null,file.filename+'-'+Date.now())
  }
});
const upload=multer({storage:storage}).single('blogimage');
//create
const create=(blog)=>{ return Blog.create(blog)}

const getAll=(query)=>Blog.find({query}).exec();
const getById=(id)=>Blog.findById(id).exec();
const editone=(id,body,userid)=>Blog.findOneAndUpdate({_id:id,userId:userid},body,{new: true}).exec()
const deleteone=(id)=>Blog.findOneAndDelete({_id:id})

const getblogtags=(_tag) =>Blog.find({tags:{$elemMatch:{tag:_tag}}}).exec();
const gettitle =(_title)=>Blog.find({title:_title}).exec();
 
module.exports={
    create,
    getAll,
    getById,
    editone,
    deleteone,
    upload,
    getblogtags,
    gettitle 
};