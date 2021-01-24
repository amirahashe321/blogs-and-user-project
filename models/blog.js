const mongoose=require('mongoose');

//create schema
const todoschema = mongoose.Schema({
    title:{
        type: String,
        maxLength:256,
        required:true
    },
    status:{
        type:String,
        enum:['new','inprogress','done'],
        default:'new'
    },

    tags:[String],

    createdAt:{
        type:Date,
        default:Date.now()
    },

    updateAt:Date,
    
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },

}) 
//attach
const todomodel=mongoose.model('blog',todoschema);
module.exports=todomodel;