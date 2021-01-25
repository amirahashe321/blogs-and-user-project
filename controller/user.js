const jwt=require('jsonwebtoken');
const { promisify } = require('util');
const asyncSign = promisify(jwt.sign);
const User=require('../models/User');
//create
const create=(user)=> User.create(user);
//getall
const getAll= () =>User.find({}).exec()  
//editone
const editeOne= (id,data) =>User.findByIdAndUpdate(id,data ,{new:true}).exec() 
//follow
const pushFollow = (id, targetid)=> User.update(
  { "_id": id },
  {
      $push: {
        fowlling: targetid
      }
  }
);
//unfollow
const pullFollow = (id, targetid)=> User.update(
  { "_id": id },
  {
      $pull: {
        fowlling: targetid
      }
  }
);

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


const deleteone=(id) => User.findOneAndDelete({'_id':id}); 
module.exports={ 
create,  
login,
getAll,
editeOne,
deleteone,
pushFollow,
pullFollow
};   