//const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');

const AppError = require('../utils/AppError');
/*
const tokenService = require('./token.service');
const userService = require('./user.service');
const Token = require('../models/token.model');
const ApiError = require('../utils/ApiError');
const { tokenTypes } = require('../config/tokens');
*/

const reset = async (resetPasswordToken, newPassword) => {
  try {
  

  console.log('0-1:',newPassword)
  const decoded = jwt.verify(resetPasswordToken, process.env.SECRET);
   console.log('0-2:',decoded.data)
   const currentUser = await User.findById(decoded.data);
    console.log('0-3:',currentUser )
   // const salt = bcryptjs.genSaltSync(10);

   // const passwordnew = bcryptjs.hashSync(newPassword, salt);
   // console.log('0-4:',passwordnew  )
    const UserUpdate = await User.findOneAndUpdate({_id: currentUser._id, }, { $set: { password : newPassword } } );
    console.log('0-5:' )
    console.log('0-6:',UserUpdate )
   
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password reset failed');
  }
};

module.exports = {
  
  reset,
};
