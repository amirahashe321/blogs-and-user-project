const jwt=require('jsonwebtoken');
const { promisify } = require('util');
const asyncSign = promisify(jwt.sign);

const User=require('../models/User');
const create=(user)=> User.create(user);
const login=async({username,password})=> {
const user= await User.findOne({username}).exec();
if (!user) {
    throw Error('UN_AUTHENTICATED');
  }
const isVaildPass = user.validatePassword(password);
  if (!isVaildPass) { 
    throw Error('UN_AUTHENTICATED');
  }
  const token = await asyncSign({
    username: user.username,
    id: user.id,
  }, 'SECRET_MUST_BE_COMPLEX', { expiresIn: '1d' });
  return { ...user.toJSON(), token };
  

 // return user;  
};  
const getAll= () =>User.find({}).exec()  
const editeOne= (id,data) =>User.findByIdAndUpdate(id,data ,{new:true}).exec()  
module.exports={ 
create,  
login,
getAll,
editeOne,
};   