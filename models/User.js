const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');

//create schema
const userSchema= mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true,
        maxLength:140,
    },
    password:{
        type:String,
        required:true,
       // maxLength:8
    },
    firstname:{
        type:String,
        required:true,
        maxLength:140,
    },
    dob: Date,
    },
    {
      toJSON: {
        transform: (doc, ret, options) => {
          delete ret.password;
          return ret;
        },
      },
    });
userSchema.pre('save', function preSave(next) {
    this.password=bcrypt.hashSync(this.password,8);
    next();
  });  

  userSchema.pre('findOneAndUpdate', function preSave(next) {
    if (!this._update.password) {
      return; 
    }
    this._update.password = bcrypt.hashSync(this._update.password, 8);
    next();
  }); 
  userSchema.methods.validatePassword = function validatePassword(password) {
    return bcrypt.compareSync(password, this.password);
  };
//attach to mongoose
const usermodel=mongoose.model('User',userSchema); 
module.exports=usermodel;
